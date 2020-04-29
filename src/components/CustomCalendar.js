import React from 'react';
import 'antd/dist/antd.css';
import './Calendar.css';
import { Calendar, Badge, Popover } from 'antd';
import {getDayDetail} from "../mockData/Holiday";
import {UserOutlined} from '@ant-design/icons';


function getListData(value) {
    console.log(value, 'etst');
    let listData;
    switch (value.date()) {
        case 8:
            listData = [
                { type: 'warning', content: 'This is warning event.' },
                { type: 'success', content: 'This is usual event.' },
            ];
            break;
        case 10:
            listData = [
                { type: 'warning', content: 'This is warning event.' },
                { type: 'success', content: 'This is usual event.' },
                { type: 'error', content: 'This is error event.' },
            ];
            break;
        case 15:
            listData = [
                { type: 'warning', content: 'This is warning event' },
                { type: 'success', content: 'This is very long usual event。。....' },
                { type: 'error', content: 'This is error event 1.' },
                { type: 'error', content: 'This is error event 2.' },
                { type: 'error', content: 'This is error event 3.' },
                { type: 'error', content: 'This is error event 4.' },
            ];
            break;
        default:
    }
    return listData || [];
}

function dateCellRender(value) {
    const listData = getDayDetail(value);
    let holiday = listData.matchHoliday;
    let matchRequest = listData.matchRequest;

    const content = (
        <ul className="events">
            {holiday.map(item => (
                <li>
                    <Badge status={"success"} text={item} />
                </li>
            ))}

            {matchRequest.map(item => (
                <li>
                    <UserOutlined style={{ marginRight: 5 }}/>
                    {item}
                </li>
            ))}

        </ul>
    );
    return (
        <Popover content={content} >
            {content}
        </Popover>
    );
}

const CustomCalendar = () => {
    return <Calendar
        dateCellRender={dateCellRender}
    />
};

export default CustomCalendar;