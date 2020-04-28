import React, {useContext} from 'react';
import 'antd/dist/antd.css';
import { Table} from 'antd';
import {getLeave, getLeaveByUser} from "../mockData/LeaveRequest";
import {userContext} from "./UserContext";
import constant from '../constant'


const Statistic = () => {
    const [user] = useContext(userContext);
    let data = [];
    if (user.role === constant.Role.ADMIN){
        data = getLeave();
    } else {
        data = getLeaveByUser(user.userName)
    }
    // let data = getLeave();
    console.log(data);
    let tableData = [];
    for (let userName of Object.keys(data)) {
        tableData.push({
            name: userName,
            leaveLeft : data[userName]
        })
    }

    const columns = [
        {
            title: 'Name',
            dataIndex: 'name',
            width: '30%',
        },
        {
            title: 'Leave Left',
            dataIndex: 'leaveLeft',
            width: '30%',
        }
        ];
    return <Table
        columns={columns}
        dataSource={tableData}
    />
};

export default Statistic;