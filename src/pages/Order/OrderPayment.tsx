
import { useEffect, useState } from "react";
import "./OrderPayment.scss"
import { InputNumber, Button, Form, Input, Checkbox, Divider, message, notification } from 'antd';
import { useSelector, useDispatch } from "react-redux";
import { postOrder } from "../../services/api";
import { doCartReset } from "../../redux/slices/orderSlice";
const { TextArea } = Input;

interface IProps {
    setCurrentStep: any
}
const OrderPayment = (props: IProps) => {

    const [form] = Form.useForm();
    const cart = useSelector((state) => state.order.cart)
    const accountUser = useSelector((state) => state.account.user)
    const dispatch = useDispatch()
    const [totalPrice, setTotalPrice] = useState<number>(0)

    const handleTotalPrice = () => {
        let result: number = 0;

        for (let i = 0; i < cart.length; i++) {

            result += (cart[i].quantity * cart[i].detail.price)
        }

        setTotalPrice(result)
    }

    const onFinish = async (values: any) => {
        console.log('Success:', values, accountUser);
        // 0. build order detail data for calling Api
        let detailData: any = [];
        for (let i = 0; i < cart.length; i++) {
            detailData.push({
                bookName: cart[i].detail.bookName,
                quantity: cart[i].quantity,
                _id: cart[i]._id
            })
        }

        //1. build data ready for calling Api
        let orderData: object = {
            name: values.name,
            address: values.address,
            phone: values.phone,
            totalPrice: totalPrice,
            userId: accountUser.id,
            detail: detailData
        }

        // 2. call Api 
        let response = await postOrder(orderData)
        if (response && response.errorCode === 0) {
            dispatch(doCartReset())
            props.setCurrentStep(3)
            message.success(response.errorMessage)
        } else {
            notification.error({
                message: `Notification`,
                description: response.errorMessage,
                duration: 5
            });
        }

    };

    useEffect(() => {
        // console.log("effect gg");

        handleTotalPrice()
    }, [])

    return (
        <div style={{ height: "100vh" }} className="order-payment-container">
            <div className="order-list">
                {cart && cart.length > 0
                    ?
                    cart.map((bookOrder) => {
                        return (
                            <div className="order">
                                <img src={bookOrder.detail.slider[0]} alt="" />

                                <div className="book-name">
                                    {bookOrder.detail.bookName}
                                </div>
                                <div className="price">
                                    {bookOrder.detail.price}$/item
                                </div>
                                <div className="quantity-input">
                                    <InputNumber
                                        style={{ width: "60px" }}
                                        min={1}
                                        max={bookOrder.detail.quantity}
                                        value={bookOrder.quantity}
                                    />
                                </div>
                                <div className="total-price">
                                    Total: {bookOrder.quantity * bookOrder.detail.price}$
                                </div>
                            </div>
                        )
                    })
                    :
                    <div></div>
                }

            </div>
            <div className="order-payment-detail">
                <div className="customer-info">
                    <Form
                        form={form}
                        name="basic"
                        labelCol={{ span: 24 }}
                        wrapperCol={{ span: 24 }}
                        initialValues={{ remember: true }}
                        onFinish={onFinish}
                        autoComplete="off"
                    >
                        <Form.Item
                            label="Name"
                            name="name"
                            rules={[{ required: true, message: 'Please input your Name!' }]}
                        >
                            <Input />
                        </Form.Item>

                        <Form.Item
                            label="Phone Number"
                            name="phone"
                            rules={[{ required: true, message: 'Please input your Phone Number!' }]}
                        >
                            <Input />
                        </Form.Item>

                        <Form.Item
                            label="Address"
                            name="address"
                            rules={[{ required: true, message: 'Please input your Address!' }]}
                        >
                            <TextArea rows={2} />
                        </Form.Item>

                        {/* <Form.Item wrapperCol={{ offset: 8, span: 16 }}>
                            <Button type="primary" htmlType="submit">
                                Submit
                            </Button>
                        </Form.Item> */}
                    </Form>
                </div>
                {/* <Divider /> */}
                <div className="payment-method">
                    <h5>Payment Method</h5>
                    <Checkbox checked>Pay when received order</Checkbox>
                </div>
                <Divider />
                <div className="total-amount">
                    <h4>Total Amount:</h4>
                    <span>{totalPrice}$</span>
                </div>
                {/* <Divider /> */}
                <div className="confirm-order">
                    <Button
                        onClick={() => form.submit()}
                        type="primary"
                    >Confirm Order</Button>
                </div>
            </div>
        </div>
    )
}

export default OrderPayment;