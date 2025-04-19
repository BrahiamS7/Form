// IMPORTACIONES
import express from "express";
import cors from "cors";
import env from "dotenv";
import pg from "pg";
import bcrypt from "bcrypt";
import passport from "passport";
import { Strategy } from "passport-local";
import session from "express-session";

// USOS Y CONSTANTES
const app = express();
const port = 3000;
const saltRounds = 10;
// Configuracion CORS
app.use(
  cors({
    origin: "http://localhost:5173",
    credentials: true,
  })
);

// Body parsers
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Configuracion del PASSPORT
app.use(
  session({
    secret: "gata fiera",
    resave: false,
    saveUninitialized: false,
    cookie: {
      secure: false,
      sameSite: "lax",
    },
  })
);
app.use(passport.initialize());
app.use(passport.session());
app.use((req, res, next) => {
  console.log(`Esta autorizado? ${req.isAuthenticated()}`);
  console.log(`Usuario: ${req.user}`);
  next();
});

env.config();
// Configuracion de la DB
const db = new pg.Client({
  user: process.env.DB_USER,
  host: process.env.DB_HOST,
  database: process.env.DB_DATABASE,
  password: process.env.DB_PASSWORD,
  port: process.env.DB_PORT,
});
db.connect();

// RUTAS GET
app.get("/", (req, res) => {
  res.redirect("/api/show");
});
app.get("/api/show", async (req, res) => {
  const result = await db.query("SELECT * FROM usuarios");
  const data = result.rows;
  res.json({ data });
});

// RUTAS POST
app.post("/api/addUser", async (req, res, next) => {
  const username = req.body.Usuario;
  const password = req.body.Contraseña;
  const result = await db.query("SELECT * FROM usuarios WHERE username=$1", [
    username,
  ]);
  const data = result.rows;
  if (data.length > 0) {
    return res.json({ mensaje: "Usuario existente!" });
  } else {
    try {
      bcrypt.hash(password, saltRounds, async (err, hash) => {
        if (err) {
          console.log(err);
          return res.status(500).json({mensaje:'error al hashear la contraseña'})
        } else {
          const result=await db.query(
            "INSERT INTO usuarios (username,password) VALUES ($1,$2) RETURNING *",
            [username, hash]
          );
          const user = result.rows[0];
          req.login(user, (err) => {
            if (err) return next(err);
            return res.json({ succes: true, user,mensaje:'Usuario creado con exito' });
          });
        }
      });
    } catch (error) {
      console.log(error);
      return res.status(500).json({mensaje:'Error del servidor'})
    }
  }
});
app.post("/api/Login", (req, res, next) => {
  passport.authenticate("local", (err, user, info) => {
    
    if (err) return next(err);
    if (!user) return res.status(401).json({ mensaje: "Login Fallido :(" });

    req.logIn(user, (err) => {
      if (err) return next(err);
      return res.json({ success: true, user });
    });
  })(req, res, next);
});

// ESTRATEGIAS PASSPORT
passport.use(
  "local",
  new Strategy(
    { usernameField: "Usuario", passwordField: "Contraseña" },
    async function verify(Usuario, Contraseña, done) {
      try {
        const result = await db.query(
          "SELECT * FROM usuarios WHERE username=$1",
          [Usuario]
        );
        if (result.rows.length === 0) {
          return done(null, false,{mensaje:'Usuario no encontrado'});
        }
        const usuario = result.rows[0];
        const contraseñaHashed = usuario.password;
        const valid = await bcrypt.compare(Contraseña, contraseñaHashed);
        if (valid) {
          return done(null, usuario);
        } else {
          return done(null, false,{mensaje:'Contraseña incorrecta'});
        }
      } catch (error) {
        console.log(error);
        return done(error);
      }
    }
  )
);

// PASSPORT SERIALIZE
passport.serializeUser((user, done) => {
  console.log(`Serializando user con id ${user.user_id}`);
  done(null, user.user_id);
});
passport.deserializeUser(async (id, done) => {
  try {
    const result = await db.query("SELECT * FROM usuarios WHERE user_id = $1", [
      id,
    ]);
    if (result.rows.length === 0) {
      return done(new Error("Usuario no encontrado"));
    }
    const user = result.rows[0];
    done(null, user);
  } catch (error) {
    done(error);
  }
});

app.listen(port, () => console.log(`server running in port ${port}`));
