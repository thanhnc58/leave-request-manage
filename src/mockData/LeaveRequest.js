let data = [
    {
        key: 1,
        name:'aa',
        start: 'John Brown',
        end: 32,
        halfStart: 'false',
        halfEnd: 'true',
        status: 'accepted',
        note: 'this is my leave request'
    },{
        key: 2,
        name: 2,
        start: 'John Brown',
        end: 32,
        halfStart: 'false',
        halfEnd: 'true',
        status: 'canceled',
        note: 'this is my leave request'
    },{
        key: 3,
        name: 1,
        start: 'John Brown',
        end: 32,
        halfStart: 'false',
        halfEnd: 'true',
        status: 'canceled',
        note: 'this is my leave request this is thay '
    },
];

function removeRow(key) {
    data = data.filter((row) => row.key !== key);
    console.log(data, key)
    return data
}

function getData() {
    return data
}

export {getData};
export default removeRow;