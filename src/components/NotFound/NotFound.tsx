import React from 'react';
// import './index.css';
import { Button, Result } from 'antd';
import { useNavigate } from 'react-router-dom';

const NotFound = () => {
    const navigate = useNavigate()
    return (
        <Result
            status="403"
            title="403"
            subTitle="Sorry, you are not authorized to access this page."
            extra={<Button
                onClick={() => navigate("/")}
                type="primary">Back Home</Button>}
        />
    )
}

export default NotFound