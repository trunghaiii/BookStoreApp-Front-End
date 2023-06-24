import React, { useEffect, useState } from 'react';
// import './index.css';
import { Table, Button, Popconfirm, message, notification } from 'antd';
import type { ColumnsType, TableProps } from 'antd/es/table';

import { deleteUser, getUserPagination } from '../../../services/api';

import ShowUser from './ShowUser';
import CreateNewUserModal from './CreateNewUserModal';
import UpdateUserModal from './UpdateUserModal';
import UserSearch from './UserSearch';

import { AiOutlinePlusCircle } from 'react-icons/Ai';


interface DataType {
    _id: React.Key;
    name: string;
    chinese: number;
    math: number;
    english: number;
}

const UserTable = () => {


    const columns: ColumnsType<DataType> = [
        {
            title: 'ID',
            // dataIndex: '_id',
            render: (text, record, index) => {
                // console.log("recoed", record);

                return (
                    <a onClick={() => handleDisplayUser(record)}>{record._id}</a>
                )
            }
        },
        {
            title: 'Name',
            dataIndex: 'fullName',
            // sorter: true
        },
        {
            title: 'Email',
            dataIndex: 'email',
            // sorter: true
        },
        {
            title: 'Phone Number',
            dataIndex: 'phone',
            //  sorter: true
        },
        {
            title: 'Action',
            render: (text, record, index) => {
                return (
                    <div style={{ display: "flex", gap: "10px" }}>
                        <Popconfirm
                            placement="leftTop"
                            title={"Delete user confirmation!"}
                            description={"Are you sure to delete this User?"}
                            onConfirm={() => handleDeleteUser(record)}
                            okText="Yes"
                            cancelText="No"
                        >
                            <Button size='small'>Delete</Button>
                        </Popconfirm>

                        <Button
                            size='small'
                            type='primary'
                            onClick={() => handleUpdateUser(record)}
                        >Update</Button>
                    </div>
                )
            }
        },
    ];

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

    const [query, setQuery] = useState<string>("")
    const [isTableLoading, setIsTableLoading] = useState<boolean>(false)

    const [showUserInfo, setShowUserInfo] = useState<object>({})
    const [showUser, setShowUser] = useState<boolean>(false)

    const [showCreateUser, setShowCreateUser] = useState<boolean>(false)
    const [showUpdateUser, setShowUpdateUser] = useState<boolean>(false)
    const [updateData, setUpdateData] = useState<object>({})


    const TableHeader = () => {
        return (
            <div style={{ display: "flex", justifyContent: "space-between" }} className='table-header'>
                <div className='table-header-title'>
                    User List
                </div>
                <div className='table-header-AddNew-btn'>
                    <Button
                        type="primary"
                        icon={<AiOutlinePlusCircle />}
                        onClick={() => setShowCreateUser(!showCreateUser)}
                    >
                        New user
                    </Button>
                </div>
            </div>
        )
    }


    const fetchUserPagination = async (filterQuerry: string) => {
        let query = `pageSize=${pageSize}&current=${current}`
        if (filterQuerry) {
            query += filterQuerry
        }

        setIsTableLoading(true)
        let response = await getUserPagination(query);
        setIsTableLoading(false)

        if (response && response.errorCode === 0) {

            setTotal(response.data.meta.total)
        }

        if (response && response.errorCode === 0) {

            setUserList(response.data.result)
        }

    }

    const handleSearch = (query: object) => {
        setQuery(query)
        fetchUserPagination(query)
    }

    const handleDisplayUser = (user) => {
        // console.log(user);
        setShowUser(true)
        setShowUserInfo(user)
        //alert("meme")
    }

    const handleUpdateUser = (userData: object) => {

        setUpdateData(userData)
        setShowUpdateUser(true)

    }

    const handleDeleteUser = async (userInfo: object) => {

        let response = await deleteUser(userInfo._id);

        if (response && response.errorCode === 0) {
            message.success(response.errorMessage)
            fetchUserPagination("")
        } else {
            notification.error({
                message: `Notification`,
                description: response.errorMessage,
                duration: 5
            });
        }

    }

    useEffect(() => {
        //console.log("gugu");

        fetchUserPagination(query)
    }, [pageSize, current])


    return (
        <div>
            <div className='user-search'>
                <UserSearch handleSearch={handleSearch} />
            </div>
            <div className='user-table'>
                <Table
                    title={TableHeader}
                    columns={columns}
                    dataSource={userList}
                    onChange={onChange}
                    pagination={{
                        total: total,
                        current: current,
                        pageSize: pageSize,
                        showSizeChanger: true
                    }}
                    loading={isTableLoading}

                />
            </div>
            <ShowUser
                showUser={showUser}
                setShowUser={setShowUser}
                showUserInfo={showUserInfo}
            />
            <CreateNewUserModal
                showCreateUser={showCreateUser}
                setShowCreateUser={setShowCreateUser}
                fetchUserPagination={fetchUserPagination}
            />
            <UpdateUserModal
                showUpdateUser={showUpdateUser}
                setShowUpdateUser={setShowUpdateUser}
                updateData={updateData}
                fetchUserPagination={fetchUserPagination}
            />
        </div>

    )
}


export default UserTable;