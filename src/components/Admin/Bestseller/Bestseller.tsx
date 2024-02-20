import React, { useEffect, useState } from 'react';
// import './index.css';
import { Table } from 'antd';
import type { TableColumnsType, TableProps } from 'antd';
import { getBookPagination } from '../../../services/api';

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


const Bestseller = () => {

    const [topBookData, setTopBookData] = useState([]);

    const onChange: TableProps<DataType>['onChange'] = (pagination, filters, sorter, extra) => {
        console.log('params', pagination, filters, sorter, extra);
    };

    const fetchBookData = async () => {

        // 0. call api
        let response = await getBookPagination("")

        if (response && response.errorCode === 0) {

            // 1. sort array of data object
            let rawData = response.data.result.sort((a, b) => (b.sold - a.sold));

            // 2. create customized data
            let customizedData = []
            for (let i = 0; i < 5; i++) {
                customizedData.push({
                    key: JSON.stringify(i + 1),
                    rank: i + 1,
                    name: rawData[i].bookName,
                    sold: rawData[i].sold,
                })
            }

            // 3. set customized data to state
            setTopBookData(customizedData)
        }

    }

    useEffect(() => {
        fetchBookData()

    }, [])

    console.log('topBookData', topBookData);


    return (
        <>
            <Table
                columns={columns}
                dataSource={topBookData}
                onChange={onChange} />;
        </>
    )
}

export default Bestseller