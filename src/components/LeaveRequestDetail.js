/*
Show a request detail, and leave left status in year user have been requested
 */

import constant from "../constant";
import {Badge, Col, Row, Divider, Tooltip} from "antd";
import "./LeaveRequestDetail.css"
import React from "react";
import moment from "moment";
import {
    QuestionCircleOutlined,
} from '@ant-design/icons';
import {getTotalLeaveByYear} from "../mockData/YearLeave";


const DescriptionItem = ({ title, content, tip , tipTitle }) => {
    const tips = tip ? (<Tooltip title={tipTitle} style={{display:tip}}>
            <QuestionCircleOutlined style={{ margin: '0 8px' }}/>
        </Tooltip>) : null;
    return <div className="site-description-item-profile-wrapper">
        <p className="site-description-item-profile-p-label">{title}{tips}:</p>
        {content}
    </div>
};

const ExtraInfo = pros => {
    console.log(pros.row);
    let statusColor = "default";
    switch (pros.row.status) {
        case constant.RequestStatus.APPROVED:
            statusColor = "success";
            break;
        case constant.RequestStatus.CANCELED:
        case constant.RequestStatus.REJECTED:
            statusColor = "error";
            break;
        case constant.RequestStatus.CANCELING:
            statusColor = "warning";
            break;
        default:
            statusColor = "default";
            break;
    }
    const userLeave = pros.leave[pros.row.name];
    const curYear = moment(pros.row.start).format("YYYY");
    let curLeave = userLeave?.[curYear] || 0;
    let leaveLeft = getTotalLeaveByYear(moment(pros.row.start).format("YYYY")) - curLeave;
    leaveLeft = leaveLeft < 0? 0: leaveLeft;
    return <div>
        <p className="site-description-item-profile-p">
            Information
        </p>
        <Row>
            <Col span={12}>
                <DescriptionItem title="Name" content={pros.row.name} />
            </Col>
        </Row>
        <Row>
            <Col span={12}>
                <DescriptionItem title="Start Date" content={pros.row.start} />
            </Col>
            <Col span={12}>
                <DescriptionItem title="End Date" content={pros.row.end} />
            </Col>
        </Row>
        <Row>
            <Col span={12}>
                <DescriptionItem title="From" content={moment(pros.row.start).format('dddd')} />
            </Col>
            <Col span={12}>
                <DescriptionItem title="To" content={moment(pros.row.end).format('dddd')} />
            </Col>
        </Row>
        <Row>
            <Col span={12}>
                <DescriptionItem title="Taken days" content={pros.row.takenDay + ' days'} />
            </Col>
        </Row>
        <Row>
            <Col span={12}>
                <DescriptionItem title="Half start" content={pros.row.halfStart} tip={true} tipTitle={"Only take leave starting from the afternoon of the start date."}/>
            </Col>
            <Col span={12}>
                <DescriptionItem title="Half end" content={pros.row.halfEnd} tip={true} tipTitle={"Start going back to work from the afternoon of the end date."}/>
            </Col>
        </Row>
        <Row>
            <Col span={12}>
                <DescriptionItem title="Status" content={<Badge status={statusColor} text={pros.row.status.charAt(0) + pros.row.status.slice(1).toLowerCase()} />}/>
            </Col>
            <Col span={12}>
                <DescriptionItem title="Type" content={pros.row.type} />
            </Col>

        </Row>
        <Row>
            <Col span={12}>
                <DescriptionItem title="Note" content={pros.row.note} />
            </Col>
        </Row>
        <Divider />
        <p className="site-description-item-profile-p">
            {moment(pros.row.start).format("YYYY")} status
        </p>
        <Row>
            <Col span={12}>
                <DescriptionItem title="Leave left" content={leaveLeft + ' days'}/>
            </Col>
            <Col span={12}>
                <DescriptionItem title="Leave Used" content={curLeave + ' days'} />
            </Col>
        </Row>
    </div>
};

export default ExtraInfo;