
import React, { useState } from 'react';
// import './index.css';
import { Drawer } from 'antd';

interface IProps {
    showOrderDrawer: boolean;
    setShowOrderDrawer: any
}

const OrderDetailDrawer = (props: IProps) => {

    const { showOrderDrawer, setShowOrderDrawer } = props

    const onClose = () => {
        setShowOrderDrawer(false);
    };

    return (
        <Drawer title="Basic Drawer" placement="right" onClose={onClose} open={showOrderDrawer}>
            <p>Some contents...</p>
            <p>Some contents...</p>
            <p>Some contents...</p>
        </Drawer>
    )
}

export default OrderDetailDrawer;