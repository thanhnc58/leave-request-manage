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
import Sidebar from "./Sidebar";
import CreateRequest from "./CreateRequest";


function App() {
    return (
        <UserContextProvider>

            <Router>
                <Switch>
                    <Route exact path="/" component={NormalLoginForm}/>

                    <Layout>
                        <Sidebar>
                            <Switch>
                                <Route exact path="/home" component={Home}/>
                                <Route exact path="/request-list" component={Demo}/>
                                <Route exact path="/create-request" component={CreateRequest}/>
                            </Switch>
                        </Sidebar>
                        {/*<Switch>*/}
                        {/*    <Route exact path="/create-request" component={CreateRequest}/>*/}
                        {/*</Switch>*/}
                    </Layout>

                    <Route path="*" component={() => "404 NOT FOUND"}/>
                </Switch>
            </Router>

        </UserContextProvider>
    );
}

export default App;
