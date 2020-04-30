import moment, {unix} from "moment";
import {getData} from "./LeaveRequest";
import constant from '../constant'


export function getHoliday() {
    let data = localStorage.getItem("holiday");
    let dataObj = JSON.parse(data);
    return dataObj
}

// Create data with generate nearly unique index
export function addHoliday(row) {
    let data = getHoliday();
    if (!data){
        row.key = moment().format('x') + Math.floor(Math.random() * 1000).toString();
        data = [row]
    } else {
        row.key = moment().format('x') + Math.floor(Math.random() * 1000).toString();
        data.push(row);
    }
    localStorage.setItem("holiday", JSON.stringify(data));
    return data
}

export function updateHoliday(key, row) {
    let data = getHoliday();
    let index = data.findIndex(d => d.key === key);
    data[index] = row;
    localStorage.setItem("holiday", JSON.stringify(data));
    return data
}

export function removeHoliday(key) {
    let data = getHoliday();
    let res = [];
    for (let i = 0; i < data.length; i++){
        if (data[i].key === key){
            continue
        }
        res.push(data[i])
    }
    localStorage.setItem("holiday", JSON.stringify(res));
    return res
}

// Calculate number of actual leave days in a time range based on holiday or weekend
export function getNumberTakenDay(from, to, halfStart, halfEnd) {
    let data = getHoliday();
    let holidays = [];
    let takenDay = 0;
    let startLeave = parseInt(from.format("DDDD"));
    let endLeave = parseInt(to.format("DDDD"));

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
    return takenDay;
}

export function getHolidayDateArray() {
    let data = getHoliday();
    let holidays = [];

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
    return holidays
}

// Return holidays or people who leaved on a specific day
export function getDayDetail(date) {
    // We only care about compare date, so set a fixed time in case the date is equal
    date = date.set("hour", 10);
    let holidays = getHoliday();
    let matchHoliday = [];
    for (let holiday of holidays){
        let [start, end] = holiday.date;

        // We only care about compare date, so set a fixed time in case the date is equal
        let [t1, t2] = [moment(start).set("hour", 5),moment(end).set("hour", 15) ];
        if (t1 <= date && t2 >= date){
            matchHoliday.push(holiday.name)
        }
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
        // We only care about compare date, so set a fixed time in case the date is equal
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