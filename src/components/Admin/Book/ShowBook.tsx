import React, { useState } from 'react';
// import './index.css';
import { Drawer, Badge, Descriptions, Divider } from 'antd';
import moment from "moment"

import ShowBookImage from './ShowBookImage';

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

    //console.log("///", bookShowData);

    return (
        <Drawer width={"90%"} title="Basic Drawer" placement="right" onClose={onClose} open={showBook}>
            <Descriptions column={2} title="Book Info" bordered>
                <Descriptions.Item label="ID">{bookShowData._id}</Descriptions.Item>
                <Descriptions.Item label="Book Name">{bookShowData.bookName}</Descriptions.Item>
                <Descriptions.Item label="Author">{bookShowData.author}</Descriptions.Item>
                <Descriptions.Item label="Price($)">{bookShowData.price}</Descriptions.Item>
                <Descriptions.Item label="Quantity">{bookShowData.quantity}</Descriptions.Item>
                <Descriptions.Item label="Sold">{bookShowData.sold}</Descriptions.Item>

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
            <Divider orientation="left">Book Images</Divider>
            <ShowBookImage
                bookShowData={bookShowData}
            />
        </Drawer>
    )
}


export default ShowBook