import React from 'react';
import '../App.css';

import {
  BrowserRouter as Router,
  Switch,
  Route,
} from "react-router-dom";
import NormalLoginForm from "./authentication";

function App() {
  return (
      <Router>
          {/* A <Switch> looks through its children <Route>s and
            renders the first one that matches the current URL. */}
          <Switch>
            <Route exact path="/" component={NormalLoginForm} />
            <Route exact path="/authentication" component={NormalLoginForm} />
            <Route path="*" component={() => "404 NOT FOUND"} />
          </Switch>
      </Router>
  );
}

export default App;
