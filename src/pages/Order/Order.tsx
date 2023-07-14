
import "./Order.scss"
import { InputNumber, Button } from 'antd';
import { RiDeleteBin6Line } from 'react-icons/Ri';

const Order = () => {

    const onChange = (value: any) => {
        console.log('changed', value);
    };

    return (
        <div className="order-container">
            <div className="order-list">
                <div className="order">
                    <img src="https://picsum.photos/id/1018/1000/600/" alt="" />

                    <div className="book-name">
                        Sorry! I am Just A Hooker
                    </div>
                    <div className="price">
                        59$/item
                    </div>
                    <div className="quantity-input">
                        <InputNumber style={{ width: "60px" }} min={1} max={10} defaultValue={3} onChange={onChange} />
                    </div>
                    <div className="total-price">
                        Total: 200$
                    </div>
                    <div className="delete-btn">
                        <RiDeleteBin6Line />
                    </div>
                </div>

                <div className="order">
                    <img src="https://picsum.photos/id/1018/1000/600/" alt="" />

                    <div className="book-name">
                        Sorry! I am Just A Hooker
                    </div>
                    <div className="price">
                        59$/item
                    </div>
                    <div className="quantity-input">
                        <InputNumber style={{ width: "60px" }} min={1} max={10} defaultValue={3} onChange={onChange} />
                    </div>
                    <div className="total-price">
                        Total: 200$
                    </div>
                    <div className="delete-btn">
                        <RiDeleteBin6Line />
                    </div>
                </div>

                <div className="order">
                    <img src="https://picsum.photos/id/1018/1000/600/" alt="" />

                    <div className="book-name">
                        Sorry! I am Just A Hooker
                    </div>
                    <div className="price">
                        59$/item
                    </div>
                    <div className="quantity-input">
                        <InputNumber style={{ width: "60px" }} min={1} max={10} defaultValue={3} onChange={onChange} />
                    </div>
                    <div className="total-price">
                        Total: 200$
                    </div>
                    <div className="delete-btn">
                        <RiDeleteBin6Line />
                    </div>
                </div>
            </div>
            <div className="order-counting">
                <div className="order-counting-board">
                    <div className="order-number">
                        <div className="order-number-title">
                            Total Order Number:
                        </div>
                        <div className="order-number-digit">
                            5
                        </div>
                    </div>
                    <div className="total-price">
                        <div className="total-price-title">
                            Total Price:
                        </div>
                        <div className="total-price-digit">
                            200$
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