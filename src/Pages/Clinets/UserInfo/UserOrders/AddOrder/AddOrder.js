
import React, { useEffect, useState } from 'react';
import { Button, Modal, ModalHeader, ModalBody, ModalFooter, Row, Col, Label, InputGroup, Input, Form } from 'reactstrap';
import http from '../../../../../Services/getData';
import { useHistory } from 'react-router-dom';

const ModalExample = ({ buttonLabel, productsList, index }) => {

    const [modal, setModal] = useState(false);
    const [i, setI] = useState("");
    const [pay, setPay] = useState("");
    const [price, setPrice] = useState("");
    const [month, setMonth] = useState("");
    const [surcharge, setSurcharge] = useState('');
    const [productCode1, setProductCode1] = useState('');
    const [productCode2, setProductCode2] = useState('');
    const history = useHistory();
    const client_id = String(index)
    const [orders, setOrders] = useState([]);
    const toggle = () => setModal(!modal);


    // ADD ORDER ------>
    const addOrder = (e) => {
        if (
            i &&
            pay &&
            price &&
            surcharge &&
            month &&
            productCode1 &&
            productCode2
        ) {
            e.preventDefault();
            let formdata = new FormData();
            formdata.append('product_id', i);
            formdata.append('client_id', client_id);
            formdata.append('first_pay', pay);
            formdata.append('month', month);
            formdata.append('pay_date', "10");
            formdata.append('surcharge', surcharge);
            formdata.append('price', price);
            formdata.append('product_code1', productCode1);
            formdata.append('product_code2', productCode2);
            http.post('/order/add', formdata)
                .then((res) => {
                    const allPosts = [...orders, res.data.payload];
                    setOrders(allPosts);
                    history.push('/clients');
                    window.location.reload(false);
                })
                .catch((err) => console.log(err))
        } else {
            alert('Пожалуйста, заполните форму полностью')
            history.push('/clients')
        }
    }

    
    // GET ALL ORDERS ------>
    useEffect(() => {
        const fetchPosts = async () => {
            try {
                const response = await http.get('/orders');
                setOrders(response.data.payload);
            } catch (err) {
                if (err.response) {
                    // Not in the 200 response range 
                    console.log(err.response.data);
                } else {
                    console.log(`Error: ${err.message}`);
                }
            }
        }

        fetchPosts();
    }, [])


    const externalCloseBtn = <button className="close" style={{ position: 'absolute', top: '15px', right: '15px' }} onClick={toggle}>&times;</button>;
    return (
        <div>
            <Button color="danger" onClick={toggle}>{buttonLabel}</Button>
            <Modal isOpen={modal} toggle={toggle} className="text-white" external={externalCloseBtn}>
                <ModalHeader>Добавить заказ</ModalHeader>
                <Form onSubmit={addOrder}>
                    <ModalBody>
                        <Row>
                            {/* <Col xs="6">
                                <Label className="mb-2" for="product_id ">Название продукта</Label><br/>
                                <select className="select-product bg-dark" id="product_id" onChange={(e) => setI(e.target.value)} >
                                    <option value=""></option>
                                    {
                                        productsList.map((item) => {
                                            return (
                                                <option key={item.product_id} value={String(item.product_id)}>{item.product_name}</option>
                                            )
                                        })
                                    }
                                </select>
                                <br />
                            </Col> */}

                            <Row className="mt-3">
                                <Col xs="6">
                                    <Label className="mb-2" for="product_id ">Название продукта</Label><br />
                                    <select className="select-product bg-dark w-100" id="product_id" onChange={(e) => setI(e.target.value)} >
                                        <option value=""></option>
                                        {
                                            productsList.map((item) => {
                                                return (
                                                    <option key={item.product_id} value={String(item.product_id)}>{item.product_name}</option>
                                                )
                                            })
                                        }
                                    </select>
                                    <br />
                                </Col>

                                <Col xs="6">
                                    <Label className="mb-2" for="product_price">Цена</Label>
                                    <InputGroup size="md">
                                        <Input className="text-white" onChange={(e) => setPrice(e.target.value)} type="text" id="product_price" placeholder="Цена" />
                                    </InputGroup>
                                    <br />
                                </Col>

                                <Col xs="6">
                                    <Label className="mb-2" for="first_pay">Первая оплата</Label>
                                    <InputGroup size="md">
                                        <Input className="text-white" type="text" onChange={(e) => setPay(e.target.value)} id="first_pay" placeholder="Первая оплата" />
                                    </InputGroup>
                                    <br />
                                </Col>

                                <Col xs="6">
                                    <Label className="mb-2" for="month">Месяц</Label>
                                    <InputGroup size="md">
                                        <Input className="text-white" type="text" onChange={(e) => setMonth(e.target.value)} id="month" placeholder="Месяц" />
                                    </InputGroup>
                                    <br />
                                </Col>

                                <Col xs="4">
                                    <Label className="mb-2" for="product_surcharge">Процент</Label>
                                    <InputGroup size="md">
                                        <Input className="text-white" onChange={(e) => setSurcharge(e.target.value)} type="text" id="product_surcharge" placeholder="Поцент" />
                                    </InputGroup>
                                    <br />
                                </Col>

                                <Col xs="4">
                                    <Label className="mb-2" for="product_code">IMEI № 1</Label>
                                    <InputGroup size="md">
                                        <Input className="text-white" onChange={(e) => setProductCode1(e.target.value)} type="text" id="product_code" placeholder="Код продукта" />
                                    </InputGroup>
                                    <br />
                                </Col>

                                <Col xs="4">
                                    <Label className="mb-2" for="product_code2">IMEI № 2</Label>
                                    <InputGroup size="md">
                                        <Input className="text-white" onChange={(e) => setProductCode2(e.target.value)} type="text" id="product_code2" placeholder="Код продукта" />
                                    </InputGroup>
                                    <br />
                                </Col>
                            </Row>
                        </Row>
                    </ModalBody>
                    <ModalFooter>
                        <Button type="submit">Добавить</Button>{' '}
                        <Button onClick={toggle}>Отмена</Button>
                    </ModalFooter>
                </Form>
            </Modal>
        </div>
    );
}

export default ModalExample;