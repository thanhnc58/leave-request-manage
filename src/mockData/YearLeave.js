export function editYearLeave(prev, year, record) {
    let yearLeave = getYearLeave();
    delete yearLeave?.[prev];
    yearLeave[year] = record;
    localStorage.setItem("leaveYear", JSON.stringify(yearLeave));
    return yearLeave
}

export function addYearLeave(year, record) {
    let yearLeave = getYearLeave();
    yearLeave[year] = record;
    localStorage.setItem("leaveYear", JSON.stringify(yearLeave));
    return yearLeave
}

export function deleteYearLeave(year) {
    let yearLeave = getYearLeave();
    delete yearLeave?.[year];
    localStorage.setItem("leaveYear", JSON.stringify(yearLeave));
    return yearLeave
}


export function getYearLeave() {
    let data = localStorage.getItem("leaveYear");
    let dataObj = JSON.parse(data);
    return dataObj
}

export function getTotalLeaveByYear(year) {
    let yearLeave = getYearLeave();
    if (yearLeave[year]){
        return yearLeave[year].total
    }
    return 15
}