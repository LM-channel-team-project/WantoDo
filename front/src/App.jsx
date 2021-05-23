import React, { useState } from 'react';
import Login from './page/Login';
import Main from './page/Main';
import './styles/App.css';

function App() {
  const [isSignIn, setIsSignIn] = useState(false);

  return (
    <div className="container">
      {isSignIn ? <Main changeSignState={setIsSignIn} /> : <Login changeSignState={setIsSignIn} />}
    </div>
  );
}

export default App;
