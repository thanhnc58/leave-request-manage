/*
Create Holiday form, name and range of holiday is required
*/

import React from 'react';
import {Form, Input, Button, Row, DatePicker, message} from 'antd';
import 'antd/dist/antd.css';
import './CreateRequest.css'
import {addHoliday} from "../mockData/Holiday";

const {RangePicker} = DatePicker;

const CreateHoliday = (props) => {
    const [form] = Form.useForm();
    const onFinish = (values) => {
        let newRow = {
            name: values.name,
            date: [values.date[0].format('YYYY-MM-DD'), values.date[1].format('YYYY-MM-DD')],
            day: values.date[0].format('dddd') + ' - ' + values.date[1].format('dddd')
        };
        let newData = addHoliday(newRow);
        props.setData(newData);
        form.resetFields();
        props.setDrawerVisible(false);
        message.success("New holiday added")
    };

    const onCancel = () => {
        form.resetFields();
        props.setDrawerVisible(false)
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
    return <Row>
        <Form
            form={form}
            size={"middle"}
            {...formItemLayout}
            layout="horizontal"
            onFinish={onFinish}
        >
            <Form.Item label="Name" name={"name"} rules={[{required: true, message: 'Please input name!'}]}>
                <Input />
            </Form.Item>
            <Form.Item label="Duration" name={"date"} rules={[{required: true, message: 'Please input date!'}]}>
                <RangePicker
                />
            </Form.Item>
            <Form.Item wrapperCol={{offset: 8, span: 16}} style={{marginTop: 50}}>
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

export default CreateHoliday;