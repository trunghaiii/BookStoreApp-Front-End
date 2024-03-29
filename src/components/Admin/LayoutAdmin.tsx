
import React, { useState } from 'react';
import './LayoutAdmin.scss';
import {
    MenuFoldOutlined,
    MenuUnfoldOutlined
} from '@ant-design/icons';
import { Layout, Menu, Button, theme, MenuProps, Dropdown, Space, message, Avatar } from 'antd';
import { DownOutlined } from '@ant-design/icons';
// import { useSelector } from "react-redux"
import { Outlet, useNavigate } from "react-router-dom"

import { RiDashboardLine } from "react-icons/ri";
import { AiOutlineUser } from "react-icons/ai";
import { GoBook } from "react-icons/go";
import { RiMoneyDollarCircleLine } from "react-icons/ri";
import { BsFillLightningChargeFill } from "react-icons/bs";
import { useSelector } from 'react-redux';

import { postLogOut } from '../../services/api';

import { doLogOut } from '../../redux/slices/accountSlice';
import { useDispatch } from 'react-redux';
import UpdateUser from '../Header/UpdateUser';



const { Header, Sider, Content, Footer } = Layout;


const LayoutAdmin = () => {
    const [collapsed, setCollapsed] = useState(false);
    const [openDrop, setOpenDrop] = useState<boolean>(false);

    const [showUpdateUserModal, setShowUpdateUserModal] = useState<boolean>(false)

    const navigate = useNavigate()
    const user = useSelector((state) => state.account.user)
    const dispatch = useDispatch()

    const {
        token: { colorBgContainer },
    } = theme.useToken();

    const handleMenuClick: MenuProps['onClick'] = (e) => {
        if (e.key === '3') {
            setOpenDrop(false);
        }
    };
    const handleOpenChange = (flag: boolean) => {
        setOpenDrop(flag);
    };


    const handleLogOut = async () => {
        const response = await postLogOut();
        if (response && response.errorCode === 0) {
            dispatch(doLogOut())
            message.success(response.errorMessage)
            navigate("/")
        }

        // alert("log out")
    }


    const items: MenuProps['items'] = [
        {
            label: <div onClick={() => navigate("/")}>Home Page</div>,
            key: '',
        },
        {
            label: <div onClick={() => setShowUpdateUserModal(true)}>Account Management</div>,
            key: '1',
        },
        {
            label: <div onClick={() => handleLogOut()}>Log Out</div>,
            key: '2',
        }
    ];

    return (
        <div className="app-layout-admin">
            <Layout

            >
                <Sider
                    theme="light"
                    trigger={null}
                    collapsible
                    collapsed={collapsed}
                    collapsedWidth="0">
                    <div className="demo-logo-vertical" />
                    <Menu
                        mode="inline"
                        defaultSelectedKeys={['dashboard']}
                        items={[
                            {
                                key: 'title-admin',
                                label: <span
                                    style={{
                                        color: 'rgb(0, 204, 255)',
                                        fontSize: "20px",
                                    }}
                                    onClick={() => navigate("/admin")}
                                >Admin</span>,
                            },
                            {
                                key: 'dashboard',
                                icon: <RiDashboardLine onClick={() => navigate("/admin")} />,
                                label: <span onClick={() => navigate("/admin")}>Dashboard</span>,
                            },
                            {
                                key: 'usermanage',
                                icon: <AiOutlineUser onClick={() => navigate("/admin/user")} />,
                                label: <span onClick={() => navigate("/admin/user")}>User Management</span>,

                            },
                            {
                                key: 'bookmanage',
                                icon: <GoBook onClick={() => navigate("/admin/book")} />,
                                label: <span onClick={() => navigate("/admin/book")}>Book Management</span>,
                            },
                            {
                                key: 'ordermanage',
                                icon: <RiMoneyDollarCircleLine onClick={() => navigate("/admin/order")} />,
                                label: <span onClick={() => navigate("/admin/order")}>Order Management</span>,
                            },
                            {
                                key: 'bestmanage',
                                icon: <BsFillLightningChargeFill onClick={() => navigate("/admin/bestseller")} />,
                                label: <span onClick={() => navigate("/admin/bestseller")}>Best-Selling Books</span>,
                            },
                        ]}
                    />
                </Sider>
                <Layout
                    className='child-layout'
                >
                    <Header className='header-admin' style={{ padding: 0, background: colorBgContainer }}>
                        <Button
                            type="text"
                            icon={collapsed ? <MenuUnfoldOutlined /> : <MenuFoldOutlined />}
                            onClick={() => setCollapsed(!collapsed)}
                            style={{
                                fontSize: '16px',
                                width: 64,
                                height: 64,
                            }}
                        />
                        <div className='header-account'>
                            <Dropdown
                                menu={{
                                    items,
                                    onClick: handleMenuClick,
                                }}
                                onOpenChange={handleOpenChange}
                                open={openDrop}
                            >
                                <a onClick={(e) => e.preventDefault()}>
                                    <Space>
                                        <Avatar shape="square" size={32} src={user.avatar} /> {user && user.fullName}
                                        <DownOutlined />
                                    </Space>
                                </a>
                            </Dropdown>
                        </div>
                    </Header>
                    <Content
                        style={{
                            background: colorBgContainer,
                        }}
                    >
                        <Outlet />
                    </Content>
                    <Footer style={{
                        textAlign: 'center',
                        position: 'fixed',
                        left: '0',
                        bottom: '0',
                        width: '100%',
                        marginTop: '5px'

                    }}>BookStore ©2023 Created by Hai Tran</Footer>
                </Layout>
            </Layout>
            <UpdateUser
                showUpdateUserModal={showUpdateUserModal}
                setShowUpdateUserModal={setShowUpdateUserModal}
            />
        </div>
    )
}

export default LayoutAdmin