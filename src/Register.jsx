import React, { useState } from 'react';
import axios from 'axios';
import {
  Container, Row, Col, Form, Button, Card,
} from 'react-bootstrap';
import { toast } from 'react-toastify';
import { get } from 'lodash';

const Register = ({ history }) => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [repeatPassword, setRepeatPassword] = useState('');
  const [isValidated, setIsValidated] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const isRepeatPasswordValid = () => repeatPassword === password;

  const isUsernameValid = () => /^[a-zA-Z0-9]+$/.test(username);

  const handleRegister = async (event) => {
    try {
      event.preventDefault();
      event.stopPropagation();

      setIsSubmitted(true);
      setIsLoading(true);

      if (!isRepeatPasswordValid() || !isUsernameValid()) {
        return;
      }

      setIsValidated(true);

      await axios.post('http://localhost:8080/auth/signup', {
        username,
        password,
      });

      history.push('/user');
    } catch (e) {
      const errorCode = get(e, 'response.data.error.code');
      if (errorCode === 11000) {
        setIsValidated(false);
        toast.error('Username already in use.');
      }
      const errorMessage = get(e, 'response.data.error.message');
      if (errorMessage) {
        setIsValidated(false);
        toast.error(errorMessage);
      }
      setIsLoading(false);
    }
  };

  const handleUsernameChange = (e) => {
    setUsername(e.target.value);
    setIsValidated(false);
  };

  const handlePasswordChange = (e) => {
    setPassword(e.target.value);
    setIsValidated(false);
  };

  const handleRepeatPasswordChange = (e) => {
    setRepeatPassword(e.target.value);
    setIsValidated(false);
  };

  return (
    <Container>
      <Row>
        <Col sm={12} md={{ span: 8, offset: 2 }}>
          <Card style={{ padding: '2em', width: '100%' }}>
            <Form onSubmit={handleRegister} validated={isValidated}>
              <Form.Group controlId="formBasicUsername">
                <Form.Label>Username</Form.Label>
                <Form.Control
                  value={username}
                  onChange={handleUsernameChange}
                  required
                  minLength="4"
                  maxLength="15"
                  isInvalid={isSubmitted ? !isUsernameValid() : false}
                  placeholder="Enter username"
                />
                <Form.Control.Feedback type="invalid">
                  Alphanumeric values only.
                </Form.Control.Feedback>
              </Form.Group>

              <Form.Group controlId="formBasicPassword">
                <Form.Label>Password</Form.Label>
                <Form.Control
                  value={password}
                  onChange={handlePasswordChange}
                  required
                  minLength="6"
                  type="password"
                  placeholder="Password"
                />
              </Form.Group>

              <Form.Group controlId="formBasicRepeatPassword">
                <Form.Control
                  value={repeatPassword}
                  onChange={handleRepeatPasswordChange}
                  required
                  isInvalid={isSubmitted ? !isRepeatPasswordValid() : false}
                  minLength="6"
                  type="password"
                  placeholder="Repeat password"
                />
                <Form.Control.Feedback type="invalid">
                  Passwords do not match.
                </Form.Control.Feedback>
              </Form.Group>

              <Button style={{ width: '100%' }} variant="primary" type="submit" enabled={`${!isLoading}`}>
                Submit
              </Button>
            </Form>
          </Card>
        </Col>
      </Row>
    </Container>
  );
};

export default Register;
