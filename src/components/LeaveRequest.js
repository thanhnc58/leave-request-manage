import React, {useContext, useState} from 'react';
import 'antd/dist/antd.css';
import { Table, Tag } from 'antd';
import removeRow, {getData, updateStatus} from "../mockData/LeaveRequest";
import {userContext} from "./UserContext";
import constant from '../constant'


const ActionButton = (pros) => {
    const [user] = useContext(userContext);
    const handleReject = () => {
        let data = updateStatus(pros.rowKey, constant.RequestAction.CANCEL, user.role);
        pros.setRequest(data)
    };
    const handleAccept = () => {
        let data = updateStatus(pros.rowKey, constant.RequestAction.ACCEPT, user.role);
        pros.setRequest(data)
    };
    if (user.role === constant.Role.ADMIN) {
        return <div>
            <a style={{ marginRight: 16 }} onClick={handleAccept}>
                Accept
            </a>
            <a onClick={handleReject}>
                Reject
            </a>
        </div>
    } else {
        return <div>
            <a onClick={handleReject}>
                Cancel
            </a>
        </div>
    }
};

const Demo = () => {
    const [request, setRequest] = useState(getData());
    const columns = [
        { title: 'Name', dataIndex: 'name', key: 'name' },
        { title: 'Start date', dataIndex: 'start', key: 'age' },
        { title: 'End date', dataIndex: 'end', key: 'address' },
        { title: 'Take a half at start date', dataIndex: 'halfStart', key: 'halfStart', textWrap: 'word-break' , width: 120},
        { title: 'Take a half day at end date', dataIndex: 'halfEnd', key: 'halfEnd', textWrap: 'word-break' , width: 130 },
        {
            title: 'status',
            dataIndex: 'status',
            key: 'status',
            render: (status) => {
                let color = '';
                if (status === constant.RequestStatus.APPROVED) {
                    color = 'green'
                } else if (status === constant.RequestStatus.CANCELED || status === constant.RequestStatus.REJECTED) {
                    color = 'red'
                } else if (status === constant.RequestStatus.CANCELING) {
                    color = 'red'
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
            title: 'Action',
            dataIndex: 'key',
            key: 'x',
            render: (key) => {
                return <ActionButton rowKey={key} setRequest={setRequest}>
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
    />
};

export default Demo;