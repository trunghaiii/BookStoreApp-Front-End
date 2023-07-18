
import "./UpdateUserInfo.scss"
import { UserOutlined, UploadOutlined } from '@ant-design/icons';
import { Avatar, Button, Upload, Form, Input } from 'antd';
import { useState } from "react";
import { useSelector } from "react-redux";

const UpdateUserInfo = () => {

    const accountUser = useSelector((state) => state.account.user)
    const [imageFile, setImageFile] = useState<any>("")

    const onChangeImage = (file: any) => {
        console.log("gg", file);
        setImageFile(file.file.originFileObj)
    }

    const onFinish = (values: any) => {
        console.log('Success:', values);
    };

    console.log(accountUser);

    return (
        <div className="update-user-info-container">
            <div className="image-update">
                <Avatar
                    src={imageFile ? URL.createObjectURL(imageFile) : ""}
                    size={140}
                    icon={<UserOutlined />} />
                <Upload onChange={onChangeImage} maxCount={1} showUploadList={false}>
                    <Button icon={<UploadOutlined />}>Upload</Button>
                </Upload>
            </div>
            <div className="detail-update">
                <Form
                    name="basic"
                    labelCol={{ span: 24 }}
                    wrapperCol={{ span: 24 }}
                    onFinish={onFinish}
                    autoComplete="off"
                >
                    <Form.Item
                        label="Email"
                        name="email"
                        initialValue={accountUser.email}
                    // rules={[{ required: true, message: 'Please input your username!' }]}
                    >
                        <Input disabled={true} />
                    </Form.Item>

                    <Form.Item
                        label="Name"
                        name="name"
                        initialValue={accountUser.fullName}
                        rules={[{ required: true, message: 'Please input your Name' }]}
                    >
                        <Input />
                    </Form.Item>

                    <Form.Item
                        label="Phone Number"
                        name="phone"
                        initialValue={accountUser.phone}
                        rules={[{ required: true, message: 'Please input your Phone!' }]}
                    >
                        <Input />
                    </Form.Item>

                    <Form.Item wrapperCol={{ offset: 8, span: 16 }}>
                        <Button type="primary" htmlType="submit">
                            Update
                        </Button>
                    </Form.Item>
                </Form>
            </div>
        </div>
    )
}

export default UpdateUserInfo;