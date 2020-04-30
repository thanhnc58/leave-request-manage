
const users = {
    "admin": {
        "password" : "12345",
        "role" : 1
    },
    "user": {
        "password" : "1234",
        "role" : 0
    },
    "user2": {
        "password" : "1234",
        "role" : 0
    }
};

const leave = {
    "user": {},
    "user2":{}
};

function authenticateUser(username, password) {
    return {
        exist : users[username]?.password === password,
        role: users[username]?.role
    }
}

export function initData() {
    localStorage.setItem("Leave", JSON.stringify(leave));
    localStorage.setItem("yearLeave", JSON.stringify({}));
    localStorage.setItem("holiday", JSON.stringify([]));
    localStorage.setItem("request", JSON.stringify([]));
}



export default authenticateUser;