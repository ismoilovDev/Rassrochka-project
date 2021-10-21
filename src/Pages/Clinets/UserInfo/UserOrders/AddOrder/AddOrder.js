
import React, { useEffect, useState } from 'react';
import { Button, Modal, ModalHeader, ModalBody, ModalFooter, Row, Col, Label, InputGroup, Input, Form } from 'reactstrap';
import http from '../../../../../Services/getData';
import { useHistory } from 'react-router-dom';

const ModalExample = ({ buttonLabel, productsList, index }) => {

    const [modal, setModal] = useState(false);
    const [i, setI] = useState("");
    const [pay, setPay] = useState("");
    const [month, setMonth] = useState("");
    const history = useHistory();
    const client_id = String(index)

    const toggle = () => setModal(!modal);


    const [orders, setOrders] = useState([]);

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

    const addOrder = (e) => {
        if (
            i &&
            pay &&
            month
        ) {
            e.preventDefault();
            // let formdata = new FormData();
            // formdata.append('product_id', i);
            // formdata.append('client_id', client_id);
            // formdata.append('first_pay', pay);
            // formdata.append('pay_date', "10");
            // formdata.append('month', month);
            const data = {
                product_id: i,
                client_id,
                first_pay: pay,
                month,
                pay_date: "10"
            }
            // console.log(formdata);
            http.post('/order/add', data)
                .then((res) => {
                    const allPosts = [...orders, res.data.payload];
                    setOrders(allPosts);
                    history.push('/clients');
                })
                .catch((err) => console.log(err))
        } else {
            return ''
        }
    }


    const externalCloseBtn = <button className="close" style={{ position: 'absolute', top: '15px', right: '15px' }} onClick={toggle}>&times;</button>;
    return (
        <div>
            <Button color="danger" onClick={toggle}>{buttonLabel}</Button>
            <Modal isOpen={modal} toggle={toggle} className="text-white" external={externalCloseBtn}>
                <ModalHeader>Добавить заказ</ModalHeader>
                <Form onSubmit={addOrder}>
                    <ModalBody>
                        <Row>
                            <Col xs="6">
                                <Label className="mb-2" for="product_id ">Название продукта</Label>
                                <select className="select-product bg-dark" id="product_id" onChange={(e) => setI(e.target.value)} >
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

                            <Row className="mt-3">
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