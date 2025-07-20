import React from "react";
import { Container, Button } from "react-bootstrap";
import "./LandingPage.css";

const LandingPage: React.FC = () => {
  return (
    <div className="landing-page">
      <Container className="text-center">
        <h1 className="mb-5">Welcome to Users Module</h1>

        <div className="mb-5">
          <h4 className="mb-3">Existing Users</h4>
          <Button variant="primary" size="lg" className="px-4 py-2">
            Login
          </Button>
        </div>

        <div>
          <h4 className="mb-3">New Users</h4>
          <Button variant="success" size="lg" className="px-4 py-2">
            Register
          </Button>
        </div>
      </Container>
    </div>
  );
};

export default LandingPage;
