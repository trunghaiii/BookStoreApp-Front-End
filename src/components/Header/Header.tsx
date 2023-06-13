import './Header.scss';
import { useState } from 'react';
import { BsSearch } from 'react-icons/Bs';
import { GiBlackBook } from 'react-icons/Gi';
import { AiOutlineShoppingCart } from 'react-icons/Ai';
import { Input, MenuProps, Dropdown, Space, Badge } from 'antd';
import { DownOutlined } from '@ant-design/icons';


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
    const [open, setOpen] = useState(false);

    const handleMenuClick: MenuProps['onClick'] = (e) => {
        if (e.key === '3') {
            setOpen(false);
        }
    };
    const handleOpenChange = (flag: boolean) => {
        setOpen(flag);
    };
    return (
        <div className="header-container">
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
                <Dropdown
                    menu={{
                        items,
                        onClick: handleMenuClick,
                    }}
                    onOpenChange={handleOpenChange}
                    open={open}
                >
                    <a onClick={(e) => e.preventDefault()}>
                        <Space>
                            Account
                            <DownOutlined />
                        </Space>
                    </a>
                </Dropdown>
            </div>
        </div>
    )
}

export default Header