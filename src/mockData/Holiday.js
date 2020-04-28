
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