import React, { useContext } from 'react';
import { AppStateContext } from '../App';

const ThankYou = () => {
  const appStateContext = useContext(AppStateContext);
  return (
    <div>
      <h1>Thank you for registering.</h1>
      <h3>{appStateContext.user.username}</h3>
    </div>
  );
};

export default ThankYou;
