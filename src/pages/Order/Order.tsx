
import "./Order.scss"
import { InputNumber, Button } from 'antd';
import { useEffect, useState } from "react";
import { RiDeleteBin6Line } from 'react-icons/Ri';
import { useSelector } from "react-redux";

const Order = () => {

    const cart = useSelector((state) => state.order.cart)
    const [totalPrice, setTotalPrice] = useState<number>(0)

    const onChange = (value: any) => {
        console.log('changed', value);
    };

    const handleTotalPrice = () => {
        let result: number = 0;

        for (let i = 0; i < cart.length; i++) {

            result += (cart[i].quantity * cart[i].detail.price)
        }
        setTotalPrice(result)
    }

    useEffect(() => {
        handleTotalPrice()
    }, [])

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
                                        defaultValue={bookOrder.quantity}
                                        onChange={onChange} />
                                </div>
                                <div className="total-price">
                                    Total: {bookOrder.quantity * bookOrder.detail.price}$
                                </div>
                                <div className="delete-btn">
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
                        <Button style={{ width: "100%" }} type="primary">Buying Now</Button>
                    </div>
                </div>
            </div>
        </div>
    )
}


export default Order;