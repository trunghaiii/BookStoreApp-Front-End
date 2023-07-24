import React, { useEffect, useState } from 'react';
import './OrderHistory.scss';
import { Button, Table } from 'antd';
import type { ColumnsType } from 'antd/es/table';
import { getOrderHistory } from '../../services/api';
import moment from "moment"

interface DataType {
    key: number;
    time: any;
    detail: any;
}

const columns: ColumnsType<DataType> = [
    {
        title: 'Order Number',
        dataIndex: 'key',
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
                    time: moment(order.createdAt).format('DD-MM-YYYY HH:mm:ss'),
                    detail: <Button>View Detail</Button>
                })
            })
        }
        setOrderHistoryData(orderData);

    }

    useEffect(() => {

        fetchOrderHistory()
    }, [])
    return (
        <div className='order-history-container'>
            <Table columns={columns} dataSource={orderHistoryData} pagination={false} />
        </div>
    )
}

export default OrderHistory