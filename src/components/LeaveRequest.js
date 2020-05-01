/*
A leave request page
- Admin can view the requests of all people, admin can accept or reject a request
- Admin/user can view request detail by click on a request
- After accept/reject a request, request status is updated, number of leave leave is also updated
    if there any request in created status and has taken day > leave left, it will be highlight
    if request is not annual leave, leave left will not be counted
- User can create a new request
- Can sort, filter request by start, end date and status
 */

import React, {useContext, useState} from 'react';
import 'antd/dist/antd.css';
import {Table, Tag, Modal, Button, Row, Drawer, Form, message} from 'antd';
import './LeaveRequest.css'
import {getDataByUser, getData, updateStatus, getLeave, getDataByKey} from "../mockData/LeaveRequest";
import {userContext} from "./UserContext";
import constant from '../constant'
import moment from "moment";
import ExtraInfo from "./LeaveRequestDetail"
import {PlusOutlined} from '@ant-design/icons';
import CreateRequest from "./CreateRequest";
import {getTotalLeaveByYear} from "../mockData/YearLeave";

// Component render action button for each request by user role and request status
// example: return accept and reject button when user is admin and request status is Created
// ...
const ActionButton = (props) => {
    const [user] = useContext(userContext);
    const handleReject = (e) => {
        e.stopPropagation();
        updateStatus(props.rowKey, constant.RequestAction.CANCEL, user.role);
        let data = getDataByUser(user);
        props.setLeave(getLeave());
        props.setRequest(data);
        message.success("Request Rejected")
    };
    const handleAccept = (e) => {
        e.stopPropagation();
        updateStatus(props.rowKey, constant.RequestAction.ACCEPT, user.role);
        let data = getDataByUser(user);
        props.setLeave(getLeave());
        props.setRequest(data);
        message.success("Request Accepted")
    };

    let data = getDataByKey(props.rowKey);
    if (user.role === constant.Role.ADMIN) {
        if (data.status === constant.RequestStatus.CREATED) {
            return <div>
                <a style={{marginRight: 16}} onClick={handleAccept}>
                    Accept
                </a>
                <a onClick={handleReject}>
                    Reject
                </a>
            </div>
        } else if (data.status === constant.RequestStatus.CANCELING &&
            (moment(data.end).startOf('day').diff(moment().startOf('day')) > 0 )) {
            return <div>
                <a style={{marginRight: 16}} onClick={handleAccept}>
                    Accept
                </a>
            </div>
        } else {
            return <div/>
        }
    } else {
        if (data.status !== constant.RequestStatus.APPROVED) {
            return <div/>
        }
        return <div>
            <a onClick={handleReject}>
                Cancel
            </a>
        </div>
    }
};

const LeaveRequest = () => {
    const [user] = useContext(userContext);
    let data = {};
    if (user.role === constant.Role.ADMIN) {
        data = getData()
    } else if (user.role === constant.Role.USER) {
        data = getDataByUser(user);
    }
    const [request, setRequest] = useState(data);
    const [leave, setLeave] = useState(getLeave());
    const [modalVisible, setModalVisible] = useState(false);
    const [drawerVisible, setDrawerVisible] = useState(false);
    const [modalData, setModalData] = useState({});
    const [form] = Form.useForm();

    const columns = [
        {title: 'Name', dataIndex: 'name', key: 'name'},
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
        {title: 'Take a half day at start date', dataIndex: 'halfStart', key: 'halfStart', textWrap: 'word-break'},
        {title: 'Take a half day at end date', dataIndex: 'halfEnd', key: 'halfEnd', textWrap: 'word-break'},
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
        {title: 'Taken days', dataIndex: 'takenDay', key: 'takenDay'},
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

    const handleOk = () => {
        setModalVisible(false)
    };

    const onClose = () => {
        setDrawerVisible(false)
    };
    const onCreate = () => {
        setDrawerVisible(true)
    };

    const CreateNewRequest = () => {
        if (user.role === constant.Role.ADMIN){
            return null
        }
        return (
            <Row>
                <Button type="primary" onClick={onCreate} style={{marginBottom: 10}}>
                    <PlusOutlined/> New Request
                </Button>
            </Row>
        )
    };
    return <div>
        <CreateNewRequest />
        <Drawer
            title="Create a new leave request"
            width={600}
            onClose={onClose}
            visible={drawerVisible}
            bodyStyle={{paddingBottom: 80}}
        >
            <CreateRequest form={form} setRequest={setRequest} setDrawerVisible={setDrawerVisible}/>
        </Drawer>
        <Table
            columns={columns}
            dataSource={request.sort((a,b) => b.key - a.key)}
            tableLayout={"fixed"}
            rowClassName={(a, i) => {
                let res = 'clickable ';
                const curYear = moment(a.start).format("YYYY");
                let curLeave = leave[a.name]?.[curYear] || 0;
                let leaveLeft = getTotalLeaveByYear(curYear) - curLeave;
                if (leaveLeft < a.takenDay && a.status === constant.RequestStatus.CREATED) {
                    return res + 'highlight'
                }
                return res
            }}
            onRow={(r) => ({
                onClick: () => {
                    setModalVisible(true);
                    setModalData(r)
                },
            })}
        />
        <Modal
            title="Leave Request"
            visible={modalVisible}
            onOk={handleOk}
            onCancel={handleOk}
            width={700}
            footer={[
                <Button type="primary" onClick={handleOk}>
                    Ok
                </Button>,
            ]}
        >
            <ExtraInfo row={modalData} leave={leave}/>
        </Modal>
    </div>
};

export default LeaveRequest;