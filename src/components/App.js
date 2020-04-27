import React from 'react';
import '../App.css';

import {
  BrowserRouter as Router,
  Switch,
  Route,
} from "react-router-dom";
import NormalLoginForm from "./Authentication";
import UserContextProvider from "./UserContext";
import Layout from "./Layout";
import Home from "./Home";
import Demo from "./LeaveRequest";

function App() {
  return (
      <UserContextProvider>

          <Router>
              <Switch>
              <Route exact path="/" component={NormalLoginForm} />

              <Layout>
                  {/* A <Switch> looks through its children <Route>s and
                    renders the first one that matches the current URL. */}
                  <Switch>
                    <Route exact path="/home" component={Home} />
                      <Route exact path="/demo" component={Demo} />
                    <Route path="*" component={() => "404 NOT FOUND"} />

                  </Switch>
              </Layout>
                  </Switch>
          </Router>

      </UserContextProvider>
   );
}

export default App;
