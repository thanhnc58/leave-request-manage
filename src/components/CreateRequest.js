import React, {useContext} from 'react';
import { Form, Input, Button, Row, DatePicker, Tooltip, Switch } from 'antd';
import 'antd/dist/antd.css';
import {
    QuestionCircleOutlined,
} from '@ant-design/icons';
import './CreateRequest.css'
import {userContext} from "./UserContext";
import constant from '../constant'
import {addData} from "../mockData/LeaveRequest";
import {useHistory} from "react-router-dom";
const {RangePicker} = DatePicker;
const { TextArea } = Input;

const CreateRequest = () => {
    const [user] = useContext(userContext);
    const history = useHistory();

    const onFinish = (values) => {
        console.log( values.date[1].format('YYYY-MM-DD'));
        let takenDay = values.date[1].diff(values.date[0], 'days') + 1
        if (values.halfStart){
            takenDay -= 0.5
        }
        if (values.halfEnd) {
            takenDay -= 0.5
        }

        let requestObj = {
            name : user.userName,
            start : values.date[0].format('YYYY-MM-DD'),
            end : values.date[1].format('YYYY-MM-DD'),
            halfStart: values.halfStart ? "Yes":"No",
            halfEnd: values.halfEnd ? "Yes":"No",
            status: constant.RequestStatus.CREATED,
            note: values.note,
            takenDay: takenDay
        };
        addData(requestObj);
        history.push("/request-list");
    };
    const formItemLayout = {
        labelCol: {
            xs: {
                span: 24,
            },
            sm: {
                span: 8,
            },
        },
        wrapperCol: {
            xs: {
                span: 24,
            },
            sm: {
                span: 16,
            },
        },
    };
    return <Row justify={"center"}>

        <Form
            size={"middle"}
            {...formItemLayout}
            layout="horizontal"
            onFinish={onFinish}
        >
            <Form.Item label="Duration" name={"date"}>
                <RangePicker />
            </Form.Item>
            <Form.Item label="Note" name={"note"}>
                <TextArea />
            </Form.Item>
            <Form.Item label="Half day of beginning leave" >
                <Form.Item noStyle name={"halfStart"}>
                    <Switch />
                </Form.Item>
                <Tooltip title="Only take leave starting from the afternoon of the start date.">
                    <QuestionCircleOutlined style={{ margin: '0 8px' }}/>
                </Tooltip>
            </Form.Item>
            <Form.Item label="Half day of end leave" >
                <Form.Item  noStyle name={"halfEnd"}>
                    <Switch />
                </Form.Item>
                <Tooltip title="Start going back to work from the afternoon of the end date.">
                    <QuestionCircleOutlined style={{ margin: '0 8px' }}/>
                </Tooltip>
            </Form.Item>
            <Form.Item wrapperCol ={{ offset: 8, span: 16 }}>
                <Button type="primary" htmlType="submit">
                    Submit
                </Button>

                <Button htmlType="button" onClick={() => {history.goBack()}}>
                    cancel
                </Button>
            </Form.Item>

        </Form>

    </Row>
};

export default CreateRequest;