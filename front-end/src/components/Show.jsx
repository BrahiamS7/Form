import { useState, useEffect } from "react";
import React from "react";
import OwnNavbar from "./OwnNavbar";
import OwnFooter from "./OwnFooter";
import Table from "react-bootstrap/Table";

const Show = () => {
  const [users, setUsers] = useState([]);

  useEffect(() => {
    fetch("http://localhost:3000/api/show")
      .then((res) => res.json())
      .then((data) => {
        console.log(`usuarios recibidos: ${data.data}`);

        setUsers(data.data);
      });
  }, []);

  return (
    <>
      <OwnNavbar />
      <div className="d-flex justify-content-center text-center">
        <Table striped bordered hover style={{ maxWidth: "500px" }}>
          <thead>
            <tr>
              <th>Usuario</th>
              <th>Contraseña</th>
            </tr>
          </thead>
          <tbody>
            {users.map((e, i) => (
              <React.Fragment key={i}>
                <tr>
                  <td>{e.username}</td>
                  <td>{e.password}</td>
                </tr>
              </React.Fragment>
            ))}
          </tbody>
        </Table>
      </div>
      <OwnFooter />
    </>
  );
};

export default Show;
