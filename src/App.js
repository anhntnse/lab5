import logo from "./logo.svg";
import "./App.css";
import "bootstrap/dist/css/bootstrap.min.css";
import StudentManagement from './Components/StudentManagement';
import { Container, Row, Col, InputGroup, Button } from "react-bootstrap";
import { useState } from "react";

function App() {
  const [inputText, setInputText] = useState("");
  return (
    <Container>
      <Row>
      <StudentManagement />
      </Row>
    </Container>
  );
}

export default App;
