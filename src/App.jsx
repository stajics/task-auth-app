import React, { useState, useEffect, useContext } from 'react';
import {
  BrowserRouter as Router, Route, Switch, Redirect, NavLink,
} from 'react-router-dom';
import { Navbar, Nav } from 'react-bootstrap';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

import Register from './Register';
import Login from './Login';

export const AppStateContext = React.createContext({
  user: null,
  setUser: () => {},
});

const PrivateRoute = ({ component: Component, ...rest }) => (
  <AppStateContext.Consumer>
    {
    ({ user }) => (
      <Route
        {...rest}
        render={(props) => {
          if (user) return <Component {...props} user={user} />;
          return <Redirect to="/login" />;
        }
        }
      />
    )
    }
  </AppStateContext.Consumer>
);

const Header = ({ user, signOut }) => (
  <Navbar bg="light" expand="lg">
    <Navbar.Brand href="#home">React-Boilerplate</Navbar.Brand>
    <Navbar.Toggle aria-controls="basic-navbar-nav" />
    <Navbar.Collapse id="basic-navbar-nav">
      <Nav className="mr-auto">
        <NavLink exact style={{ marginRight: '1em' }} activeStyle={{ fontWeight: 'bold' }} to="/">Home</NavLink>
        { !user && <NavLink style={{ marginRight: '1em' }} activeStyle={{ fontWeight: 'bold' }} to="/login">Login</NavLink>}
        { !user && <NavLink style={{ marginRight: '1em' }} activeStyle={{ fontWeight: 'bold' }} to="/register">Register</NavLink>}
        { user && <button style={{ color: '#007bff', cursor: 'pointer', outline: null, border: 'none', backgroundColor: 'transparent' }} onClick={signOut}>Sign Out</button>}{/*eslint-disable-line*/} 
      </Nav>
    </Navbar.Collapse>
  </Navbar>
);

const NotFound = () => (
  <div>
    <h1>404</h1>
    <h3>PAGE NOT FOUND !</h3>
  </div>
);

const ThankYou = () => {
  const appStateContext = useContext(AppStateContext);
  return (
    <h3>
      Thank you for registering.
      {appStateContext.user.username}
    </h3>
  );
};

const Landing = () => (
  <h3>
    Landing page.
  </h3>
);

const Home = () => {
  const appStateContext = useContext(AppStateContext);

  return (
    <div>
      <h3>
        Home page.
      </h3>
      <pre>
        <code>
          {JSON.stringify(appStateContext.user, null, 4)}
        </code>
      </pre>
    </div>
  );
};

const App = () => {
  const [user, setUser] = useState(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const userObject = localStorage.getItem('user');

    if (userObject) {
      setUser(JSON.parse(userObject));
    }

    setIsLoading(false);
  }, []);

  const signOut = () => {
    setUser(null);
    localStorage.removeItem('user');
  };

  if (isLoading) return <h3>Loading...</h3>;
  return (
    <div>
      <AppStateContext.Provider value={{ user, setUser }}>
        <Router>
          <div>
            <Header user={user} signOut={signOut} />
            <Switch>
              {
                user ? (
                  <PrivateRoute exact path="/" component={Home} />
                ) : (
                  <Route exact path="/" component={Landing} />
                )
              }
              <Route exact path="/register" component={Register} />
              <Route exact path="/login" component={Login} />
              <PrivateRoute path="/user" component={ThankYou} />
              <Route component={NotFound} />
            </Switch>
          </div>
        </Router>
      </AppStateContext.Provider>
      <ToastContainer />
    </div>
  );
};

export default App;
