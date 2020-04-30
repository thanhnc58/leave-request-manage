export function editYearLeave(prev, year, record) {
    let yearLeave = getYearLeave();
    delete yearLeave?.[prev];
    yearLeave[year] = record;
    localStorage.setItem("yearLeave", JSON.stringify(yearLeave));
    return yearLeave
}
// add custom leave of year
export function addYearLeave(year, record) {
    let yearLeave = getYearLeave();
    yearLeave[year] = record;
    localStorage.setItem("yearLeave", JSON.stringify(yearLeave));
    return yearLeave
}

export function deleteYearLeave(year) {
    let yearLeave = getYearLeave();
    delete yearLeave?.[year];
    localStorage.setItem("yearLeave", JSON.stringify(yearLeave));
    return yearLeave
}


export function getYearLeave() {
    let data = localStorage.getItem("yearLeave");
    return JSON.parse(data)
}

export function getTotalLeaveByYear(year) {
    let yearLeave = getYearLeave();
    if (yearLeave[year]){
        return yearLeave[year].total
    }
    return 15
}