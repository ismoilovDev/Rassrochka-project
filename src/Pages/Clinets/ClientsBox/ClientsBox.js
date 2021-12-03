import React, { useEffect, useState } from 'react';
import { Container } from 'reactstrap';
import http from '../../../Services/getData';
import Client from '../Client/Client';
import Navbar from '../../Navbar/Navbar'


function Clients() {
   const [searchTerm, setSearchTerm] = useState('');
   const [result, setResult] = useState([])
   const [clients, setClients] = useState([]);
   // GET Clients ->
   useEffect(() => {
      http.get('/cilents')
         .then((res) => {
            setClients(res.data.payload)
         })
         .catch(err => console.log(err))
   }, // eslint-disable-next-line
      [])


   // SEARCH Hendler ->
   useEffect(() => {
      const filteredResults = clients.filter((client) =>
         (client.client_name !== undefined ? (client.client_name).toLowerCase() : "").includes(searchTerm.toLowerCase())
         || (client.phone1 !== undefined ? (client.phone1).toLowerCase() : "").includes(searchTerm.toLowerCase())
         || (client.phone2 !== undefined ? (client.phone2).toLowerCase() : "").includes(searchTerm.toLowerCase()));

         setResult(filteredResults.reverse());
   }, [clients, searchTerm])
   return (
      <>
         <Navbar
            setSearchTerm={setSearchTerm}
            searchTerm={searchTerm}
         />
         <Container>
            <div className="clients-tab mt-5">
               <h6 className="text-white">КЛИЕНТЫ</h6>
               <div className="hr"></div>
               <div className="">
                  <ul className="clients_table text-white">
                     <li className="clients_table_item table_header">
                        <span className="client_id font-weight-bold">№</span>
                        <span className="client_name font-weight-bold">Ф.И.О</span>
                        <span className="client_all_sum font-weight-bold">Общий долг.</span>
                        <span className="client_paid font-weight-bold">Оплачено</span>
                        <span className="client_count font-weight-bold">Щтука</span>
                     </li>
                     <ul className="clients_table_box">
                        {
                           (searchTerm === "" ? clients : result).map((item, index) => {
                              return (
                                 <Client
                                    key={index}
                                    id={index}
                                    client={item}
                                 />
                              )
                           })
                        }
                     </ul>
                  </ul>
               </div>
            </div>
         </Container>
      </>
   )
}

export default Clients;
