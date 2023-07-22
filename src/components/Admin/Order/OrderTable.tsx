
import React, { useEffect, useState } from 'react';
// import './index.css';
import { Table, Tag } from 'antd';
import type { ColumnsType, TableProps } from 'antd/es/table';
import {
    CheckCircleOutlined,
    SyncOutlined,
} from '@ant-design/icons';
import { getOrderPagination } from '../../../services/api';
import OrderDetailDrawer from './OrderDetailDrawer';

interface DataType {
    id: string;
    name: string;
    status: any;
}


const OrderTable = () => {

    const [totalOrder, setTotalOrder] = useState<number>(0)
    const [current, setCurrent] = useState<number>(1)
    const [pageSize, setPageSize] = useState<number>(3)
    const [orderData, setOrderData] = useState<DataType[]>([])

    const [showOrderDrawer, setShowOrderDrawer] = useState<boolean>(false)

    const onChange: TableProps<DataType>['onChange'] = (pagination) => {
        console.log('params', pagination);
        setCurrent(pagination.current)
        setPageSize(pagination.pageSize)

    };

    const columns: ColumnsType<DataType> = [
        {
            title: 'Order ID (Click id to view detail)',
            dataIndex: '_id',
            // render: (value, record, index) => {

            //     return (
            //         <a onClick={() => handleShowOrder()}>{record.id}</a>
            //     )
            // }
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

    const handleShowOrder = () => {
        setShowOrderDrawer(true);
    }

    const fetchOrderPagination = async () => {
        let response = await getOrderPagination(current, pageSize)

        let builtData: any = [];
        if (response && response.errorCode === 0) {
            builtData = response.data.orderDetail;
            builtData.map((order) => {
                order.status = order.isFinished === true
                    ?
                    <Tag icon={<CheckCircleOutlined />} color="success">
                        delivered
                    </Tag>
                    :
                    <Tag icon={<SyncOutlined spin />} color="warning">
                        pending
                    </Tag>
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
            <OrderDetailDrawer
                showOrderDrawer={showOrderDrawer}
                setShowOrderDrawer={setShowOrderDrawer}
            />
        </div>
    )
}

export default OrderTable