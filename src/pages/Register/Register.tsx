import React, { useState } from 'react';
// import './index.css';
import { Button, Form, Input, Divider, notification, message } from 'antd';
import { useNavigate } from "react-router-dom";
import { postRegisterUser } from "../../services/api"



// const onFinishFailed = (errorInfo: any) => {
//     console.log('Failed:', errorInfo);
// };

const Register: React.FC = () => {

    const [isSubmit, setIsSubmit] = useState<boolean>(false)

    const navigate = useNavigate();

    const onFinish = async (values: any) => {

        let { fullName, email, password, phone } = values

        setIsSubmit(true)
        const result = await postRegisterUser(fullName, email, password, phone)
        setIsSubmit(false)
        if (result?.errorCode === 0) {

            message.success(result.errorMessage)
            navigate("/login")
        } else {

            notification.error({
                message: `Notification`,
                description: result.errorMessage,
                duration: 5
            });
        }
        // console.log("result,", result);

    };
    return (
        <div className='register-page'>
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
                <h1 style={{ textAlign: 'center', marginTop: 100 }}>Register A New User</h1>
                <Divider />
                <Form.Item
                    label="Full Name"
                    name="fullName"
                    rules={[{ required: true, message: 'Please input your username!' }]}
                >
                    <Input />
                </Form.Item>

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

                <Form.Item
                    label="Phone"
                    name="phone"
                    rules={[{ required: true, message: 'Please input your Phone Number!' }]}
                >
                    <Input.Password />
                </Form.Item>

                {/* <Form.Item name="remember" valuePropName="checked" wrapperCol={{ offset: 8, span: 16 }}>
                <Checkbox>Remember me</Checkbox>
            </Form.Item> */}

                <Form.Item wrapperCol={{ offset: 8, span: 16 }}>
                    <Button type="primary" htmlType="submit" loading={isSubmit}>
                        Register
                    </Button>
                </Form.Item>
            </Form>
        </div>
    )

};

export default Register;