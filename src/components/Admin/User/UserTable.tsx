import React, { useEffect, useState } from 'react';
// import './index.css';
import { Table, Button } from 'antd';
import type { ColumnsType, TableProps } from 'antd/es/table';
import UserSearch from './UserSearch';

import { getUserPagination } from '../../../services/api';

interface DataType {
    _id: React.Key;
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
        dataIndex: 'fullName',
        sorter: true
    },
    {
        title: 'Email',
        dataIndex: 'email',
        sorter: true
    },
    {
        title: 'Phone Number',
        dataIndex: 'phone',
        sorter: true
    },
    {
        title: 'Action',
        render: (text, record, index) => {
            return (
                <><Button>Delete</Button></>
            )
        }
    },
];

const UserTable = () => {

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

    const [userList, setUserList] = useState<[]>([])
    const [current, setCurrent] = useState<number>(1)
    const [pageSize, setPageSize] = useState<number>(3)
    const [total, setTotal] = useState<number>(0)

    const fetchUserPagination = async () => {
        let query = `pageSize=${pageSize}&current=${current}`

        let response = await getUserPagination(query);

        if (response && response.errorCode === 0) {

            setTotal(response.data.meta.total)
        }

        if (response && response.errorCode === 0) {

            setUserList(response.data.result)
        }

        if (response && response.errorCode === 0) {

            setUserList(response.data.result)
        }

    }

    useEffect(() => {
        fetchUserPagination()
    }, [pageSize, current])


    return (
        <div>
            <div className='user-search'>
                <UserSearch />
            </div>
            <div className='user-table'>
                <Table
                    columns={columns}
                    dataSource={userList}
                    onChange={onChange}
                    pagination={{ total: total, current: current, pageSize: pageSize, showSizeChanger: true }}

                />
            </div>
        </div>

    )
}

export default UserTable;