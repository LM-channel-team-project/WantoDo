import React from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import Login from './page/Login';
import Main from './page/Main';
import './styles/App.css';

const ROOT_PATH = process.env.PUBLIC_URL;

function App() {
  return (
    <div className="container">
      <Router>
        <Switch>
          <Route path={`${ROOT_PATH}/`} exact>
            <Main />
          </Route>
          <Route path={`${ROOT_PATH}/login`}>
            <Login />
          </Route>
        </Switch>
      </Router>
    </div>
  );
}

export default App;
