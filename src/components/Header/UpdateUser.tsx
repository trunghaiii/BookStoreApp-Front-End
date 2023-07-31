
import React, { useState } from 'react';
//import './index.css';
import { Modal, Tabs, Button } from 'antd';
import type { TabsProps } from 'antd';

import UpdateUserInfo from './UpdateUserInfo/UpdateUserInfo';
import UpdateUserPassword from './UpdateUserPassword/UpdateUserPassword';

interface IProps {
    showUpdateUserModal: boolean;
    setShowUpdateUserModal: any;
}

const UpdateUser = (props: IProps) => {
    const { showUpdateUserModal, setShowUpdateUserModal } = props;

    const handleCancel = () => {
        setShowUpdateUserModal(false);
    };

    const onChange = (key: string) => {
        console.log(key);
    };

    const items: TabsProps['items'] = [
        {
            key: '1',
            label: `Update Info`,
            children: <UpdateUserInfo />,
        },
        {
            key: '2',
            label: `Change Password`,
            children: <UpdateUserPassword />,
        }
    ];
    return (
        <Modal
            width={"90%"}
            title="Basic Modal"
            open={showUpdateUserModal}
            onCancel={handleCancel}
            footer={[
                <Button key="back" onClick={handleCancel}>
                    Cancel
                </Button>
            ]}
        >
            <Tabs defaultActiveKey="1" items={items} onChange={onChange} />
        </Modal>
    )
}

export default UpdateUser;