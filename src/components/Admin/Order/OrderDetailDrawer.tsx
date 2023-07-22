
import React, { useState } from 'react';
// import './index.css';
import { Drawer, Badge, Descriptions } from 'antd';
import moment from 'moment';

interface IProps {
    showOrderDrawer: boolean;
    setShowOrderDrawer: any;
    orderDrawerData: any;
}

const OrderDetailDrawer = (props: IProps) => {

    const { showOrderDrawer, setShowOrderDrawer, orderDrawerData } = props

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
                <Descriptions.Item label="Customer Name">{orderDrawerData.name}</Descriptions.Item>
                <Descriptions.Item label="Address" span={2}>{orderDrawerData.address}</Descriptions.Item>

                <Descriptions.Item label="Order Price">{orderDrawerData.totalPrice}$</Descriptions.Item>
                <Descriptions.Item label="Phone" span={2}>
                    {orderDrawerData.phone}
                </Descriptions.Item>
                <Descriptions.Item label="Status" span={3}>
                    {orderDrawerData.isFinished === true
                        ?
                        <Badge status="success" text="Delivered" />
                        :
                        <Badge status="processing" text="Pending" />
                    }

                </Descriptions.Item>
                <Descriptions.Item label="Created At">
                    {moment(orderDrawerData.createdAt).format('DD-MM-YYYY HH:mm:ss')}
                </Descriptions.Item>

            </Descriptions>
        </Drawer>
    )
}

export default OrderDetailDrawer;