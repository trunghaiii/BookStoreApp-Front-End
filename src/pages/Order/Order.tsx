
import "./Order.scss"
import { InputNumber } from 'antd';
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
                        <InputNumber min={1} max={10} defaultValue={3} onChange={onChange} />
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
                        <InputNumber min={1} max={10} defaultValue={3} onChange={onChange} />
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
                        <InputNumber min={1} max={10} defaultValue={3} onChange={onChange} />
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
                order counting
            </div>
        </div>
    )
}


export default Order;