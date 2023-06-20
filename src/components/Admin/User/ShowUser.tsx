import React, { useState } from 'react';
// import './index.css';
import { Drawer, Badge, Descriptions } from 'antd';
import moment from "moment"

const ShowUser = (props: any) => {

    const { showUser, setShowUser, showUserInfo } = props;

    const onClose = () => {
        setShowUser(false);
    };

    console.log("jhsdfsfdh", showUserInfo);

    return (
        <>
            <Drawer width="50vw" title="User Detail" placement="right" onClose={onClose} open={showUser}>
                <Descriptions column={2} bordered>
                    <Descriptions.Item label="ID">{showUserInfo._id}</Descriptions.Item>
                    <Descriptions.Item label="Name">{showUserInfo.fullName}</Descriptions.Item>
                    <Descriptions.Item label="Email">{showUserInfo.email}</Descriptions.Item>
                    <Descriptions.Item label="Phone">{showUserInfo.phone}</Descriptions.Item>
                    <Descriptions.Item label="Role" span={2}>
                        <Badge status="processing" text={showUserInfo.role} />
                    </Descriptions.Item>
                    <Descriptions.Item label="Created At">
                        {moment(showUserInfo.createdAt).format('DD-MM-YYYY HH:mm:ss')}
                    </Descriptions.Item>
                    <Descriptions.Item label="Updated At">
                        {moment(showUserInfo.updatedAt).format('DD-MM-YYYY HH:mm:ss')}
                    </Descriptions.Item>
                </Descriptions>
            </Drawer>
        </>

    )
}

export default ShowUser;