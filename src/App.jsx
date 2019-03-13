import React from 'react';
import {
  BrowserRouter as Router, Route, Switch,
} from 'react-router-dom';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

import Register from './Register';

const NotFound = () => (
  <div>
    <h1>404</h1>
    <h3>PAGE NOT FOUND !</h3>
  </div>
);

const ThankYou = () => <h3>Thank you for registering.</h3>;

const App = () => (
  <div>
    <Router>
      <Switch>
        <Route exact path="/" component={Register} />
        <Route path="/user" component={ThankYou} />
        <Route component={NotFound} />
      </Switch>
    </Router>
    <ToastContainer />
  </div>
);

export default App;
