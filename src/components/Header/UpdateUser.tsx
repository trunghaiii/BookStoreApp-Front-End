
import React, { useState } from 'react';
//import './index.css';
import { Button, Modal } from 'antd';

interface IProps {
    showUpdateUserModal: boolean;
    setShowUpdateUserModal: any;
}

const UpdateUser = (props: IProps) => {
    const { showUpdateUserModal, setShowUpdateUserModal } = props;

    const showModal = () => {
        setShowUpdateUserModal(true);
    };

    const handleOk = () => {
        setShowUpdateUserModal(false);
    };

    const handleCancel = () => {
        setShowUpdateUserModal(false);
    };
    return (
        <Modal title="Basic Modal" open={showUpdateUserModal} onOk={handleOk} onCancel={handleCancel}>
            <p>Some contents...</p>
            <p>Some contents...</p>
            <p>Some contents...</p>
        </Modal>
    )
}

export default UpdateUser;