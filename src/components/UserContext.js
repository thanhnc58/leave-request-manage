import React, {createContext, useState} from 'react';

const userContext = createContext({});

function UserContextProvider(pros) {
    const [user, setUser] = useState(JSON.parse(localStorage.getItem("user") || "{}"));

    return (
        <userContext.Provider value={[user, setUser]}>
            {pros.children}
        </userContext.Provider >
    );
}


export {userContext};
export default UserContextProvider;
