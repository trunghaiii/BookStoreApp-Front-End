import React, { useEffect, useState } from 'react';
import './OrderHistory.scss';
import { Button, Table } from 'antd';
import type { ColumnsType } from 'antd/es/table';
import { getOrderHistory } from '../../services/api';
import moment from "moment"

interface DataType {
    key: number;
    time: any;
    price: any;
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
        title: 'Total Cost',
        dataIndex: 'price',
    }
];
const OrderHistory = () => {

    const [orderHistoryData, setOrderHistoryData] = useState<any[]>([])
    const [current, setCurrent] = useState<number>(1)
    const [pageSize, setPageSize] = useState<number>(3)
    const [total, setTotal] = useState<number>(0)

    const fetchOrderHistory = async () => {

        let response = await getOrderHistory(current, pageSize)
        // build data to display on table
        let orderData: any[] = [];

        if (response && response.errorCode === 0 && response.data.orderDetail.length > 0) {
            setTotal(response.data.totalOrder)

            response.data.orderDetail.map((order: any, index: number) => {
                orderData.push({
                    key: index + 1,
                    time: moment(order.createdAt).format('DD-MM-YYYY HH:mm:ss'),
                    price: `${order.totalPrice}$`
                })
            })
        }
        setOrderHistoryData(orderData);

    }

    const tableChange = (pagination) => {
        console.log(pagination);
        setCurrent(pagination.current)
        setPageSize(pagination.pageSize)
    }

    useEffect(() => {
        fetchOrderHistory()
    }, [current, pageSize])
    return (
        <div className='order-history-container'>
            <Table
                columns={columns}
                dataSource={orderHistoryData}
                onChange={tableChange}
                pagination={{
                    total: total,
                    current: current,
                    pageSize: pageSize,
                }} />
        </div>
    )
}

export default OrderHistory