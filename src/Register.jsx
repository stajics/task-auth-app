import React, { Component } from 'react';
import axios from 'axios';
import {
  Container, Row, Col, Form, Button, Card,
} from 'react-bootstrap';
import { toast } from 'react-toastify';
import { get } from 'lodash';

class Register extends Component {
  constructor(props) {
    super(props);

    this.state = {
      validated: false,
      submitted: false,
      password: '',
      repeatPassword: '',
      username: '',
    };
  }

  handleRegister = async (event) => {
    try {
      event.preventDefault();
      event.stopPropagation();

      const { username, password } = this.state;

      this.setState({
        submitted: true,
        isLoading: true,
      });

      if (!this.isRepeatPasswordValid() || !this.isUsernameValid()) {
        return;
      }

      this.setState({
        validated: true,
      });

      await axios.post('http://localhost:8080/auth/signup', {
        username,
        password,
      });

      const { history } = this.props; //eslint-disable-line
      history.push('/user');
    } catch (e) {
      const errorCode = get(e, 'response.data.error.code');
      if (errorCode === 11000) {
        this.setState({
          validated: false,
        });
        toast.error('Username already in use.');
      }
      const errorMessage = get(e, 'response.data.error.message');
      if (errorMessage) {
        this.setState({
          validated: false,
        });
        toast.error(errorMessage);
      }
      this.setState({
        isLoading: false,
      });
    }
  };

  isRepeatPasswordValid = () => {
    const { password, repeatPassword } = this.state;
    return repeatPassword === password;
  }

  isUsernameValid = () => {
    const { username } = this.state;
    return /^[a-zA-Z0-9]+$/.test(username);
  }

  render() {
    const {
      username, password, repeatPassword, validated, submitted, isLoading,
    } = this.state;

    return (
      <Container>
        <Row>
          <Col sm={12} md={{ span: 8, offset: 2 }}>
            <Card style={{ padding: '2em', width: '100%' }}>
              <Form onSubmit={this.handleRegister} validated={validated}>
                <Form.Group controlId="formBasicUsername">
                  <Form.Label>Username</Form.Label>
                  <Form.Control
                    value={username}
                    onChange={e => this.setState({ username: e.target.value, validated: false })}
                    required
                    minLength="4"
                    maxLength="15"
                    isInvalid={submitted ? !this.isUsernameValid() : false}
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
                    onChange={e => this.setState({ password: e.target.value, validated: false })}
                    required
                    minLength="6"
                    type="password"
                    placeholder="Password"
                  />
                </Form.Group>

                <Form.Group controlId="formBasicRepeatPassword">
                  <Form.Control
                    value={repeatPassword}
                    onChange={e => this.setState({
                      repeatPassword: e.target.value,
                      validated: false,
                    })}
                    required
                    isInvalid={submitted ? !this.isRepeatPasswordValid() : false}
                    minLength="6"
                    type="password"
                    placeholder="Repeat password"
                  />
                  <Form.Control.Feedback type="invalid">
                    Passwords do not match.
                  </Form.Control.Feedback>
                </Form.Group>

                <Button style={{ width: '100%' }} variant="primary" type="submit" enabled={!isLoading}>
                  Submit
                </Button>
              </Form>
            </Card>
          </Col>
        </Row>
      </Container>
    );
  }
}

export default Register;
