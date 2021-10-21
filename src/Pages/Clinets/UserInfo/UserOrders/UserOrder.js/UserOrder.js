import React, { useEffect } from 'react'

const UserOrder = ({order, ind}) => {
    useEffect(() => {
        console.log(order);
    }, [])
    return (
        <div>
            <li className="clients_table_item text-white" key={ind}>
                <span className="client_id">{ind + 1}</span>
                <span className="client_name">{order.product_name}</span>
                <span className="client_all_sum">{order.product_price}</span>
                <span className="client_paid">{order.paid_sum}</span>
                <span className="client_count">{order.order_month}</span>
            </li>
        </div>
    )
}

export default UserOrder
