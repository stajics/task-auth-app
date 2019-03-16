// @flow
import React, { useState, useEffect, useContext } from 'react';
import {
  BrowserRouter as Router, Route, Switch, Redirect,
} from 'react-router-dom';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

import Register from './pages/Register';
import Login from './pages/Login';
import ThankYou from './pages/ThankYou';
import Home from './pages/Home';
import Landing from './pages/Landing';
import NotFound from './pages/NotFound';

import Header from './components/Header';

export type AppStateType = {
  user: ?{ username: string, token: string },
  setUser: (?{ username: string, token: string }) => void,
};

export const AppStateContext = React.createContext<AppStateType>({
  user: null,
  setUser: () => {},
});

const PrivateRoute = ({ component: Component, ...rest }) => {
  const appStateContext = useContext(AppStateContext);
  return (
    <Route
      {...rest}
      render={(props) => {
        if (appStateContext.user) return <Component {...props} user={appStateContext.user} />;
        return <Redirect to="/login" />;
      }
      }
    />
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
    <>
      <AppStateContext.Provider value={{ user, setUser }}>
        <Router>
          <>
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
          </>
        </Router>
      </AppStateContext.Provider>
      <ToastContainer />
    </>
  );
};

export default App;
