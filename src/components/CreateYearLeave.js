/*
Create a Year leave form, year and number of annual leave is required
 */

import React from 'react';
import {Form, InputNumber, Button, Row, message} from 'antd';
import 'antd/dist/antd.css';
import './CreateRequest.css'
import {addYearLeave} from "../mockData/YearLeave";


const CreateYearLeave = (props) => {
    const [form] = Form.useForm();
    const onFinish = (values) => {
        let newRow = {
            year : values.year,
            total : values.total,
        };
        let newData = addYearLeave(newRow.year, newRow);
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
            <Form.Item label="Year" name={"year"} rules={[{required: true, message: 'Please input name!'}]}>
                <InputNumber width={2000}/>
            </Form.Item>
            <Form.Item label="Total" name={"total"} rules={[{required: true, message: 'Please input date!'}]}>
                <InputNumber
                />
            </Form.Item>
            <Form.Item wrapperCol={{offset: 8, span: 16}} style={{marginRight: 50}}>
                <Button type="primary" htmlType="submit" style={{marginBottom: 10}}>
                    Submit
                </Button>
                <Button htmlType="button" onClick={onCancel}>
                    cancel
                </Button>
            </Form.Item>
        </Form>
    </Row>
};

export default CreateYearLeave;