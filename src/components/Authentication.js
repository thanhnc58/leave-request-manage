import React, {useContext} from 'react';
import { useHistory } from "react-router-dom";
import 'antd/dist/antd.css';
import { Form, Input, Button } from 'antd';
import { UserOutlined, LockOutlined } from '@ant-design/icons';
import './authentication.css'
import {userContext} from "./UserContext";
import authenticateUser from "../mockData/User";


const NormalLoginForm = () => {
    const [ , setUser] = useContext(userContext);
    const history = useHistory();
    const onFinish = values => {
        const {exist, role} = authenticateUser(values.username, values.password);
        console.log(exist);
        if (exist) {
            let userObj = {"userName" : values.username, "role": role};
            localStorage.setItem("user", JSON.stringify(userObj));
            history.push("/home");
            console.log('Received values of form: ', setUser(userObj));
        }

    };

    return (
        <Form
            name="normal_login"
            className="login-form"
            initialValues={{
                remember: true,
            }}
            onFinish={onFinish}
        >
            <Form.Item
                name="username"
                rules={[
                    {
                        required: true,
                        message: 'Please input your Username!',
                    },
                ]}
            >
                <Input prefix={<UserOutlined className="site-form-item-icon" />} placeholder="Username" />
            </Form.Item>
            <Form.Item
                name="password"
                rules={[
                    {
                        required: true,
                        message: 'Please input your Password!',
                    },
                ]}
            >
                <Input
                    prefix={<LockOutlined className="site-form-item-icon" />}
                    type="password"
                    placeholder="Password"
                />
            </Form.Item>

            <Form.Item>
                <Button type="primary" htmlType="submit" className="login-form-button">
                    Log in
                </Button>
            </Form.Item>
        </Form>
    );
};

export default NormalLoginForm;