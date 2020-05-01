/*
- A fake backend where handle, CRUD of leave request
- All data will be saved on localstorage
 */

import constant from '../constant'
import moment from "moment";
import {getNumberTakenDay} from "./Holiday";


export function getData() {
    let data = localStorage.getItem("request");
    return JSON.parse(data)
}
export function getDataByKey(key) {
    let data = localStorage.getItem("request");
    let dataObj = JSON.parse(data);
    const index = dataObj.findIndex(d => d.key === key);
    return dataObj[index]
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
    return dataObj.filter((row) => row.name === user.userName)
}

// Create data with generate nearly unique index (current time + a random number)
export function addData(row) {
    let data = getData();
    if (!data){
        row.key = moment().unix() + Math.floor(Math.random() * 1000).toString();
        data = [row]
    } else {
        row.key = moment().unix() + Math.floor(Math.random() * 1000).toString();
        data.push(row);
    }
    localStorage.setItem("request", JSON.stringify(data));
}

export function updateStatus(key, action, role) {
    let data = getData();
    const index = data.findIndex(d => d.key === key);
    let prevStatus = data[index].status;

    let statusTransition = [
        [constant.RequestStatus.CREATED, constant.Role.ADMIN, constant.RequestAction.ACCEPT, constant.RequestStatus.APPROVED],
        [constant.RequestStatus.CREATED, constant.Role.ADMIN, constant.RequestAction.CANCEL, constant.RequestStatus.REJECTED],
        [constant.RequestStatus.CREATED, constant.Role.USER, constant.RequestAction.CANCEL, constant.RequestStatus.CANCELED],
        [constant.RequestStatus.APPROVED, constant.Role.USER, constant.RequestAction.CANCEL, constant.RequestStatus.CANCELED],
        [constant.RequestStatus.CANCELING, constant.Role.ADMIN, constant.RequestAction.ACCEPT, constant.RequestStatus.CANCELED]
    ];
    if (moment().startOf('day').diff(moment(data[index].start).startOf('day')) > 0){
        statusTransition[3] = [constant.RequestStatus.APPROVED, constant.Role.USER, constant.RequestAction.CANCEL, constant.RequestStatus.CANCELING]
    }
    // update request status if satisfy condition of status transition
    for (let item of statusTransition) {
        if (data[index].status === item[0] && role === item[1] && action === item[2]){
            data[index].status = item[3];
            localStorage.setItem("request", JSON.stringify(data));
            break
        }
    }

    //if request is annual leave type, update number of leave left
    let posStatus = data[index].status;
    let year = moment(data[index].start).format('YYYY');
    if (data[index].type === constant.RequestType.ANNUAL){
        let takenDay = data[index].takenDay;
        // If request status is canceling -> canceled, recalculate actual taken day, start from start of leave and current time
        if (prevStatus === constant.RequestStatus.CANCELING && posStatus === constant.RequestStatus.CANCELED){
            takenDay = getNumberTakenDay(moment(data[index].start), moment(), false, false);
        }
        addLeave(data[index].name, takenDay, year, prevStatus, posStatus);
    }

    return data;
}


export function getLeave() {
    let data = localStorage.getItem("Leave");
    return JSON.parse(data);
}

export function getLeaveByUser(userName) {
    let data = localStorage.getItem("Leave");
    let dataObj = JSON.parse(data);
    return {
        [userName]: dataObj[userName]
    };
}

// update user leave used
export function addLeave(username, leave , year, prevStatus, posStatus) {
    if (prevStatus === posStatus){
        return;
    }
    if (prevStatus !== constant.RequestStatus.CREATED && posStatus === constant.RequestStatus.CANCELED){
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