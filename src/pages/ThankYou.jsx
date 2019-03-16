// @flow
import React, { useContext } from 'react';
import { AppStateContext } from '../App';
import type { AppStateType } from '../App';

const ThankYou = () => {
  const appStateContext: AppStateType = useContext(AppStateContext);
  return (
    <div>
      <h1>Thank you for registering.</h1>
      <h3>{appStateContext.user && appStateContext.user.username}</h3>
    </div>
  );
};

export default ThankYou;
