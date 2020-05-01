/*
A calendar where you can show up public holidays and a list of people who are off on a
day.
 */

import React from 'react';
import 'antd/dist/antd.css';
import './CustomCalendar.css';
import {Calendar, Badge, Popover} from 'antd';
import {getDayDetail} from "../mockData/Holiday";
import {UserOutlined} from '@ant-design/icons';

function dateCellRender(value) {
    const listData = getDayDetail(value);
    let holiday = listData.matchHoliday;
    let matchRequest = listData.matchRequest;

    const content = (
        <ul className="events">
            {holiday.map(item => (
                <li>
                    <Badge status={"success"} text={item}/>
                </li>
            ))}

            {matchRequest.map(item => (
                <li>
                    <UserOutlined style={{marginRight: 5}}/>
                    {item}
                </li>
            ))}

        </ul>
    );
    return (
        <Popover content={content}>
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