import React, { useState, useEffect } from 'react';
// import './index.css';
import { Table, Button } from 'antd';
import type { ColumnsType, TableProps } from 'antd/es/table';
import BookSearch from './BookSearch';

import { AiOutlinePlusCircle } from 'react-icons/Ai';

import { getBookPagination } from '../../../services/api';

interface DataType {
    key: React.Key;
    name: string;
    chinese: number;
    math: number;
    english: number;
}

const columns: ColumnsType<DataType> = [
    {
        title: 'ID',
        dataIndex: '_id',
    },
    {
        title: 'Name',
        dataIndex: 'bookName',
    },
    {
        title: 'Genre',
        dataIndex: 'category',
    },
    {
        title: 'Author',
        dataIndex: 'author',
    },
    {
        title: 'Price ($)',
        dataIndex: 'price',
    },
    {
        title: 'Action',
        dataIndex: '',
        render: (text, record, index) => {
            return (
                <div style={{ display: "flex", gap: "10px" }}>
                    <Button size='small'>Delete</Button>
                    <Button
                        size='small'
                        type='primary'
                    >Update</Button>
                </div>
            )
        }
    },
];


const BookTable = () => {

    const [current, setCurrent] = useState<number>(1);
    const [pageSize, setPageSize] = useState<number>(3);
    const [bookData, setBookData] = useState<[]>([]);
    const [total, setTotal] = useState<number>(0)

    const [query, setQuery] = useState<string>("")
    const [isTableLoading, setIsTableLoading] = useState<boolean>(false)


    const onChange: TableProps<DataType>['onChange'] = (pagination, filters, sorter, extra) => {
        console.log('params', pagination, filters, sorter, extra);
        if (pagination.current !== current) {
            setCurrent(pagination.current)
        }

        if (pagination.pageSize !== pageSize) {
            setCurrent(1)
            setPageSize(pagination.pageSize)
        }

    };

    const fetchBookPagination = async (filterQuerry: string) => {
        let query = `pageSize=${pageSize}&current=${current}`
        if (filterQuerry) {
            query += filterQuerry
        }

        setIsTableLoading(true)
        let response = await getBookPagination(query);
        setIsTableLoading(false)

        if (response && response.errorCode === 0) {

            setTotal(response.data.meta.total)
        }

        if (response && response.errorCode === 0) {

            setBookData(response.data.result)
        }

    }

    const handleSearch = (query: object) => {
        setQuery(query)
        fetchBookPagination(query)
    }

    useEffect(() => {
        //console.log("gugu");

        fetchBookPagination(query)
    }, [pageSize, current])

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
            <BookSearch handleSearch={handleSearch} />
            <Table
                columns={columns}
                dataSource={bookData}
                onChange={onChange}
                title={BookTableHeader}
                loading={isTableLoading}
                pagination={{
                    total: total,
                    current: current,
                    pageSize: pageSize,
                    showSizeChanger: true
                }}
            />
        </div>
    )
}


export default BookTable;