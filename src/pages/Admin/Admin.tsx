import React, { useEffect, useState } from 'react';
// import './index.css';
import { Col, Row, Statistic } from 'antd';

import CountUp from 'react-countup';
import { getDashboard } from '../../services/api';

const formatter = (value: number) => <CountUp end={value} separator="," />;


const Admin = () => {

    const [totalUser, setTotalUser] = useState<number>(0)
    const [totalOrder, setTotalOrder] = useState<number>(0)

    const getDashboardDetail = async () => {
        let response = await getDashboard();

        if (response && response.errorCode === 0) {
            setTotalOrder(response.data.totalOrder)
            setTotalUser(response.data.totalUser)
        }

    }
    useEffect(() => {
        getDashboardDetail()
    }, [])
    return (
        <div className="dashboard-conatiner">
            <Row >
                <Col sm={12} xs={24}>
                    <Statistic title="Total Users" value={totalUser} formatter={formatter} />
                </Col>
                <Col sm={12} xs={24}>
                    <Statistic title="Total Orders" value={totalOrder} precision={2} formatter={formatter} />
                </Col>
            </Row>
        </div>
    )
}

export default Admin