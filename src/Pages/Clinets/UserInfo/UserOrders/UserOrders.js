import React from 'react'
import UserOrder from './UserOrder.js/UserOrder'


function UserOrders({ordersList}) {


    return (
        <div>
            <ul className="text-white m-0">
                <li className="clients_table_item table_header">
                    <span className="client_id font-weight-bold">№</span>
                    <span className="client_name font-weight-bold">Товар</span>
                    <span className="client_all_sum font-weight-bold">Общий долг</span>
                    <span className="client_paid font-weight-bold">Оплачено</span>
                    <span className="client_count font-weight-bold">Месяц</span>
                </li>
                {
                    ordersList.map((item, index) => {
                        return (
                            <UserOrder 
                                key={index}
                                order={item}
                                ind={index}
                            />
                        )
                    })
                }
            </ul>
        </div>
    )
}

export default UserOrders
