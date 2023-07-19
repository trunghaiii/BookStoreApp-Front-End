// import React from 'react';
// import './index.css';
import { Button, Form, Input, message, notification } from 'antd';
import { putUpdatePassword } from '../../../services/api';

const UpdateUserPassword = () => {
    const [form] = Form.useForm();

    const onFinish = async (values: any) => {
        console.log('Success:', values);

        let response = await putUpdatePassword(values.oldpassword, values.newpassword);

        if (response && response.errorCode === 0) {

            form.resetFields()
            message.success(response.errorMessage)
        } else {
            notification.error({
                message: `Notification`,
                description: response.errorMessage,
                duration: 5
            });
        }

    };


    return (
        <div className="update-user-password-container">
            <Form
                form={form}
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
                    name="newpassword"
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