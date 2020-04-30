import constant from '../constant'
import moment from "moment";


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
    let data = getData();
    let prevStatus = data[index].status;

    let statusTransition = [
        [constant.RequestStatus.CREATED, constant.Role.ADMIN, constant.RequestAction.ACCEPT, constant.RequestStatus.APPROVED],
        [constant.RequestStatus.CREATED, constant.Role.ADMIN, constant.RequestAction.CANCEL, constant.RequestStatus.REJECTED],
        [constant.RequestStatus.CREATED, constant.Role.USER, constant.RequestAction.CANCEL, constant.RequestStatus.CANCELED],
        [constant.RequestStatus.APPROVED, constant.Role.USER, constant.RequestAction.CANCEL, constant.RequestStatus.CANCELED],
        [constant.RequestStatus.CANCELING, constant.Role.ADMIN, constant.RequestAction.ACCEPT, constant.RequestStatus.CANCELED]
    ];
    if (moment().diff(moment(data[index].start)) > 0){
        statusTransition[3] = [constant.RequestStatus.APPROVED, constant.Role.USER, constant.RequestAction.CANCEL, constant.RequestStatus.CANCELING]
    }
    for (let item of statusTransition) {
        if (data[index].status === item[0] && role === item[1] && action === item[2]){
            data[index].status = item[3];
            localStorage.setItem("request", JSON.stringify(data));
            break
        }
    }
    let postStatus = data[index].status;
    let year = moment(data[index].start).format('YYYY');
    if (data[index].type === constant.RequestType.ANNUAL){
        addLeave(data[index].name, data[index].takenDay, year, prevStatus, postStatus);
    }

    return data;
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
export function addLeave(username, leave , year, prevStatus, posStatus) {

    if (prevStatus === posStatus){
        return;
    }
    if (prevStatus === constant.RequestStatus.CANCELING && posStatus === constant.RequestStatus.CANCELED){
        leave = -leave;
    } else if (posStatus !== constant.RequestStatus.APPROVED){
        return;
    }

    let data = localStorage.getItem("Leave");
    let dataObj = JSON.parse(data);
    if (dataObj[username][year]) {
        dataObj[username][year] += leave;
    } else {
        dataObj[username][year] = leave;
    }
    localStorage.setItem("Leave", JSON.stringify(dataObj));
}