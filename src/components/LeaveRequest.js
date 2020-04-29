import React, {useContext, useState} from 'react';
import 'antd/dist/antd.css';
import { Table, Tag } from 'antd';
import './LeaveRequest.css'
import {getDataByUser, getData, updateStatus, getLeave, addLeave, getTotalLeave} from "../mockData/LeaveRequest";
import {userContext} from "./UserContext";
import constant from '../constant'
import moment from "moment";


const ActionButton = (pros) => {
    const [user] = useContext(userContext);
    const handleReject = () => {
        updateStatus(pros.rowKey, constant.RequestAction.CANCEL, user.role);
        let data = getDataByUser(user);
        pros.setRequest(data)
    };
    const handleAccept = () => {
        updateStatus(pros.rowKey, constant.RequestAction.ACCEPT, user.role);
        let data = getDataByUser(user);
        pros.setLeave(getLeave());
        pros.setRequest(data)
    };

    let data = getData();
    if (!data || data.length === 0) {
        return null
    }
    if (user.role === constant.Role.ADMIN) {
        if (data[pros.rowKey].status === constant.RequestStatus.CREATED){
            return <div>
                <a style={{ marginRight: 16 }} onClick={handleAccept}>
                    Accept
                </a>
                <a onClick={handleReject}>
                    Reject
                </a>
            </div>
        } else if (data[pros.rowKey].status === constant.RequestStatus.CANCELING){
            return <div>
                <a style={{ marginRight: 16 }} onClick={handleAccept}>
                    Accept
                </a>
            </div>
        } else {
            return <div />
        }
    } else {
        console.log(data, pros.rowKey);
        if (data[pros.rowKey].status !== constant.RequestStatus.APPROVED){
            return <div />
        }
        return <div>
            <a onClick={handleReject}>
                Cancel
            </a>
        </div>
    }
};

const Demo = () => {
    const [user] = useContext(userContext);
    let data = {};
    if (user.role === constant.Role.ADMIN) {
        data = getData()
    } else {
        data = getDataByUser(user);
        console.log(data);
    }
    const [request, setRequest] = useState(data);
    const [leave, setLeave] = useState(getLeave());

    const columns = [
        { title: 'Name', dataIndex: 'name', key: 'name' },
        {
            title: 'Start date',
            dataIndex: 'start',
            key: 'age',
            sorter: (a, b) => moment(a.start) - moment(b.start),
            sortDirections: ['descend', 'ascend'],
        },
        {
            title: 'End date',
            dataIndex: 'end',
            key: 'address',
            sorter: (a, b) => moment(a.end) - moment(b.end),
            sortDirections: ['descend', 'ascend'],
        },
        { title: 'Take a half at start date', dataIndex: 'halfStart', key: 'halfStart', textWrap: 'word-break' , width: 120},
        { title: 'Take a half day at end date', dataIndex: 'halfEnd', key: 'halfEnd', textWrap: 'word-break' , width: 130 },
        {
            title: 'status',
            dataIndex: 'status',
            key: 'status',
            filters: [
                {
                    text: 'APPROVED',
                    value: constant.RequestStatus.APPROVED,
                },
                {
                    text: 'CREATED',
                    value: constant.RequestStatus.CREATED,
                }
            ],
            onFilter: (value, record) => record.status.indexOf(value) === 0,
            render: (status) => {
                let color = '';
                if (status === constant.RequestStatus.APPROVED) {
                    color = 'green'
                } else if (status === constant.RequestStatus.CANCELED || status === constant.RequestStatus.REJECTED) {
                    color = 'red'
                } else if (status === constant.RequestStatus.CANCELING) {
                    color = 'yellow'
                }
                return (
                    <Tag color={color} key={status}>
                        {status.toUpperCase()}
                    </Tag>
                );

            }
            ,
        },
        { title: 'Taken days', dataIndex: 'takenDay', key: 'takenDay' },
        {
            title: 'Leave Left',
            dataIndex: 'name',
            render: (name) => {
                let curLeave = leave?.[name] || 0;
                let leaveLeft = getTotalLeave() - curLeave;
                leaveLeft = leaveLeft < 0 ? 0 : leaveLeft;
                return <div>
                    {leaveLeft}
                </div>
            },
        },
        {
            title: 'Action',
            dataIndex: 'key',
            key: 'x',
            render: (key) => {
                return <ActionButton rowKey={key} setRequest={setRequest} setLeave={setLeave}>
                    delete
                </ActionButton>
            },
        },
    ];

    return <Table
        columns={columns}
        expandable={{
            expandedRowRender: record => <p style={{ margin: 0 }}>{record.note}</p>,
            rowExpandable: record => record.name !== 'Not Expandable',
        }}
        dataSource={request}
        tableLayout={"fixed"}
        rowClassName={(a,i) => {
            let curLeave = leave?.[a.name] || 0;
            let leaveLeft = getTotalLeave() - curLeave;
            if (leaveLeft < a.takenDay) {
                return 'highlight'
            }
        }}
    />
};

export default Demo;