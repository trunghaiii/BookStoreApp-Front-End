import React, { useState } from 'react';
import './Comment.scss';
import { Modal, Rate, Button, Form, Input } from 'antd';

interface IProps {
    showComment: boolean;
    setShowComment: any;
}

const { TextArea } = Input;

const Comment = (props: IProps) => {

    const { showComment, setShowComment } = props

    let [arr, setArr] = useState([1, 2, 3, 4, 5, 6, 7, 8, 9, 10])

    const onFinish = (values: any) => {
        console.log('Success:', values);
    };

    const handleCancel = () => {
        setShowComment(false);
    };


    return (
        <Modal
            title="Basic Modal"
            width={"70%"}
            open={showComment}
            footer={[
                <Button key="back" onClick={handleCancel}>
                    Close
                </Button>
            ]}
        >

            <div className='comment-container'>

                {arr.map(() => {
                    return (
                        <div className='comment-content'>
                            <div className='user-info'>
                                <img src="https://res.cloudinary.com/dbljsakpb/image/upload/v1688427611/BookStoreApp/sf95og7ccjk8plgbobwf.jpg" alt="" />
                                <span>Lam Python</span>
                                <div className='star-rate'><Rate defaultValue={4} /></div>
                            </div>
                            <div className='content'>
                                This Book is fucking good
                            </div>

                            <Button size='small' type="primary" danger>
                                Delete
                            </Button>

                        </div>
                    )
                })}

                <div className='comment-form'>
                    <Form
                        name="basic"
                        wrapperCol={{ span: 24 }}
                        onFinish={onFinish}
                    >
                        <Form.Item
                            name="comment"
                        >
                            <TextArea placeholder='Write some comment' rows={4} />
                        </Form.Item>


                        <Form.Item>
                            <Button type="primary" htmlType="submit">
                                Submit
                            </Button>
                        </Form.Item>
                    </Form>
                </div>
            </div>
        </Modal>
    )
}

export default Comment; 