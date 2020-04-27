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
    for (let item of statusTransition) {
        if (data[index].status === item[0] && role === item[1] && action === item[2]){
            data[index].status = item[3];
            localStorage.setItem("request", JSON.stringify(data));
            return data
        }
    }
    return data;
}

export default removeRow;