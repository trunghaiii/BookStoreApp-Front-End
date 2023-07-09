import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux'
import './Comment.scss';
import { Modal, Rate, Button, Form, Input } from 'antd';
import { getComment } from "../../services/api"

interface IProps {
    showComment: boolean;
    setShowComment: any;
    bookId: string;
}

const { TextArea } = Input;

const Comment = (props: IProps) => {

    const account = useSelector((state) => state.account)

    const { showComment, setShowComment, bookId } = props

    let [arr, setArr] = useState([1, 2, 3, 4, 5, 6, 7, 8, 9, 10])

    const [commentDetail, setCommentDetail] = useState([])

    const onFinish = (values: any) => {
        console.log('Success:', values);
    };

    const handleCancel = () => {
        setShowComment(false);
    };

    const fetchCommentDetail = async () => {
        let response = await getComment(bookId)

        if (response && response.errorCode === 0) {
            setCommentDetail(response.data)
        }

    }

    useEffect(() => {
        fetchCommentDetail()
    }, [bookId])

    console.log("commentDetail", commentDetail);
    //console.log("account", account);

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

                {commentDetail && commentDetail.map((comment) => {
                    return (
                        <div className='comment-content'>
                            <div className='user-info'>
                                <img src={comment.ownerAvatar} alt="" />
                                <span>{comment.ownerName}</span>
                                <div className='star-rate'><Rate defaultValue={comment.rate} /></div>
                            </div>
                            <div className='content'>
                                {comment.content}
                            </div>

                            <Button size='small' type="primary" danger>
                                Delete
                            </Button>

                        </div>
                    )
                })}

                {account && account.isAuthenticated === true
                    ?
                    <div className='comment-form'>
                        <Form
                            name="basic"
                            wrapperCol={{ span: 24 }}
                            onFinish={onFinish}
                        >
                            <Form.Item
                                name="rate"
                            >
                                <Rate />
                            </Form.Item>

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
                    :
                    <div></div>
                }

            </div>
        </Modal>
    )
}

export default Comment; 