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
      <div className="d-flex justify-content-center text-center vh-100">
        {users.length>0?<Table striped bordered hover style={{ maxWidth: "500px" }}>
          <thead>
            <tr>
              <th>Usuario</th>
              <th>Contraseña</th>
            </tr>
          </thead>
         
            {users.map((e, i) => (
              <tbody>
                <React.Fragment key={i}>
                  <tr>
                    <td>{e.username}</td>
                    <td>{e.password}</td>
                  </tr>
                </React.Fragment>
              </tbody>
            ))}
        </Table>:<p style={{maxWidth:"500px"}} >No hay usuarios por mostrar!</p>}
        
      </div>
      <OwnFooter />
    </>
  );
};

export default Show;
