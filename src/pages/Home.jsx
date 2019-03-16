import React, { useContext } from 'react';
import { AppStateContext } from '../App';

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

export default Home;
