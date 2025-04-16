import { useState } from "react";
import React from "react";
import { Container, Form, Button, Fade } from "react-bootstrap";
import OwnNavbar from "./OwnNavbar";
import OwnFooter from "./OwnFooter";

const Login = () => {
  const [Usuario, setUsuario] = useState("");
  const [Contraseña, setContraseña] = useState("");
  const [respuesta, setRespuesta] = useState("");
  const [show, setShow] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Form sent");

    fetch("http://localhost:3000/api/addUser", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ Usuario, Contraseña }),
    })
      .then((res) => res.json())
      .then((data) => {
        console.log(`Usuario creado ${data}`);
        setRespuesta(data.mensaje);
        setUsuario("");
        setContraseña("");
        setShow(true);
        setTimeout(() => setShow(false), 3000);
      })
      .catch((err) => {
        console.error("error", err);
        setRespuesta("Error al conectar con el servidor");
        setShow(true);
        setTimeout(() => setShow(false), 3000);
      });
  };

  return (
    <div className="d-flex flex-column min-vh-100">
      <OwnNavbar />

      <div className="flex-grow-1 d-flex flex-column">
        <Container className="flex-grow-1 d-flex justify-content-center align-items-center">
          <Form
            onSubmit={handleSubmit}
            className="w-100"
            style={{ maxWidth: "400px" }}
          >
            <h1>Iniciar Sesion</h1>
            <Form.Group>
              <Form.Label>Usuario</Form.Label>
              <Form.Control
                type="text"
                placeholder="Usuario"
                value={Usuario}
                onChange={(e) => setUsuario(e.target.value)}
              />
            </Form.Group>
            <Form.Group>
              <Form.Label className="mt-4">Contraseña</Form.Label>
              <Form.Control
                type="text"
                placeholder="Contraseña"
                value={Contraseña}
                onChange={(e) => setContraseña(e.target.value)}
              />
            </Form.Group>

            <Button className="mt-4 w-100" variant="primary" type="submit">
              Enviar
            </Button>
          </Form>
        </Container>
      </div>
          <Fade in={show}>
            <p className="text-center mt-3 text-black-50">{respuesta}</p>
          </Fade>
      <OwnFooter />
    </div>
  );
};

export default Login;
