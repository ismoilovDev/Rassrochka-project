import React from 'react'
import { Link } from 'react-router-dom';
const client = ({client, click}) => {
    return (
        <div>
            <Link to="/user-info" className="text-white" onClick={click} >
                <li className="clients_table_item" key={client.client_id}>
                    <span className="client_id">{client.client_id}</span>
                    <span className="client_name">{client.client_name}</span>
                    <span className="client_all_sum">{client.paid}</span>
                    <span className="client_paid">{client.all_sum}</span>
                    <span className="client_count">{client.count}</span>
                </li>
            </Link>
        </div>
    )
}

export default client
