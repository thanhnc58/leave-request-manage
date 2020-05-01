/*
Render Side bar based on user role
 */

import React, {useContext, useState} from 'react';
import {useHistory, useLocation} from "react-router-dom";
import 'antd/dist/antd.css';
import './Sidebar.css';
import {Layout, Menu} from 'antd';
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


const {Sider, Content} = Layout;
const Sidebar = (pros) => {
    const [sidebar] = useState({collapsed: false});
    const [user, setUser] = useContext(userContext);
    const history = useHistory();
    let location = useLocation();

    let isUser = user.role === constant.Role.USER;
    const logout = () => {
        setUser({});
        localStorage.removeItem('user');
        history.push("/login");
    };

    const AdminMenu = () => {
        return <Menu theme="dark" mode="inline" selectedKeys={[location.pathname]}>
            <Menu.Item key="/request-list" onClick={() => history.push("/request-list")}>
                <TableOutlined/>
                <span>Request list</span>
            </Menu.Item>
            <Menu.Item key="/holiday" onClick={() => history.push("/holiday")}>
                <VideoCameraOutlined/>
                <span>Holiday</span>
            </Menu.Item>
            <Menu.Item key="/statistic" onClick={() => history.push("/statistic")}>
                <StockOutlined />
                <span>Statistic</span>
            </Menu.Item>
            <Menu.Item key="/calendar" onClick={() => history.push("/calendar")}>
                <CalendarOutlined />
                <span>Calendar</span>
            </Menu.Item>
            <Menu.Item key="/year-leave" onClick={() => history.push("/year-leave")}>
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
        return <Menu theme="dark" mode="inline" selectedKeys={[location.pathname]}>
            <Menu.Item key="/request-list" onClick={() => history.push("/request-list")}>
                <TableOutlined/>
                <span>Request list</span>
            </Menu.Item>
            <Menu.Item key="/statistic" onClick={() => history.push("/statistic")}>
                <StockOutlined />
                <span>Statistic</span>
            </Menu.Item>
            <Menu.Item key="/calendar" onClick={() => history.push("/calendar")}>
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
