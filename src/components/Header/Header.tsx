import './Header.scss';
import { useState } from 'react';
import { BsSearch } from 'react-icons/Bs';
import { GiBlackBook } from 'react-icons/Gi';
import { FaBars } from 'react-icons/Fa';
import { AiOutlineShoppingCart } from 'react-icons/Ai';
import { Input, MenuProps, Dropdown, Space, Badge, Drawer } from 'antd';
import { DownOutlined } from '@ant-design/icons';
import { useSelector } from 'react-redux';


const items: MenuProps['items'] = [
    {
        label: 'Information',
        key: '1',
    },
    {
        label: 'Log Out',
        key: '2',
    }
];

const Header = () => {

    const [openDrop, setOpenDrop] = useState<boolean>(false);
    const [openDrawer, setOpenDrawer] = useState<boolean>(false);

    const user = useSelector(state => state.account.user)

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
                <Badge count={99}>
                    <AiOutlineShoppingCart size="30px" color="rgb(0, 204, 255)" />
                </Badge>
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
                                Welcome, {user.fullName}
                                <DownOutlined />
                            </Space>
                        </a>
                    </Dropdown>
                    :
                    <div>Account</div>
                }
            </div>
            <Drawer
                className='header-drawer'
                title="Account Menu"
                placement="left"
                onClose={onClose}
                open={openDrawer}>
                <div className='header-drawer-item' style={{ textAlign: "center" }}>
                    <p>Information</p>
                    <hr />
                    <p>Log Out.</p>
                </div>

            </Drawer>
        </div>
    )
}

export default Header