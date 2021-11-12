import React from 'react'
import { Link } from 'react-router-dom'
import OrderPay from '../OrderPay/OrderPay'

const UserOrder = ({order, ind}) => {

    const [show, setShow] = useState(false);

    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);

    return (
        <div>
            <li className="clients_table_item text-white" key={ind}>
                <span className="client_id">{ind + 1}</span>
                <span className="client_name">{order.product_name}</span>
                <span className="client_all_sum">{order.product_price}</span>
                <span className="client_paid">{order.paid_sum}</span>
                <span className="client_count">{order.order_month}</span>
            </li>  
            <OrderPay

            />
        </div>
        
    )
}

export default UserOrder
