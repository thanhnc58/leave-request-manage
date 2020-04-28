import constant from '../constant'

function removeRow(key) {
    let data = getData();
    let res = [];
    for (let i =0; i < data.length; i++){
        if (i === key){
            continue
        }
        data[i].key = i;
        res.push(data[i])
    }
    console.log(data, key);
    console.log(res);
    localStorage.setItem("request", JSON.stringify(res));
    return res
}

export function getData() {
    let data = localStorage.getItem("request");
    let dataObj = JSON.parse(data);
    return dataObj
}

export function getDataByUser(user) {
    if (user.role === constant.Role.ADMIN){
        return getData()
    }
    let data = localStorage.getItem("request");
    let dataObj = JSON.parse(data);
    if (!dataObj){
        return []
    }
    console.log(dataObj, 1, user);
    let res = dataObj.filter((row) => row.name === user.userName);
    console.log(res);
    return res
}

export function addData(row) {
    let data = getData();
    if (!data){
        row.key = 0;
        data = [row]
    } else {
        row.key = data.length;
        data.push(row);
    }
    localStorage.setItem("request", JSON.stringify(data));
}

export function updateStatus(index, action, role) {
    let statusTransition = [
        [constant.RequestStatus.CREATED, constant.Role.ADMIN, constant.RequestAction.ACCEPT, constant.RequestStatus.APPROVED],
        [constant.RequestStatus.CREATED, constant.Role.ADMIN, constant.RequestAction.CANCEL, constant.RequestStatus.REJECTED],
        [constant.RequestStatus.CREATED, constant.Role.USER, constant.RequestAction.CANCEL, constant.RequestStatus.CANCELED],
        [constant.RequestStatus.APPROVED, constant.Role.USER, constant.RequestAction.CANCEL, constant.RequestStatus.CANCELING],
        [constant.RequestStatus.CANCELING, constant.Role.ADMIN, constant.RequestAction.ACCEPT, constant.RequestStatus.CANCELED]
    ];

    let data = getData();
    let prevStatus = data[index].status;
    for (let item of statusTransition) {
        if (data[index].status === item[0] && role === item[1] && action === item[2]){
            data[index].status = item[3];
            localStorage.setItem("request", JSON.stringify(data));
            break
        }
    }
    let postStatus = data[index].status;
    addLeave(data[index].name, data[index].takenDay, prevStatus, postStatus);
    return data;
}

export function getTotalLeave(year) {
    return 15
}

export function getLeave() {
    let data = localStorage.getItem("Leave");
    let dataObj = JSON.parse(data);
    return dataObj;
}

export function getLeaveByUser(userName) {
    let data = localStorage.getItem("Leave");
    let dataObj = JSON.parse(data);
    return {
        [userName]: dataObj[userName]
    };
}
export function addLeave(username, leave, prevStatus, posStatus) {

    if (prevStatus === posStatus){
        return;
    }
    console.log(username, leave, prevStatus, posStatus,"gg");
    if (prevStatus === constant.RequestStatus.CANCELING && posStatus === constant.RequestStatus.CANCELED){
        console.log("gggg")
        leave = -leave;
    } else if (posStatus !== constant.RequestStatus.APPROVED){
        console.log("gg3")
        return;
    }
    console.log("gggg4")

    let data = localStorage.getItem("Leave");
    let dataObj = JSON.parse(data);
    if (!dataObj) {
        dataObj = {};
    }
    if (dataObj[username]) {
        dataObj[username] += leave;
    } else {
        dataObj[username] = leave;
    }
    console.log(username, leave, prevStatus, posStatus, "testttt");
    console.log(dataObj, username);
    localStorage.setItem("Leave", JSON.stringify(dataObj));
}


export default removeRow;