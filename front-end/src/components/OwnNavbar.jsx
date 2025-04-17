import Nav from 'react-bootstrap/Nav';

const OwnNavbar = () => {
  const pageStyle = {
    display: "flex",
    flexDirection: "column",
    minHeight: "100vh",
  };
  return (
    <div style={{ pageStyle }}>
      <Nav className="p-3" fill variant="underline">
        <Nav.Item>
          <Nav.Link href="/Home">Home</Nav.Link>
        </Nav.Item>
        <Nav.Item>
          <Nav.Link href="/Show">Show</Nav.Link>
        </Nav.Item>

      </Nav>
    </div>
  );
};

export default OwnNavbar;
