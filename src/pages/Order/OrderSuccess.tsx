
import { SmileOutlined } from '@ant-design/icons';
import { Button, Result } from 'antd';
import { useNavigate } from 'react-router-dom';

const OrderSuccess = () => {
    const navigate = useNavigate()
    return (
        <Result
            icon={<SmileOutlined />}
            title="Great, Your Order has been Placed Successfully!"
            extra={<Button
                onClick={() => navigate("/history")}
                type="primary"
            >View Order History</Button>}
        />
    )
}

export default OrderSuccess