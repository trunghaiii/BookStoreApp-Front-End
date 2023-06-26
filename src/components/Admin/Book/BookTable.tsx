import React from 'react';
// import './index.css';
import { Table, Button } from 'antd';
import type { ColumnsType, TableProps } from 'antd/es/table';
import BookSearch from './BookSearch';

import { AiOutlinePlusCircle } from 'react-icons/Ai';

interface DataType {
    key: React.Key;
    name: string;
    chinese: number;
    math: number;
    english: number;
}

const columns: ColumnsType<DataType> = [
    {
        title: 'Name',
        dataIndex: 'name',
    },
    {
        title: 'Chinese Score',
        dataIndex: 'chinese',
    },
    {
        title: 'Math Score',
        dataIndex: 'math',
    },
    {
        title: 'English Score',
        dataIndex: 'english',
    },
];

const data: DataType[] = [
    {
        key: '1',
        name: 'John Brown',
        chinese: 98,
        math: 60,
        english: 70,
    },
    {
        key: '2',
        name: 'Jim Green',
        chinese: 98,
        math: 66,
        english: 89,
    },
    {
        key: '3',
        name: 'Joe Black',
        chinese: 98,
        math: 90,
        english: 70,
    },
    {
        key: '4',
        name: 'Jim Red',
        chinese: 88,
        math: 99,
        english: 89,
    },
];

const onChange: TableProps<DataType>['onChange'] = (pagination, filters, sorter, extra) => {
    console.log('params', pagination, filters, sorter, extra);
};
const BookTable = () => {

    const BookTableHeader = () => {
        return (
            <div style={{ display: "flex", justifyContent: "space-between" }} className='book-table-header'>
                <div>
                    Book List:
                </div>
                <div>
                    <Button
                        type="primary"
                        icon={<AiOutlinePlusCircle />}
                    >
                        New Book
                    </Button>
                </div>
            </div>
        )
    }

    return (
        <div>
            <BookSearch />
            <Table
                columns={columns}
                dataSource={data}
                onChange={onChange}
                title={BookTableHeader}
            />
        </div>
    )
}


export default BookTable;