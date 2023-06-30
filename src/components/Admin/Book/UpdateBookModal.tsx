
import React, { useState } from 'react';
// import './index.css';
import { Modal } from 'antd';

interface Iprops {
    showUpdateBookModal: boolean;
    setShowUpdateBookModal: any;
}
const UpdateBookModal = (props: Iprops) => {
    const { showUpdateBookModal, setShowUpdateBookModal } = props

    const handleOk = () => {
        setShowUpdateBookModal(false);
    };

    const handleCancel = () => {
        setShowUpdateBookModal(false);
    };

    return (
        <Modal title="Basic Modal" open={showUpdateBookModal} onOk={handleOk} onCancel={handleCancel}>
            <p>Some contents...</p>
            <p>Some contents...</p>
            <p>Some contents...</p>
        </Modal>
    )
}

export default UpdateBookModal