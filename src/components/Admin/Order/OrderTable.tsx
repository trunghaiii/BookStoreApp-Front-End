
import React, { useEffect, useState } from 'react';
// import './index.css';
import { Button, Table, Tag, message, notification } from 'antd';
import type { ColumnsType, TableProps } from 'antd/es/table';
import {
    CheckCircleOutlined,
    SyncOutlined,
} from '@ant-design/icons';
import { getOrderPagination, postMarkDeliveredPending } from '../../../services/api';
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
    const [orderDrawerData, setOrderDrawerData] = useState({})

    const onChange: TableProps<DataType>['onChange'] = (pagination) => {
        console.log('params', pagination);
        setCurrent(pagination.current)
        setPageSize(pagination.pageSize)

    };

    const columns: ColumnsType<DataType> = [
        {
            title: 'Order ID (Click id to view detail)',
            dataIndex: '_id',
            render: (value, record, index) => {

                return (
                    <a onClick={() => handleShowOrder(record)}>{record._id}</a>
                )
            }
        },
        {
            title: 'Customer Name',
            dataIndex: 'name'
        },
        {
            title: 'Status',
            dataIndex: 'status'
        },
        {
            title: 'Action',
            dataIndex: 'action',
            render: (value, record, index) => {

                return (
                    record.isFinished === true
                        ?
                        <div>
                            <Button
                                disabled
                                onClick={() => handleDeliverPending(record)}
                                type='primary'
                                size='small'>Delivered</Button>
                            <Button
                                onClick={() => handleDeliverPending(record)}
                                style={{ backgroundColor: "#D89E04", marginLeft: "3px", color: "white" }}
                                size='small'>Pending</Button>
                        </div>
                        :

                        <div>
                            <Button
                                onClick={() => handleDeliverPending(record)}
                                type='primary'
                                size='small'>Delivered</Button>
                            <Button
                                disabled
                                onClick={() => handleDeliverPending(record)}
                                style={{ marginLeft: "3px" }}
                                type='primary'
                                size='small'>Pending</Button>
                        </div>

                )
            }
        }
    ];

    const handleShowOrder = (order: any) => {
        //console.log("order", order);
        setOrderDrawerData(order)
        setShowOrderDrawer(true);
    }

    const handleDeliverPending = async (order: any) => {
        let response = await postMarkDeliveredPending(order._id, order.isFinished);

        if (response && response.errorCode === 0) {
            message.success(response.errorMessage)
            fetchOrderPagination()
        } else {
            notification.error({
                message: `Notification`,
                description: response.errorMessage,
                duration: 5
            });
        }

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
                orderDrawerData={orderDrawerData}
            />
        </div>
    )
}

export default OrderTable