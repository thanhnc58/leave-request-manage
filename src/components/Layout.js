/*
A context hold user info
 */

import React , {useContext} from 'react';
import {Redirect} from "react-router-dom";
import {userContext} from "./UserContext";
const Layout = (pros) => {
    const [user] = useContext(userContext);
    if (!user.userName) {
        return <Redirect to={"/"}/>
    }
    return pros.children
};

export default Layout;