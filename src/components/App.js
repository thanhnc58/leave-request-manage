import React from 'react';
import '../App.css';

import {
    BrowserRouter as Router,
    Switch,
    Route,
} from "react-router-dom";
import Authentication from "./Authentication";
import UserContextProvider from "./UserContext";
import Layout from "./Layout";
import Holiday from "./Holiday";
import LeaveRequest from "./LeaveRequest";
import Sidebar from "./Sidebar";
import CreateRequest from "./CreateRequest";
import Statistic from "./Statistic";
import CustomCalendar from "./CustomCalendar";
import YearLeave from "./YearLeave";


function App() {
    return (
        <UserContextProvider>

            <Router>
                <Switch>
                    <Route exact path="/" component={Authentication}/>
                    <Layout>
                        <Sidebar>
                            <Switch>
                                <Route exact path="/home" component={Holiday}/>
                                <Route exact path="/request-list" component={LeaveRequest}/>
                                <Route exact path="/create-request" component={CreateRequest}/>
                                <Route exact path="/statistic" component={Statistic}/>
                                <Route exact path="/calendar" component={CustomCalendar}/>
                                <Route exact path="/year-leave" component={YearLeave}/>
                            </Switch>
                        </Sidebar>
                    </Layout>
                    <Route path="*" component={() => "404 NOT FOUND"}/>
                </Switch>
            </Router>

        </UserContextProvider>
    );
}

export default App;
