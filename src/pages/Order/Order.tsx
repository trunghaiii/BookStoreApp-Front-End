
import "./Order.scss"
import { InputNumber, Button } from 'antd';
import { useEffect, useState } from "react";
import { RiDeleteBin6Line } from 'react-icons/Ri';
import { useSelector, useDispatch } from "react-redux";
import { doCartDelete, doCartUpdate } from "../../redux/slices/orderSlice";

interface IProps {
    setCurrentStep: any
}
const Order = (props: IProps) => {

    const cart = useSelector((state) => state.order.cart)
    const dispatch = useDispatch()
    const [totalPrice, setTotalPrice] = useState<number>(0)

    const onChange = (bookOrder: any, value: any) => {
        // console.log('changed', value);
        // console.log(bookOrder);

        dispatch(doCartUpdate({ quantity: value, _id: bookOrder._id, detail: bookOrder.detail }))
    };

    const handleTotalPrice = () => {
        let result: number = 0;

        for (let i = 0; i < cart.length; i++) {

            result += (cart[i].quantity * cart[i].detail.price)
        }

        setTotalPrice(result)
    }

    const handleDeleteOrder = (bookOrder: any) => {
        dispatch(doCartDelete({ _id: bookOrder._id }))
    }

    const handlePlaceOrder = () => {
        props.setCurrentStep(2)
    }

    useEffect(() => {
        // console.log("effect gg");

        handleTotalPrice()
    }, [cart])

    return (
        <div className="order-container">
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
                                        defaultValue={bookOrder.quantity}
                                        onChange={(value) => onChange(bookOrder, value)} />
                                </div>
                                <div className="total-price">
                                    Total: {bookOrder.quantity * bookOrder.detail.price}$
                                </div>
                                <div
                                    onClick={() => handleDeleteOrder(bookOrder)}
                                    className="delete-btn"
                                >
                                    <RiDeleteBin6Line />
                                </div>
                            </div>
                        )
                    })
                    :
                    <div></div>
                }

            </div>
            <div className="order-counting">
                <div className="order-counting-board">
                    <div className="order-number">
                        <div className="order-number-title">
                            Total Order Number:
                        </div>
                        <div className="order-number-digit">
                            {cart.length}
                        </div>
                    </div>
                    <div className="total-price">
                        <div className="total-price-title">
                            Total Price:
                        </div>
                        <div className="total-price-digit">
                            {totalPrice}$
                        </div>
                    </div>
                    <div className="buying-btn">
                        <Button
                            style={{ width: "100%" }}
                            type="primary"
                            onClick={() => handlePlaceOrder()}
                        >Buying Now</Button>
                    </div>
                </div>
            </div>
        </div>
    )
}


export default Order;