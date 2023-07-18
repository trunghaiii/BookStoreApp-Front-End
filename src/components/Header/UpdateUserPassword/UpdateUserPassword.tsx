// import React from 'react';
// import './index.css';
import { Button, Form, Input } from 'antd';

const UpdateUserPassword = () => {

    const onFinish = (values: any) => {
        console.log('Success:', values);
    };


    return (
        <div className="update-user-password-container">
            <Form
                name="basic"
                labelCol={{ span: 24 }}
                wrapperCol={{ span: 24 }}
                onFinish={onFinish}
                autoComplete="off"
            >

                <Form.Item
                    label="Old Password"
                    name="oldpassword"
                    rules={[{ required: true, message: 'Please input your Old password!' }]}
                >
                    <Input.Password />
                </Form.Item>

                <Form.Item
                    label="New Password"
                    name="new password"
                    rules={[{ required: true, message: 'Please input your New password!' }]}
                >
                    <Input.Password />
                </Form.Item>


                <Form.Item wrapperCol={{ offset: 8, span: 16 }}>
                    <Button type="primary" htmlType="submit">
                        Update
                    </Button>
                </Form.Item>
            </Form>
        </div>
    )
}

export default UpdateUserPassword