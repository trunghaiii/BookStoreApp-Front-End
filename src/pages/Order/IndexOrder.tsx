import React, { useState } from 'react';
import { Steps } from 'antd';

import Order from "./Order";
import OrderPayment from './OrderPayment';

const items = [
    {
        title: 'Create Order',
    },
    {
        title: 'Place Order',
    },
    {
        title: 'Payment',
    },
]
const IndexOrder = () => {
    const [currentStep, setCurrentStep] = useState<number>(1)
    return (
        <div>
            <Steps
                style={{ marginTop: "10px", marginBottom: "10px" }}
                size="small"
                current={currentStep}
                items={items}
            />
            {currentStep === 1

                ?
                <Order
                    setCurrentStep={setCurrentStep}
                />
                :
                <OrderPayment />
            }

        </div>
    )
}

export default IndexOrder;