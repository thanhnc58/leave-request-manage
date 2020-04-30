import React, {useContext} from 'react';
import { Redirect} from "react-router-dom";
import 'antd/dist/antd.css';
import {Form, Input, Button, Row, Card} from 'antd';
import {UserOutlined, LockOutlined} from '@ant-design/icons';
import './authentication.css'
import {userContext} from "./UserContext";
import authenticateUser from "../mockData/User";


const NormalLoginForm = () => {
    const [user, setUser] = useContext(userContext);
    const onFinish = values => {
        const {exist, role} = authenticateUser(values.username, values.password);
        console.log(exist);
        if (exist) {
            let userObj = {"userName": values.username, "role": role};
            localStorage.setItem("user", JSON.stringify(userObj));
            console.log('Received values of form: ', setUser(userObj));
        }

    };
    console.log(user);
    if (user.userName) {
        return <Redirect to={"/request-list"}/>
    }

    return (
        <div  className="site-card-border-less-wrapper">
            <Row justify="center" align="middle">
            <Card bordered={false} style={{width: 300, height:400, textAlign:"center"}}>
                    <UserOutlined style={{fontSize:100, marginBottom:20}}/>
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
                            <Input prefix={<UserOutlined className="site-form-item-icon"/>} placeholder="Username"/>
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
                                prefix={<LockOutlined className="site-form-item-icon"/>}
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
                </Card>
            </Row>
        </div>
    );
};

export default NormalLoginForm;