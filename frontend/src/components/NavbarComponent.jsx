import { useState } from "react";
import { Container, Image, Nav, Navbar, NavDropdown } from "react-bootstrap";
import secureLocalStorage from "react-secure-storage";
import { FaBuffer, FaChartBar } from "react-icons/fa";
import { GrTransaction } from "react-icons/gr";
import ProfileModal from "./ProfileModal.jsx";

const NavbarComponent = () => {
  const [modalShow, setModalShow] = useState(false);
  const user = secureLocalStorage.getItem("user");
  let nama = "User";
  if (user) {
    nama = user.name;
  }

  const avatar = (
    <Image
      src={"/img/img_avatar.png"}
      alt="User"
      roundedCircle
      style={{ width: "30px" }}
    />
  );
  return (
    <Navbar expand="lg" className="bg-dark navbar-dark">
      <Container fluid>
        <Navbar.Brand href="/"className="text-white" 
        style={{ fontFamily: "monospac", fontWeight: "bold", fontSize: "1.5rem" }}
        >Binals Coffee</Navbar.Brand>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="me-auto">
            <NavDropdown
              title={
                <>
                  <FaBuffer className="text-white"/><span className="text-white">master</span>
                </>
              }
              id="basic-nav-dropdown"
            >
              <NavDropdown.Item href="/category">Category</NavDropdown.Item>
              <NavDropdown.Item href="/supplier">Supplier</NavDropdown.Item>
              <NavDropdown.Item href="/product">Product</NavDropdown.Item>
            </NavDropdown>
            <NavDropdown
              title={
                <>
                  <GrTransaction className="text-white"/><span className="text-white">Transaction</span> 
                </>
              }
              id="basic-nav-dropdown"
            >
              <NavDropdown.Item href="/sales">Sales</NavDropdown.Item>
              <NavDropdown.Item href="/sales-history">
                Sales History
              </NavDropdown.Item>
              <NavDropdown.Item href="/purchase">Purchase</NavDropdown.Item>
            </NavDropdown>
            <NavDropdown
              title={
                <>
                  <FaChartBar className="text-white"/><span className="text-white">Report</span>
                </>
              }
              id="basic-nav-dropdown"
            >
              <NavDropdown.Item href="/supplier-report">
                Supplier
              </NavDropdown.Item>
              <NavDropdown.Item href="/product-report">
                Product
              </NavDropdown.Item>
              <NavDropdown.Item href="/sales-report">Sales</NavDropdown.Item>
              <NavDropdown.Item href="/purchase-report">
                Purchase
              </NavDropdown.Item>
            </NavDropdown>
          </Nav>
          <Nav>
            <NavDropdown
              title={
                <>
                  {avatar} <span className="text-white">{nama}</span>
                </>
              }
              id="collapsible-nav-dropdown"
            >
              <NavDropdown.Item href="#" onClick={() => setModalShow(true)}>
                Profil
              </NavDropdown.Item>
              <NavDropdown.Item href="/logout">Logout</NavDropdown.Item>
            </NavDropdown>
          </Nav>
        </Navbar.Collapse>
      </Container>
      <ProfileModal
        show={modalShow}
        size="xl"
        modalTitle="Search Supplier"
        onHide={() => setModalShow(false)}
      />
    </Navbar>
  );
};

export default NavbarComponent;
