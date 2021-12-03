import React from 'react'
import { Link } from 'react-router-dom';
const client = ({ client, id }) => {
   return (
      <Link to={`/user-info/${client.client_id}`} className="text-white" >
         <li className="clients_table_item" key={client.client_id}>
            {
               client.color === 'green' ? (
                  <span className="status-green"></span>
               ) : (
                  <span className="status-red"></span>
               )
            }
            <span className="client_id">{id + 1}</span>
            <span className="client_name">{client.client_name}</span>
            <span className="client_all_sum">{client.paid.toFixed(1)}</span>
            <span className="client_paid">{client.all_sum.toFixed(1)}</span>
            <span className="client_count">{client.count}</span>
         </li>
      </Link>
   )
}

export default client
