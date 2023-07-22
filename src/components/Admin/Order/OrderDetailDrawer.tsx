
import React, { useState } from 'react';
// import './index.css';
import { Drawer, Badge, Descriptions } from 'antd';

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
        <Drawer
            width={"50%"}
            title="Basic Drawer"
            placement="right"
            onClose={onClose}
            open={showOrderDrawer}>
            <Descriptions title="User Info" bordered>
                <Descriptions.Item label="Customer Name">Hai Tran</Descriptions.Item>
                <Descriptions.Item label="Address" span={2}>1 Park Hill Crt</Descriptions.Item>

                <Descriptions.Item label="Order Price">100$</Descriptions.Item>
                <Descriptions.Item label="Phone" span={2}>
                    54665455454
                </Descriptions.Item>
                <Descriptions.Item label="Status" span={3}>
                    <Badge status="processing" text="Pending" />
                </Descriptions.Item>
                <Descriptions.Item label="Created At">22-2-2022</Descriptions.Item>

            </Descriptions>
        </Drawer>
    )
}

export default OrderDetailDrawer;