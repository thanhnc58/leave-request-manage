import constant from "../constant";
import {Badge, Col, Row} from "antd";
import "./LeaveRequestDetail.css"
import React from "react";
import {getTotalLeave} from "../mockData/LeaveRequest";


const DescriptionItem = ({ title, content }) => (
    <div
        className="site-description-item-profile-wrapper"
        style={{
            fontSize: 14,
            lineHeight: '22px',
            marginBottom: 7,
        }}
    >
        <p
            className="site-description-item-profile-p"
            style={{
                marginRight: 8,
                display: 'inline-block',
            }}
        >
            {title}:
        </p>
        {content}
    </div>
);

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
    let leaveLeft = getTotalLeave() - userLeave;
    leaveLeft = leaveLeft < 0? 0: leaveLeft;
    return <div>
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
                <DescriptionItem title="Take a half day at start date" content={pros.row.halfStart} />
            </Col>
        </Row>
        <Row>
            <Col span={12}>
                <DescriptionItem title="Take a half day at end date" content={pros.row.halfEnd} />
            </Col>
        </Row>
        <Row>
            <Col span={12}>
                <DescriptionItem title="Leave Left" content={leaveLeft + ' days'}/>
            </Col>
            <Col span={12}>
                <DescriptionItem title="Total leave" content={userLeave + ' days'} />
            </Col>
        </Row>
        <Row>
            <Col span={12}>
                <DescriptionItem title="Taken days" content={pros.row.takenDay + ' days'} />
            </Col>
        </Row>
        <Row>
            <Col span={12}>
                <DescriptionItem title="Status" content={<Badge status={statusColor} text={pros.row.status.toLowerCase()} />}/>
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

    </div>
};

export default ExtraInfo;