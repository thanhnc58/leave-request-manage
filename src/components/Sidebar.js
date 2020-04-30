import React, {useContext, useState} from 'react';
import {useHistory} from "react-router-dom";
import 'antd/dist/antd.css';
import './Sidebar.css';
import {Layout, Menu, Row, Col, Button} from 'antd';
import {
    AppstoreOutlined,
    TableOutlined,
    VideoCameraOutlined,
    StockOutlined,
    LogoutOutlined,
    CalendarOutlined,
} from '@ant-design/icons';
import {userContext} from "./UserContext";
import constant from '../constant'


const {Header, Sider, Content} = Layout;
const Sidebar = (pros) => {
    const [sidebar, setSidebar] = useState({collapsed: false});
    const toggle = () => {
        setSidebar({collapsed: !sidebar.collapsed})
    };
    const [selected, setSelected] = useState('1');
    const [user, setUser] = useContext(userContext);
    const history = useHistory();

    let isUser = user.role === constant.Role.USER;
    const logout = () => {
        setSelected('5');
        setUser({});
        localStorage.removeItem('user');
        history.push("/login");
    };
    const home = () => {
        setSelected('2');
        history.push("/home");
    };
    const requestList = () => {
        setSelected('1');
        history.push("/request-list");
    };
    const statistic = () => {
        setSelected('3');
        history.push("/statistic");
    };

    const customCalendar = () => {
        setSelected('4');
        history.push("/calendar");
    };
    const yearLeave = () => {
        setSelected('6');
        history.push("/year-leave");
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

    const AdminMenu = () => {
        return <Menu theme="dark" mode="inline" defaultSelectedKeys={['1']} selectedKeys={[selected]}>
            <Menu.Item key="1" onClick={requestList}>
                <TableOutlined/>
                <span>Request list</span>
            </Menu.Item>
            <Menu.Item key="2" onClick={home}>
                <VideoCameraOutlined/>
                <span>Holiday</span>
            </Menu.Item>
            <Menu.Item key="3" onClick={statistic}>
                <StockOutlined />
                <span>Statistic</span>
            </Menu.Item>
            <Menu.Item key="4" onClick={customCalendar}>
                <CalendarOutlined />
                <span>Calendar</span>
            </Menu.Item>
            <Menu.Item key="6" onClick={yearLeave}>
                <AppstoreOutlined />
                <span>Year Leave</span>
            </Menu.Item>
            <Menu.Item key="5" onClick={logout}>
                <LogoutOutlined/>
                <span>Log out</span>
            </Menu.Item>
        </Menu>
    };

    const UserMenu = () => {
        return <Menu theme="dark" mode="inline" defaultSelectedKeys={['1']} selectedKeys={[selected]}>
            <Menu.Item key="1" onClick={requestList}>
                <TableOutlined/>
                <span>Request list</span>
            </Menu.Item>
            <Menu.Item key="3" onClick={statistic}>
                <StockOutlined />
                <span>Statistic</span>
            </Menu.Item>
            <Menu.Item key="4" onClick={customCalendar}>
                <CalendarOutlined />
                <span>Calendar</span>
            </Menu.Item>
            <Menu.Item key="5" onClick={logout}>
                <LogoutOutlined/>
                <span>Log out</span>
            </Menu.Item>
        </Menu>
    };

    let ConMenu = isUser ? <UserMenu /> : <AdminMenu />
    return (
        <Layout>
            <Sider
                trigger={null}
                collapsible
                collapsed={sidebar.collapsed}
                className={"site-style"}
            >
                <div className="logo">

                </div>
                {ConMenu}
            </Sider>
            <Layout className="site-layout">
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
