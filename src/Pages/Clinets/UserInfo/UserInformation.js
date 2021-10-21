import React, { useEffect, useState } from 'react';
import { ImUserTie } from "react-icons/im";
import { Button, Card, CardBody, Col, Container, Form, FormGroup, Input, Label, Row, CardImg, CardGroup } from 'reactstrap';
import "../../../Styles/main.css";
import http from '../../../Services/getData';
import { useHistory } from 'react-router-dom';
import UserOrders from './UserOrders/UserOrders';
import AddOrder from './UserOrders/AddOrder/AddOrder'


function UserInformation({ index }) {

    
    const [client, setClient] = useState({});
    const [succes, setSucces] = useState({});
    const [orders, setOrders] = useState([]);
    const history = useHistory();

    const [products, setProducts] = useState([]);

    // All Products-------------->
    useEffect(() => {
        console.log(index);
        http.get('/products')
            .then((res) => {
                setProducts(res.data.payload)
            })
            .catch(err => console.log(err))
    }, // eslint-disable-next-line 
    []);


    useEffect(() => {
        http.get(`/order/single_client?id=${index}`)
            .then((res) => {
                console.log(res.data.payload);
                setOrders(res.data.payload)
            })
            .catch(err => console.log(err))
    }, // eslint-disable-next-line
    []);


    useEffect(() => {
        http.get(`/client/single?id=${index}`)
            .then((res) => {
                console.log(res.data.payload);
                setClient(res.data.payload);
                setSucces(res.data)
            })
            .catch(err => console.log(err))
    }, // eslint-disable-next-line
    []);

    const toClients = () => {        
        history.push('/clients')
    }

    return (
        <div>
            {
                index ? (
                    <div className="main">
                        <div className="user-infos mt-2">
                            <Container>
                                <Row className={succes.payload ? "block" : "none"}>
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

                                                <div className="mt-5">
                                                    <Button type="submit" className="text-white mb-2" outline color="secondary">Заблокировать телефон клиента</Button>{' '}
                                                    <FormGroup check>
                                                        <Input type="checkbox" id="gridCheck" />{' '}
                                                        <Label check for="gridCheck">
                                                            Проверить меня
                                                        </Label>
                                                    </FormGroup>
                                                </div>
                                            </CardBody>
                                        </Card>
                                    </Col>
                                    <Col lg="8" className="mt-2">
                                        <Card className="pb-4">
                                            <Form className="p-3 user-informations">
                                                <FormGroup row>
                                                    <Label for="Name" sm={3}>Ф.И.О</Label>
                                                    <Col sm={9}>
                                                        <Input type="text" id="Name" placeholder={client.first_name + " " + client.last_name + " " + client.middle_name} />
                                                    </Col>
                                                </FormGroup>
                                                <FormGroup className="mt-3 align-items-center" row>
                                                    <Label for="Phone1" sm={3}>Телефон</Label>
                                                    <Col sm={9}>
                                                        <Input type="text" id="Phone1" placeholder={client.phone1} />
                                                    </Col>
                                                </FormGroup>
                                                <FormGroup className="mt-3 align-items-center" row>
                                                    <Label for="Phone2" sm={3}>Телефон 2</Label>
                                                    <Col sm={9}>
                                                        <Input type="text" id="Phone2" placeholder={client.phone2} />
                                                    </Col>
                                                </FormGroup>
                                                <FormGroup className="mt-3 align-items-center" row>
                                                    <Label for="PasportSeria" sm={3}>{client.pasport_serial}</Label>
                                                    <Col sm={9}>
                                                        <Input type="text" id="PasportSeria" placeholder={client.pasport_number} />
                                                    </Col>
                                                </FormGroup>
                                                <div className="mt-4 d-flex">
                                                    <Col sm={3}></Col>
                                                    <Col sm={9}>
                                                        <Button type="submit" className="text-white mb-2 mx-1" outline color="secondary">Сохранить данные</Button>{' '}
                                                    </Col>
                                                </div>
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
                                                index={index}
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
                                            <CardImg top width="100%" height="600px" src={client.latter} alt="pasport" />
                                        </Card>
                                        <Card>
                                            <CardImg top width="100%" height="600px" src={client.pasport_photo} alt="pasport" />
                                        </Card>
                                    </CardGroup>
                                </Row>
                            </Container>

                        </div>
                    </div>
                ) : (              
                    toClients()
                )
            }
        </div>
    )
}

export default UserInformation;
