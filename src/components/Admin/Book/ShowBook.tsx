import React, { useState } from 'react';
// import './index.css';
import { Drawer, Badge, Descriptions } from 'antd';
import moment from "moment"

interface IProps {
    showBook: boolean;
    setShowBook: any;
    bookShowData: any;
}

const ShowBook = (props: IProps) => {

    const { showBook, setShowBook, bookShowData } = props;

    const onClose = () => {
        setShowBook(false);
    };


    return (
        <Drawer width={"50%"} title="Basic Drawer" placement="right" onClose={onClose} open={showBook}>
            <Descriptions column={2} title="Book Info" bordered>
                <Descriptions.Item label="ID">{bookShowData._id}</Descriptions.Item>
                <Descriptions.Item label="Book Name">{bookShowData.bookName}</Descriptions.Item>
                <Descriptions.Item label="Author">{bookShowData.author}</Descriptions.Item>
                <Descriptions.Item label="Price($)">{bookShowData.price}</Descriptions.Item>

                <Descriptions.Item label="Genre" span={3}>
                    <Badge status="processing" text={bookShowData.category} />
                </Descriptions.Item>
                <Descriptions.Item label="Created At">
                    {moment(bookShowData.createdAt).format('DD-MM-YYYY HH:mm:ss')}
                </Descriptions.Item>
                <Descriptions.Item label="Updated At">
                    {moment(bookShowData.updatedAt).format('DD-MM-YYYY HH:mm:ss')}
                </Descriptions.Item>
            </Descriptions>
        </Drawer>
    )
}


export default ShowBook