import React from 'react';
// import './index.css';
import { Table } from 'antd';
import type { TableColumnsType, TableProps } from 'antd';

interface DataType {
    key: React.Key;
    rank: number;
    name: String;
    sold: number;
}

const columns: TableColumnsType<DataType> = [
    {
        title: 'Ranking',
        dataIndex: 'rank',
    },
    {
        title: 'Book Name',
        dataIndex: 'name',
    },
    {
        title: 'Books Sold',
        dataIndex: 'sold',
    }

];

const data: DataType[] = [
    {
        key: '1',
        rank: 1,
        name: "Green Life",
        sold: 70,

    },
    {
        key: '2',
        rank: 2,
        name: "Green Life",
        sold: 60,

    },
    {
        key: '3',
        rank: 3,
        name: "Green Life",
        sold: 50,

    },
    {
        key: '4',
        rank: 4,
        name: "Green Life",
        sold: 40,

    },
    {
        key: '5',
        rank: 5,
        name: "Green Life",
        sold: 30,

    }

];


const Bestseller = () => {

    const onChange: TableProps<DataType>['onChange'] = (pagination, filters, sorter, extra) => {
        console.log('params', pagination, filters, sorter, extra);
    };

    return (
        <>
            <Table
                columns={columns}
                dataSource={data}
                onChange={onChange} />;
        </>
    )
}

export default Bestseller