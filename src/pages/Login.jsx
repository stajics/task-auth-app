// @flow
import React, { useState, useContext } from 'react';
import axios from 'axios';
import { Redirect } from 'react-router-dom';
import {
  Container, Row, Col, Form, Button, Card,
} from 'react-bootstrap';
import { toast } from 'react-toastify';
import { get } from 'lodash';
import { AppStateContext } from '../App';

const Login = ({ history }: { history: Object }) => {
  const appStateContext = useContext(AppStateContext);

  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [isValidated, setIsValidated] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const isUsernameValid = () => /^[a-zA-Z0-9]+$/.test(username);

  const handleRegister = async (event) => {
    try {
      event.preventDefault();
      event.stopPropagation();

      setIsSubmitted(true);
      setIsLoading(true);

      if (!isUsernameValid()) {
        return;
      }

      setIsValidated(true);

      const res = await axios.post('http://localhost:8080/auth/login', {
        username,
        password,
      });

      appStateContext.setUser(res.data);
      localStorage.setItem('user', JSON.stringify(res.data));
      history.push('/');
    } catch (e) {
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

  if (appStateContext.user) return <Redirect to="/" />;
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

              <Button style={{ width: '100%' }} variant="primary" type="submit" enabled={(!isLoading).toString()}>
                Login
              </Button>
            </Form>
          </Card>
        </Col>
      </Row>
    </Container>
  );
};

export default Login;
