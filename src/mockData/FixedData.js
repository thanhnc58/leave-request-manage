import constant from '../constant'

const users = {
    "admin": {
        "password" : "123456",
        "role" : constant.Role.ADMIN
    },
    "Robert": {
        "password" : "123456",
        "role" : constant.Role.USER
    },
    "William": {
        "password" : "123456",
        "role" : constant.Role.USER
    },
    "Jennifer": {
        "password" : "123456",
        "role" : constant.Role.USER
    },
    "Jessica": {
        "password" : "123456",
        "role" : constant.Role.USER
    },
    "Donald": {
        "password" : "123456",
        "role" : constant.Role.USER
    },
};

const leave = {
    "Robert": {},
    "Jennifer":{},
    "Jessica":{},
    "Donald":{},
    "William":{},
};

function authenticateUser(username, password) {
    return {
        exist : users[username]?.password === password,
        role: users[username]?.role
    }
}

export function initData() {
    const isInit = localStorage.getItem("isInit");
    if (isInit === '1'){
        return
    }
    localStorage.setItem("Leave", JSON.stringify(leave));
    localStorage.setItem("yearLeave", JSON.stringify({}));
    localStorage.setItem("holiday", JSON.stringify([]));
    localStorage.setItem("request", JSON.stringify([]));
    localStorage.setItem("isInit", JSON.stringify(1));
}



export default authenticateUser;