import React from 'react';
import Navbar from '../../Navbar/Navbar';
import { Container } from 'reactstrap';
import Client from '../Client/Client';



function Clients({clientsList, changeId}) {

    return (
        <div>
            <Navbar />
            <Container>
                <div className="clients-tab mt-5">
                    <h6 className="text-white">КЛИЕНТЫ</h6>
                    <div className="hr"></div>
                    <div className="table-box">

                    </div>
                    <ul className="clients_table text-white">
                        <li className="clients_table_item table_header">
                            <span className="client_id font-weight-bold">№</span>
                            <span className="client_name font-weight-bold">Ф.И.О</span>
                            <span className="client_all_sum font-weight-bold">Общий долг.</span>
                            <span className="client_paid font-weight-bold">Оплачено</span>
                            <span className="client_count font-weight-bold">Щтука</span>
                        </li>
                        {
                            clientsList.map((item, index) => {
                                return (
                                    <Client 
                                        key={index}
                                        client={item}
                                        click= {() => {changeId(item.client_id)}}
                                    />
                                )
                            })
                        }
                    </ul>                
                </div>
            </Container>
        </div>
    )
}

export default Clients;
