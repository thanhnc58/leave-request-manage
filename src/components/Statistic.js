import React, {useContext, useState} from 'react';
import 'antd/dist/antd.css';
import { Table, DatePicker} from 'antd';
import {getLeave, getLeaveByUser} from "../mockData/LeaveRequest";
import {userContext} from "./UserContext";
import constant from '../constant'
import moment from "moment";
import {getTotalLeaveByYear} from "../mockData/YearLeave";


const Statistic = () => {
    const [user] = useContext(userContext);
    const [year, setYear] = useState(moment().format("YYYY"));
    let data = [];
    if (user.role === constant.Role.ADMIN){
        data = getLeave();
    } else {
        data = getLeaveByUser(user.userName)
    }

    let total = getTotalLeaveByYear(year);
    let tableData = [];
    for (let userName of Object.keys(data)) {
        let leaveUsed = data[userName][year] || 0;
        tableData.push({
            name: userName,
            leaveUsed : leaveUsed,
            leaveLeft : total - leaveUsed
        })
    }

    const columns = [
        {
            title: 'Name',
            dataIndex: 'name',
            width: '30%',
        },
        {
            title: 'Leave Used',
            dataIndex: 'leaveUsed',
            width: '30%',
        },
        {
            title: 'Leave Left',
            dataIndex: 'leaveLeft',
            width: '30%',
        }
        ];
    return <div>
        <DatePicker onChange={(date, dateString) => setYear(dateString)} defaultValue={moment()} picker="year" />
        <Table
            columns={columns}
            dataSource={tableData}
        />
        </div>

};

export default Statistic;