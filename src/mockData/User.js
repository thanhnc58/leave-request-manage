
const users = {
    "admin": {
        "password" : "12345",
        "role" : 1
    },
    "user": {
        "password" : "1234",
        "role" : 0
    }
};

function authenticateUser(username, password) {
    return {
        exist : users[username]?.password === password,
        role: users[username]?.role
    }
}



export default authenticateUser;