import { useState } from "react";
import { Button, Card, Col, Form, Row, Image } from "react-bootstrap";
import secureLocalStorage from "react-secure-storage";
import { toast } from "react-toastify";
import { axiosInstance } from "../auth/AxiosConfig.jsx";

const Login = () => {
  const [userName, setUserName] = useState("");
  const [password, setPassword] = useState("");
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axiosInstance.post("/api/users/login", {
        userName,
        password,
      });
      if (response.data) {
        secureLocalStorage.setItem("acessToken", response.data.acessToken);
        secureLocalStorage.setItem("refreshToken", response.data.refreshToken);
        secureLocalStorage.setItem("user", response.data.result);
        toast.success(response.data.message, {
          position: "top-center",
        });
        window.location.href = "/";
      }
    } catch (error) {
      const errMessage = JSON.parse(error.request.response);
      toast.error(errMessage.message, {
        position: "top-center",
      });
    }
  };
  return (
    <div
      className="d-flex align-items-center justify-content-center position-relative"
      style={{ height: "100vh", background: "#fff", overflow: "hidden" }}
    >
     
      <div
        className="binals-marquee"
        style={{
          position: "fixed",
          top: "30%",
          left: 0,
          width: "100vw",
          zIndex: 0,
          pointerEvents: "none",
          opacity: 0.22,
          whiteSpace: "nowrap",
          fontSize: "4.5rem",
          fontWeight: "bold",
          color: "#444",
          textShadow: "2px 2px 8px #fff",
          animation: "marquee 15s linear infinite",
          fontFamily: "monospac",
        }}
      >
        Binals Coffee &nbsp; Binals Coffee &nbsp; Binals Coffee &nbsp; Binals Coffee &nbsp; Binals Coffee
      </div>
      <div
        className="binals-marquee"
        style={{
          position: "fixed",
          top: "40%",
          left: 0,
          width: "100vw",
          zIndex: 0,
          pointerEvents: "none",
          opacity: 0.22,
          whiteSpace: "nowrap",
          fontSize: "4.5rem",
          fontWeight: "bold",
          color: "#444",
          textShadow: "2px 2px 8px #fff",
          animation: "marquee 18s linear infinite reverse",
          fontFamily: "monospac",
        }}
      >
        Binals Coffee &nbsp; Binals Coffee &nbsp; Binals Coffee &nbsp; Binals Coffee &nbsp; Binals Coffee
      </div>
      <div
        className="binals-marquee"
        style={{
          position: "fixed",
          top: "50%",
          left: 0,
          width: "100vw",
          zIndex: 0,
          pointerEvents: "none",
          opacity: 0.22,
          whiteSpace: "nowrap",
          fontSize: "4.5rem",
          fontWeight: "bold",
          color: "#444",
          textShadow: "2px 2px 8px #fff",
          animation: "marquee 22s linear infinite",
          fontFamily: "monospac",
        }}
      >
        Binals Coffee &nbsp; Binals Coffee &nbsp; Binals Coffee &nbsp; Binals Coffee &nbsp; Binals Coffee
      </div>
      {/* Login Card */}
      <Card
        className="border-0 shadow"
        style={{
          width: "700px",
          background: "#000",
          borderRadius: "20px",
          zIndex: 1,
        }}
      >
        <Row className="g-0 align-items-center">
          <Col md={5} className="text-center py-4">
            <Image
              src="/img/logo.png"
              alt="Logo Kedai"
              style={{ maxWidth: "200px", width: "100%", marginBottom: "10px" }}
              fluid
            />
          </Col>
          <Col md={7} className="py-4">
            <Card.Body>
              <Card.Title className="text-center mb-4">
                <h4 className="text-white">Login</h4>
              </Card.Title>
              <Form onSubmit={handleSubmit}>
                <Form.Group as={Row} className="mb-3">
                  <Form.Label column lg="4" sm="12" className="text-white">
                    Username
                  </Form.Label>
                  <Col lg="8" sm="12">
                    <Form.Control
                      type="text"
                      value={userName}
                      onChange={(e) => setUserName(e.target.value)}
                      className="bg-transparent text-white border-white"
                      style={{ borderWidth: 2 }}
                    />
                  </Col>
                </Form.Group>
                <Form.Group as={Row} className="mb-3">
                  <Form.Label column lg="4" sm="12" className="text-white">
                    Password
                  </Form.Label>
                  <Col lg="8" sm="12">
                    <Form.Control
                      type="password"
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                      className="bg-transparent text-white border-white"
                      style={{ borderWidth: 2 }}
                    />
                  </Col>
                </Form.Group>
                <Form.Group as={Row} className="mb-3" controlId="formSubmitButton">
                  <Col lg={{ span: 8, offset: 4 }}>
                    <Button variant="light" type="submit" className="text-dark fw-bold w-100">
                      Login
                    </Button>
                  </Col>
                </Form.Group>
              </Form>
            </Card.Body>
          </Col>
        </Row>
      </Card>
      {/* Marquee Animation CSS */}
      <style>
        {`
          @keyframes marquee {
            0% { transform: translateX(0); }
            100% { transform: translateX(-50%); }
          }
        `}
      </style>
    </div>
  );
};

export default Login;