import express from "express";
import cors from "cors";
import env from "dotenv";
import pg from "pg";
import bodyParser from "body-parser";
import bcrypt from 'bcrypt'

const app = express();
const port = 3000;
const saltRounds=10
app.use(cors());
app.use(express.json());
env.config();
app.use(bodyParser.urlencoded({ extended: true }));
const db = new pg.Client({
  user: process.env.DB_USER,
  host: process.env.DB_HOST,
  database: process.env.DB_DATABASE,
  password: process.env.DB_PASSWORD,
  port: process.env.DB_PORT,
});
db.connect();

app.get("/",(req,res)=>{
  res.redirect("/api/show")
})
app.get("/api/show", async (req, res) => {
  const result = await db.query("SELECT * FROM usuarios");
  const data = result.rows;
  res.json({ data });
});
app.post("/api/addUser", async (req, res) => {
  const user = req.body.Usuario;
  const password = req.body.Contraseña;
  console.log(user, password);
  const result=await db.query("SELECT * FROM usuarios WHERE username=$1",[
    user
  ])
  const data=result.rows
  if (data.length>0){
    res.json({mensaje:'Usuario existente!'})
  } else {
    try {
      bcrypt.hash(password,saltRounds,async(err,hash)=>{
        if(err){
          console.log(err);
        } else {
          await db.query("INSERT INTO usuarios (username,password) VALUES ($1,$2)", [
            user,
            hash,
          ]);
          res.json({mensaje:'Usuario creado con exito!'})
        }
      })
    } catch (error) {
      console.log(error);
    }
  }
  
  

  
});

app.listen(port, () => console.log(`server running in port ${port}`));
