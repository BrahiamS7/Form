import React from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import { Container,Row,Col} from "react-bootstrap";
import OwnNavbar from "./OwnNavbar";
import OwnFooter from "./OwnFooter";


const Home = () => {
  return (
    <>
    <OwnNavbar/>
      <Container className="flex-column text-center p-5 flex-grow-1">
        <Row className="flex-column">
          <Col>
            <h1>Pagina de inicio</h1>
          </Col>
          <Col className="text-secondary mt-3">
            <p>
              Hecho con <span>❤️</span> por Soto!
            </p>
          </Col>
        </Row>
      </Container>
      <OwnFooter/>
    </>
  );
};

export default Home;
