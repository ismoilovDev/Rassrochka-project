import React, { useEffect, useState } from 'react';
import { ImUserTie } from "react-icons/im";
import { Card, CardBody, Col, Container, Form, FormGroup, Input, Label, Row, CardImg, CardGroup } from 'reactstrap';
import "../../../Styles/main.css";
import http from '../../../Services/getData';
import { useHistory } from 'react-router-dom';
import UserOrders from './UserOrders/UserOrders';
import AddOrder from './UserOrders/AddOrder/AddOrder';
import NotFound from '../../../assets/images/imagenotfound.png';

function UserInformation({ match }) {
   
   const [client, setClient] = useState({});
   const [succes, setSucces] = useState({});
   const [orders, setOrders] = useState([]);
   const [products, setProducts] = useState([]);

   // All Products-------------->
   useEffect(() => {
      http.get('/products')
         .then((res) => {
            setProducts(res.data.payload)
         })
         .catch(err => console.log(err))
   }, // eslint-disable-next-line 
      []);


   // Single Client Orders
   useEffect(() => {
      http.get(`/order/single_client?id=${match.params.id}`)
         .then((res) => {
            setOrders(res.data.payload)
         })
         .catch(err => console.log(err))
   }, // eslint-disable-next-line
      []);


   // Single Client
   useEffect(() => {
      http.get(`/client/single?id=${match.params.id}`)
         .then((res) => {
            setClient(res.data.payload);
            setSucces(res.data)
         })
         .catch(err => console.log(err))
   }, // eslint-disable-next-line
      []);

   return (
      <div className='user-informa mt-5'>
         <div className="main">
            <div className="user-infos mt-5 py-2">
               <Container>
                  <Row >
                     <Col lg="4" className="mt-2">
                        <Card>
                           <CardBody>
                              <div className="d-flex flex-column align-items-center text-center user-dicr">
                                 <ImUserTie />
                                 <div className="mt-3 text-white">
                                    <h4>{client.first_name + " " + client.last_name}</h4>
                                 </div>
                              </div>
                              <div className="hr"></div>

                              {/* 
                                 <div className="mt-5">
                                    <Button type="submit" className="text-white mb-2" outline color="secondary">Заблокировать телефон клиента</Button>{' '}
                                    <FormGroup check>
                                          <Input type="checkbox" id="gridCheck" />{' '}
                                          <Label check for="gridCheck">
                                             Проверить меня
                                          </Label>
                                    </FormGroup>
                                 </div> 
                              */}

                           </CardBody>
                        </Card>
                     </Col>
                     <Col lg="8" className="mt-2">
                        <Card className="pb-1">
                           <Form className="p-3 user-informations">
                              <FormGroup row>
                                 <Label for="Name" sm={3}>Ф.И.О</Label>
                                 <Col sm={9}>
                                    <Input type="text" id="Name" value={client.first_name + " " + client.last_name + " " + client.middle_name} />
                                 </Col>
                              </FormGroup>
                              <FormGroup className="mt-3 align-items-center" row>
                                 <Label for="PasportSeria" sm={3}>Паспортные данные</Label>
                                 <Col sm={9}>
                                    <Input type="text" id="PasportSeria" value={client.pasport_serial + " " + client.pasport_number} />
                                 </Col>
                              </FormGroup>
                              <Row className="mt-4 px-4">
                                 {
                                    client.phone1 ? (
                                    <Col xs="2" className="text-white phone">
                                       <span>Телефон 1</span>
                                       <p>{client.phone1}</p>
                                    </Col>) : ""
                                 }{
                                    client.phone2 ? (
                                    <Col xs="2" className="text-white phone">
                                       <span>Телефон 2</span>
                                       <p>{client.phone2}</p>
                                    </Col>) : ""
                                 }{
                                    client.phone3 ? (
                                    <Col xs="2" className="text-white phone">
                                       <span>Телефон 3</span>
                                       <p>{client.phone3}</p>
                                    </Col>) : ""
                                 }{
                                    client.phone4 ? (
                                    <Col xs="2" className="text-white phone">
                                       <span>Телефон 4</span>
                                       <p>{client.phone4}</p>
                                    </Col>) : ""
                                 }{
                                    client.phone5 ? (
                                    <Col xs="2" className="text-white phone">
                                       <span>Телефон 5</span>
                                       <p>{client.phone5}</p>
                                    </Col>) : ""
                                 }{
                                    client.phone6 ? (
                                    <Col xs="2" className="text-white phone">
                                       <span>Телефон 6</span>
                                       <p>{client.phone6}</p>
                                    </Col>) : ""
                                 }{
                                    client.phone7 ? (
                                    <Col xs="2" className="text-white phone">
                                       <span>Телефон 7</span>
                                       <p>{client.phone7}</p>
                                    </Col>) : ""
                                 }{
                                    client.phone8 ? (
                                    <Col xs="2" className="text-white phone">
                                       <span>Телефон 8</span>
                                       <p>{client.phone8}</p>
                                    </Col>) : ""
                                 }{
                                    client.phone9 ? (
                                    <Col xs="2" className="text-white phone">
                                       <span>Телефон 9</span>
                                       <p>{client.phone9}</p>
                                    </Col>) : ""
                                 }{
                                    client.phone10 ? (
                                    <Col xs="2" className="text-white phone">
                                       <span>Телефон 10</span>
                                       <p>{client.phone10}</p>
                                    </Col>) : ""
                                 }
                              </Row>
                              {/* <FormGroup className="mt-3 align-items-center" row>
                                 <Label for="Phone1" sm={3}>Телефон</Label>
                                 <Col sm={9}>
                                    <Input type="text" id="Phone1" value={client.phone1} />
                                 </Col>
                              </FormGroup>
                              <FormGroup className="mt-3 align-items-center" row>
                                 <Label for="Phone2" sm={3}>Телефон 2</Label>
                                 <Col sm={9}>
                                    <Input type="text" id="Phone2" value={client.phone2} /  
                                 </Col>
                              </FormGroup> */}
                              {/* 
                                 <div className="mt-4 d-flex">
                                    <Col sm={3}></Col>
                                    <Col sm={9}>
                                       <Button type="submit" className="text-white mb-2 mx-1" outline color="secondary">Сохранить данные</Button>{' '}
                                    </Col>
                                 </div> 
                              */}
                           </Form>
                        </Card>
                     </Col>
                     <Col className="mt-5 products mx-auto" xs="10">
                        <h5 className="text-white">Купленные товары</h5>
                        <div className="hr"></div>
                        <div className="m-2 mb-3">
                           <AddOrder
                              buttonLabel="Добавить заказ"
                              productsList={products}
                              index={match}
                           />
                        </div>
                        <div>
                           <UserOrders
                              ordersList={orders}
                           />
                        </div>
                     </Col>
                     <div className="hr mt-4"></div>
                     <CardGroup className="mt-4">
                        <Card className="mx-1 img-card">
                           {client.latter ? (
                              <CardImg top width="100%" height="600px" src={client.latter} alt="pasport" />
                           ): (
                              <img src={NotFound} top width="100%" height="600px" alt="img not found" />
                           )}
                        </Card>
                        <Card>
                           {
                              client.pasport_photo ? (
                              <CardImg top width="100%" height="600px" src={client.pasport_photo} alt="pasport" />
                              ): (
                                 <img src={NotFound} top width="100%" height="600px" alt="img not found" />
                              )
                           }
                        </Card>
                     </CardGroup>
                  </Row>
               </Container>
            </div>
         </div>
      </div>
   )
}

export default UserInformation;
