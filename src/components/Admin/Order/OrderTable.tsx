
import React, { useEffect, useState } from 'react';
// import './index.css';
import { Table, Tag } from 'antd';
import type { ColumnsType, TableProps } from 'antd/es/table';
import {
    CheckCircleOutlined,
    SyncOutlined,
} from '@ant-design/icons';
import { getOrderPagination } from '../../../services/api';

interface DataType {
    id: string;
    name: string;
    status: any;
}

const columns: ColumnsType<DataType> = [
    {
        title: 'Order ID (Click id to view detail)',
        dataIndex: 'id',
    },
    {
        title: 'Customer Name',
        dataIndex: 'name'
    },
    {
        title: 'Status',
        dataIndex: 'status'
    }
];


const OrderTable = () => {

    const [totalOrder, setTotalOrder] = useState<number>(0)
    const [current, setCurrent] = useState<number>(1)
    const [pageSize, setPageSize] = useState<number>(3)
    const [orderData, setOrderData] = useState<DataType[]>([])

    const onChange: TableProps<DataType>['onChange'] = (pagination) => {
        console.log('params', pagination);
        setCurrent(pagination.current)
        setPageSize(pagination.pageSize)

    };

    const fetchOrderPagination = async () => {
        let response = await getOrderPagination(current, pageSize)

        let builtData: any = [];
        if (response && response.errorCode === 0) {
            response.data.orderDetail.map((order) => {
                builtData.push({
                    id: order._id,
                    name: order.name,
                    status: order.isFinished === true
                        ?
                        <Tag icon={<CheckCircleOutlined />} color="success">
                            delivered
                        </Tag>
                        :
                        <Tag icon={<SyncOutlined spin />} color="warning">
                            pending
                        </Tag>

                })
            })

            setOrderData(builtData)
            setTotalOrder(response.data.totalOrder)

        }

        // console.log(builtData);


    }
    useEffect(() => {
        fetchOrderPagination()
    }, [current, pageSize])
    return (
        <div className="order-table-container">
            <Table
                columns={columns}
                dataSource={orderData}
                onChange={onChange}
                pagination={{
                    total: totalOrder,
                    pageSize: pageSize,
                    current: current
                }}
            />
        </div>
    )
}

export default OrderTable