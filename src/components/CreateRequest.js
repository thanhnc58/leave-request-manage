import React, {useContext} from 'react';
import { Form, Input, Button, Row, DatePicker, Tooltip, Switch, Select } from 'antd';
import 'antd/dist/antd.css';
import {
    QuestionCircleOutlined,
} from '@ant-design/icons';
import './CreateRequest.css'
import {userContext} from "./UserContext";
import constant from '../constant'
import {addData, getDataByUser} from "../mockData/LeaveRequest";
import {GetNumberTakenDay} from '../mockData/Holiday'
const {RangePicker} = DatePicker;
const { TextArea } = Input;
const { Option } = Select;

const CreateRequest = (pros) => {
    const [user] = useContext(userContext);
    const [form] = Form.useForm();

    const onFinish = (values) => {
        console.log( values.date[1].format('YYYY-MM-DD'));

        let start = parseInt(values.date[0].format("DDDD"));
        let end = parseInt(values.date[1].format("DDDD"));
        let takenDay = GetNumberTakenDay(start, end, values.halfStart, values.halfEnd);

        let requestObj = {
            name : user.userName,
            start : values.date[0].format('YYYY-MM-DD'),
            end : values.date[1].format('YYYY-MM-DD'),
            halfStart: values.halfStart ? "Yes":"No",
            halfEnd: values.halfEnd ? "Yes":"No",
            status: constant.RequestStatus.CREATED,
            note: values.note,
            takenDay: takenDay,
            type: values.type
        };
        addData(requestObj);
        const data = getDataByUser(user);
        form.resetFields();
        pros.setRequest(data);
        pros.setDrawerVisible(false)
    };

    const onCancel = () => {
        form.resetFields();
        pros.setDrawerVisible(false)
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
    return <Row >

        <Form
            form={form}
            size={"middle"}
            {...formItemLayout}
            layout="horizontal"
            onFinish={onFinish}
        >
            <Form.Item label="Duration" name={"date"}>
                <RangePicker />
            </Form.Item>
            <Form.Item label="Note" name={"note"}>
                <TextArea rows={6}/>
            </Form.Item>
            <Form.Item label="Half Start" >
                <Form.Item noStyle name={"halfStart"}>
                    <Switch />
                </Form.Item>
                <Tooltip title="Only take leave starting from the afternoon of the start date.">
                    <QuestionCircleOutlined style={{ margin: '0 8px' }}/>
                </Tooltip>
            </Form.Item>
            <Form.Item label="Half End" >
                <Form.Item  noStyle name={"halfEnd"}>
                    <Switch />
                </Form.Item>
                <Tooltip title="Start going back to work from the afternoon of the end date.">
                    <QuestionCircleOutlined style={{ margin: '0 8px' }}/>
                </Tooltip>
            </Form.Item>
            <Form.Item label="Request Type" name={"type"}>
                <Select defaultValue={constant.RequestType.ANNUAL} style={{ width: 120 }} >
                    <Option value={constant.RequestType.ANNUAL}>Annual Leave</Option>
                    <Option value={constant.RequestType.MEDICAL}>Medical Leave</Option>
                </Select>
            </Form.Item>

            <Form.Item wrapperCol ={{ offset: 8, span: 16 }} style={{marginTop:50}}>
                <Button type="primary" htmlType="submit">
                    Submit
                </Button>
                <Button htmlType="button" onClick={onCancel}>
                    cancel
                </Button>
            </Form.Item>

        </Form>

    </Row>
};

export default CreateRequest;