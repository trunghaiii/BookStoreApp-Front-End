
import React from 'react';
// import './index.css';
import { Table, Tag } from 'antd';
import type { ColumnsType, TableProps } from 'antd/es/table';
import {
    CheckCircleOutlined,
    SyncOutlined,
} from '@ant-design/icons';

interface DataType {
    key: React.Key;
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
    const data: DataType[] = [
        {
            key: '1',
            id: "111",
            name: "Hai man",
            status: <Tag icon={<CheckCircleOutlined />} color="success">
                delivered
            </Tag>
        },
        {
            key: '2',
            id: "222",
            name: "Toom",
            status: <Tag icon={<SyncOutlined spin />} color="warning">
                pending
            </Tag>
        },

    ];

    const onChange: TableProps<DataType>['onChange'] = (pagination, filters, sorter, extra) => {
        console.log('params', pagination);
    };
    return (
        <div className="order-table-container">
            <Table
                columns={columns}
                dataSource={data}
                onChange={onChange}
                pagination={{
                    total: 10,
                    pageSize: 3,
                    current: 1
                }}
            />
        </div>
    )
}

export default OrderTable