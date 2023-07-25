
import "./UpdateUserInfo.scss"
import { UserOutlined, UploadOutlined } from '@ant-design/icons';
import { Avatar, Button, Upload, Form, Input, message, notification } from 'antd';
import { useState } from "react";
import { useSelector } from "react-redux";
import { putUpdateUserInfo } from "../../../services/api";
import { useDispatch } from "react-redux";
import { updateUserRedux } from "../../../redux/slices/accountSlice";

const UpdateUserInfo = () => {

    const accountUser = useSelector((state) => state.account.user)
    const dispatch = useDispatch()
    const [imageFile, setImageFile] = useState<any>("")
    const [isUpdated, setIsUpdated] = useState<boolean>(false)

    const onChangeImage = (file: any) => {
        setImageFile(file.file.originFileObj)
    }

    const onFinish = async (values: any) => {
        console.log('Success:', values);
        console.log(imageFile);

        setIsUpdated(true);
        let response = await putUpdateUserInfo(values.name, values.phone, imageFile);
        setIsUpdated(false);
        if (response && response.errorCode === 0) {
            dispatch(updateUserRedux(response.data))
            localStorage.removeItem("access_token")
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
        <div className="update-user-info-container">
            <div className="image-update">
                <Avatar
                    src={imageFile ? URL.createObjectURL(imageFile) : accountUser.avatar}
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
                        <Button
                            loading={isUpdated}
                            type="primary"
                            htmlType="submit">
                            Update
                        </Button>
                    </Form.Item>
                </Form>
            </div>
        </div>
    )
}

export default UpdateUserInfo;