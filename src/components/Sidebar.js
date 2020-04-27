import React, {useContext, useState} from 'react';
import {useHistory} from "react-router-dom";
import 'antd/dist/antd.css';
import './Sidebar.css';
import {Layout, Menu, Row, Col, Button} from 'antd';
import {
    MenuUnfoldOutlined,
    MenuFoldOutlined,
    TableOutlined,
    VideoCameraOutlined,
    UploadOutlined,
    LogoutOutlined,
} from '@ant-design/icons';
import {userContext} from "./UserContext";
import constant from '../constant'


const {Header, Sider, Content} = Layout;
const Sidebar = (pros) => {
    const [sidebar, setSidebar] = useState({collapsed: false});
    const toggle = () => {
        setSidebar({collapsed: !sidebar.collapsed})
    };
    const [user, setUser] = useContext(userContext);
    const history = useHistory();

    const logout = () => {
        setUser({});
        localStorage.removeItem('user')
        history.push("/login");
    };
    const home = () => {
        history.push("/home");
    };
    const requestList = () => {
        history.push("/request-list");
    };

    const CreateRequestList = () => {
        if (user.role === constant.Role.USER) {
            return <Button type="primary" onClick={() => {
                history.push("/create-request")
            }}>
                Create Request
            </Button>
        }
        return null
    };

    return (
        <Layout>
            <Sider
                trigger={null}
                collapsible
                collapsed={sidebar.collapsed}
                className={"site-style"}
            >
                <div className="logo"/>
                <Menu theme="dark" mode="inline" defaultSelectedKeys={['1']} >
                    <Menu.Item key="1" onClick={requestList}>
                        <TableOutlined/>
                        <span>Request list</span>
                    </Menu.Item>
                    <Menu.Item key="2" onClick={home} >
                        <VideoCameraOutlined/>
                        <span>Home</span>
                    </Menu.Item>
                    <Menu.Item key="3">
                        <UploadOutlined/>
                        <span>Statistic</span>
                    </Menu.Item>
                    <Menu.Item key="4" onClick={logout}>
                        <LogoutOutlined/>
                        <span>Log out</span>
                    </Menu.Item>
                </Menu>
            </Sider>
            <Layout className="site-layout">
                <Header className="site-layout-background" style={{padding: 0}}>
                    <Row>
                        {React.createElement(sidebar.collapsed ? MenuUnfoldOutlined : MenuFoldOutlined, {
                            className: 'trigger',
                            onClick: toggle,
                        })}
                        <Col span={2} offset={20} style={{textAlign: "right"}}>
                            <CreateRequestList/>
                        </Col>
                    </Row>
                </Header>
                <Content
                    className="site-layout-background"
                    style={{
                        margin: '24px 16px',
                        padding: 24,
                        minHeight: 280,
                    }}
                >
                    {pros.children}
                </Content>
            </Layout>
        </Layout>
    );
};

export default Sidebar;
