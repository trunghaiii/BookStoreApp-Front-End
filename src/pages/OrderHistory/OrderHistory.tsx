import React, { useEffect, useState } from 'react';
import './OrderHistory.scss';
import { Table } from 'antd';
import type { ColumnsType } from 'antd/es/table';
import { getOrderHistory } from '../../services/api';
import ReactJson from 'react-json-view'
import moment from "moment"

interface DataType {
    key: number;
    price: number;
    time: any;
    detail: any;
}

const columns: ColumnsType<DataType> = [
    {
        title: 'Number',
        dataIndex: 'key',
    },
    {
        title: 'Total Price ($)',
        dataIndex: 'price',
    },
    {
        title: 'Time',
        dataIndex: 'time',
    },
    {
        title: 'Detail',
        dataIndex: 'detail',
    }
];
const data: DataType[] = [
    {
        key: 1,
        price: 111,
        time: 'New York No. 1 Lake Park',
        detail: ['nice', 'developer'],
    },
    {
        key: 2,
        price: 222,
        time: 'London No. 1 Lake Park',
        detail: ['loser'],
    },
    {
        key: 3,
        price: 333,
        time: 'Sydney No. 1 Lake Park',
        detail: ['cool', 'teacher'],
    },
];
const OrderHistory = () => {

    const [orderHistoryData, setOrderHistoryData] = useState<any[]>([])

    const fetchOrderHistory = async () => {

        let response = await getOrderHistory()
        // build data to display on table
        let orderData: any[] = [];
        if (response && response.errorCode === 0 && response.data.length > 0) {
            response.data.map((order: any, index: number) => {
                orderData.push({
                    key: index + 1,
                    price: order.totalPrice,
                    time: moment(order.createdAt).format('DD-MM-YYYY HH:mm:ss'),
                    detail: <ReactJson
                        src={order.detail}
                        name="Orders Detail"
                        displayObjectSize={false}
                        displayDataTypes={false}
                        enableClipboard={false}
                        collapsed={true}
                    />,
                })
            })
        }

        console.log(orderData);

        setOrderHistoryData(orderData);

    }

    useEffect(() => {
        console.log("gg");

        fetchOrderHistory()
    }, [])
    return (
        <div className='order-history-container'>
            <Table columns={columns} dataSource={orderHistoryData} pagination={false} />
        </div>
    )
}

export default OrderHistory