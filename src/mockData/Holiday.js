import moment from "moment";
import {getData, getLeave} from "./LeaveRequest";
import constant from '../constant'


export function getHoliday() {
    let data = localStorage.getItem("holiday");
    let dataObj = JSON.parse(data);
    return dataObj
}

export function addHoliday(row) {
    let data = getHoliday();
    if (!data){
        row.key = 0;
        data = [row]
    } else {
        row.key = data.length;
        data.push(row);
    }
    localStorage.setItem("holiday", JSON.stringify(data));
    return data
}

export function updateHoliday(key, row) {
    let data = getHoliday();
    data[key] = row;
    localStorage.setItem("holiday", JSON.stringify(data));
    return data
}

export function removeHoliday(key) {
    let data = getHoliday();
    let res = [];
    let count = 0;
    for (let i = 0; i < data.length; i++){
        if (data[i].key === key){
            continue
        }
        data[i].key = count;
        count++;
        res.push(data[i])
    }
    console.log(data, key);
    console.log(res);
    localStorage.setItem("holiday", JSON.stringify(res));
    return res
}

export function GetNumberTakenDay(startLeave, endLeave, halfStart, halfEnd) {
    let data = getHoliday();
    let holidays = [];
    let takenDay = 0;
    for (let i = 0; i <= 366; i++){
        if (moment().dayOfYear(i).day() === 0 || moment().dayOfYear(i).day() === 6){
            holidays.push(true)
        } else {
            holidays.push(false);
        }
    }
    for (let days of data){
        let [start, end] = days.date;
        let x = parseInt(moment(start).format("DDDD"));
        let y = parseInt(moment(end).format("DDDD"));
        for (let j = x ; j <= y; j++){
            holidays[j] = true
        }
    }
    for (let i = startLeave ; i <= endLeave; i++){
        if (!holidays[i]){
            takenDay++
        }
    }
    if (halfStart && !holidays[startLeave]){
        takenDay -= 0.5
    }
    if (halfEnd && !holidays[halfEnd]){
        takenDay -= 0.5
    }
    console.log(holidays);
    return takenDay;
}

export function getDayDetail(date) {
    date = date.set("hour", 10);
    let holidays = getHoliday();
    console.log(holidays, "tt");
    let matchHoliday = [];
    for (let holiday of holidays){
        let [start, end] = holiday.date;
        let [t1, t2] = [moment(start).set("hour", 5),moment(end).set("hour", 15) ];

        if (t1 <= date && t2 >= date){
            matchHoliday.push(holiday.name)
        }
        console.log(date, t1, t2, matchHoliday ,"ggg2");
    }

    let matchRequest = new Set();
    if (date.day() === 0 || date.day() === 6 || matchHoliday.length > 0){
        return {
            matchHoliday,
            matchRequest : []
        }
    }

    let requests = getData();
    for (let request of requests) {
        let [t1, t2] = [moment(request.start).set("hour", 5),moment(request.end).set("hour", 15) ];
        if (t1 <= date &&  t2 >= date && (request.status === constant.RequestStatus.APPROVED || request.status === constant.RequestStatus.CANCELING)){
            matchRequest.add(request.name)
        }
    }
    return {
        matchHoliday,
        matchRequest: [...matchRequest]
    }
}