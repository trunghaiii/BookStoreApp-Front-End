import './Header.scss';
import { useEffect, useState } from 'react';
import { BsSearch } from 'react-icons/Bs';
import { GiBlackBook } from 'react-icons/Gi';
import { FaBars } from 'react-icons/Fa';
import { AiOutlineShoppingCart } from 'react-icons/Ai';
import { Input, MenuProps, Dropdown, Space, Badge, Drawer, message, Avatar, Popover } from 'antd';
import { DownOutlined } from '@ant-design/icons';
import { useSelector, useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';

import { postLogOut } from '../../services/api';

import { doLogOut } from '../../redux/slices/accountSlice';

import CartContent from './CartContent';


const text = <span>Shopping Cart</span>;

const Header = () => {

    const [openDrop, setOpenDrop] = useState<boolean>(false);
    const [openDrawer, setOpenDrawer] = useState<boolean>(false);

    const user = useSelector(state => state.account.user)
    const cart = useSelector(state => state.order.cart)

    const dispatch = useDispatch()
    const navigate = useNavigate()

    const handleMenuClick: MenuProps['onClick'] = (e) => {
        if (e.key === '3') {
            setOpenDrop(false);
        }
    };
    const handleOpenChange = (flag: boolean) => {
        setOpenDrop(flag);
    };
    const showDrawer = () => {
        setOpenDrawer(true);
    };
    const onClose = () => {
        setOpenDrawer(false);
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

    let items: MenuProps['items'] = [
        {
            label: 'Account Management',
            key: '1',
        },
        {
            label: <span onClick={() => handleLogOut()}>Log Out</span>,
            key: '2',
        }
    ];
    if (user && user.role === "ADMIN") {
        items?.unshift({
            label: <span onClick={() => window.location.href = "/admin"}>Admin Management</span>,
            key: '0',
        })
    }


    return (
        <div className="header-container">
            <div className='header-drawer-icon' onClick={showDrawer}>
                <FaBars />
            </div>
            <div className="header-icon">
                <GiBlackBook />
            </div>
            <div className='header-title'>BookStore</div>
            <div className='header-search'>
                <Input size="large" placeholder="What book do you want to search?"
                    prefix={<BsSearch style={{ color: "rgb(0, 204, 255)" }} />} />
            </div>
            <div className='header-cart-icon'>
                <Popover
                    placement="leftTop"
                    title={text}
                    content={CartContent}>
                    <Badge
                        showZero={true}
                        count={cart?.length ?? 0}
                    >
                        <AiOutlineShoppingCart size="30px" color="rgb(0, 204, 255)" />
                    </Badge>
                </Popover>
            </div>
            <div className='header-account'>
                {user && user.fullName
                    ?
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
                                <Avatar shape="square" size={32} src={user.avatar} /> {user.fullName}
                                <DownOutlined />
                            </Space>
                        </a>
                    </Dropdown>
                    :
                    <div onClick={() => navigate("/login")}>Account</div>
                }
            </div>
            <Drawer
                className='header-drawer'
                title="Account Menu"
                placement="left"
                onClose={onClose}
                open={openDrawer}>
                <div className='header-drawer-item' style={{ textAlign: "center" }}>
                    {user && user.role === "ADMIN" &&
                        <div style={{ cursor: "pointer" }} onClick={() => navigate("/admin")}>Admin Management</div>
                    }
                    <hr />
                    <div style={{ cursor: "pointer" }}>Account Management</div>
                    <hr />
                    <div style={{ cursor: "pointer" }} onClick={() => handleLogOut()}>Log Out.</div>
                </div>

            </Drawer>
        </div>
    )
}

export default Header