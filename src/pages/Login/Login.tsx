import React from 'react';
import './Login.scss';
import { useNavigate } from "react-router-dom";
import { Button, Checkbox, Form, Input, Divider } from 'antd';

const onFinish = (values: any) => {
    console.log('Success:', values);
};

// const onFinishFailed = (errorInfo: any) => {
//     console.log('Failed:', errorInfo);
// };

const Login: React.FC = () => {
    const navigate = useNavigate();

    return (
        <div className='login-page'>
            <Form
                name="basic"
                labelCol={{ span: 8 }}
                wrapperCol={{ span: 16 }}
                style={{ maxWidth: 600, margin: '0 auto' }}
                initialValues={{ remember: true }}
                onFinish={onFinish}
                // onFinishFailed={onFinishFailed}
                autoComplete="off"
            >
                <h1 style={{ textAlign: 'center', marginTop: 100 }}>Login</h1>
                <Divider />
                <Form.Item
                    label="Email"
                    name="email"
                    rules={[{ required: true, message: 'Please input your Email!' }]}
                >
                    <Input />
                </Form.Item>

                <Form.Item
                    label="Password"
                    name="password"
                    rules={[{ required: true, message: 'Please input your password!' }]}
                >
                    <Input.Password />
                </Form.Item>

                <Form.Item name="remember" valuePropName="checked" wrapperCol={{ offset: 8, span: 16 }}>
                    <Checkbox>Remember me</Checkbox>
                </Form.Item>

                <Form.Item wrapperCol={{ offset: 8, span: 16 }}>
                    <Button type="primary" htmlType="submit">
                        Login
                    </Button>
                </Form.Item>
                <span className='or-text'>Or</span>
                <p>You do not have account yet?
                    <span
                        className='register-btn'
                        onClick={() => navigate("/register")}
                    >Register</span></p>
                <Divider />
            </Form>
        </div>
    )
};

export default Login;