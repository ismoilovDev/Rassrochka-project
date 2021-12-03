import React, { useEffect, useState, useRef } from 'react';
import { Alert, Button, Card, CardBody, CardTitle, Form, Input, Label } from 'reactstrap';
import { Offcanvas } from 'react-bootstrap';
import { AiFillDollarCircle } from "react-icons/ai";
import http from '../../Services/getData';
import ModalCon from './ModalCon';


function OrderPay({ show, handleClose, hendleShow }) {

    const [clients, setClients] = useState([]);
    const [searchTerm, setSearchTerm] = useState('');
    const [result, setResult] = useState([]);
    const [ind, setInd] = useState('');
    const [status, setStatus] = useState([]);
    const [orders, setOrders] = useState([]);
    const [clientName, setClientName] = useState('');
    const [orderId, setOrderId] = useState('');
    const [transaction, setTransaction] = useState([]);
    const [oplataSum, setOplataSum] = useState('');
    const [modal, setModal] = useState(false);
    const inputRef = React.useRef(null);
    const toggle = () => {
        setModal(!modal);
    }
    const styles = {
        title: {
            textTransform: 'capitalize'
        }
    }
    const [orderClasses, setOrderClasses] = useState(['post-order', 'mt-5'])
    const [classes, setClasses] = useState(['edit-category', 'mt-5'])

    // Get Client Id -------------->
    const clickId = (id, names) => {
        setClientName(names);
        setClasses(prev => [...prev, 'active']);
        singleClientOrders(id);
        setInd(id);
        setOrderClasses(['post-order']);
        setOplataSum("")
    }


    // Delete EditInput
    const deleteInput = () => {
        setOrderClasses(['post-order'])
    }
    

    // Get Order Id -------------->
    const getOrderId = (index, status) => {
        setOrderClasses(prev => [...prev, 'active']);
        setStatus(status)
        setOrderId(index);
        getTransaction(index);
        window.scrollY = 100 + '%'
        setOplataSum("")
    }

    
    // Order Pay -------------->
    const orderPay = async (e) => {
        e.preventDefault()
        const data = {
            'order_id': orderId,
            'amount': oplataSum
        }
        try {
            const response = await http.post('/installment/pay_month', data);
            console.log(response.data.payload);
            setOplataSum('');
        } catch (err) {
            console.log(`Error: ${err.message}`);
        }
        singleClientOrders(ind)
        getTransaction(orderId)
    }

    // Order All Pay -------------->
    const orderAllPay = async (amount) => {
        const data = {
            'order_id': orderId,
            'amount': amount 
        }
        try {
            const response = await http.post('/installment/pay_month', data);
            console.log(response.data.payload);
            setOplataSum('')
        } catch (err) {
            console.log(`Error: ${err.message}`);
        }
        singleClientOrders(ind)
        getTransaction(orderId)
        setModal(false)
    }
    


    // Single Client Orders
    const singleClientOrders = (id) => {
        http.get(`/order/single_client?id=${id}`)
            .then((res) => {
                setOrders(res.data.payload)
            })
            .catch(err => console.log(err))
    }

    // Transaction
    const getTransaction = (id) => {
        http.get(`https://shop1.i-plan.uz/api/transaction/get_tran?id=${id}`)
            .then((res) => {
                setTransaction(res.data.payload)
            })
            .catch(err => console.log(err))
    }

    // Get All Clients
    const getAllClients = () => {
        http.get('/cilents')
            .then((res) => {
                setClients(res.data.payload)
            })
            .catch(err => console.log(err))
    }
    useEffect(() => {
        getAllClients()
    }, [])

    
    // SEARCH Hendler ->
    useEffect(() => {
        const filteredResults = clients.filter((client) =>
        (client.client_name !== undefined ? (client.client_name).toLowerCase() : "").includes(searchTerm.toLowerCase())
        || (client.phone1 !== undefined ? (client.phone1).toLowerCase() : "").includes(searchTerm.toLowerCase())
        || (client.phone2 !== undefined ? (client.phone2).toLowerCase() : "").includes(searchTerm.toLowerCase()));

        setResult(filteredResults.reverse());
    }, [clients, searchTerm])

    const fullNumber = (e) => {
        setOplataSum(e.target.value)
    }
    // const setPaidFull = (e) => {
    //     setOplataSum(e)
    // }

    return (
        <>
            <Button onClick={hendleShow} className="openModal nav-links">
                <AiFillDollarCircle className="calc-svg" />
                Оплата
            </Button>
            <Offcanvas show={show} onHide={handleClose}>
                <Offcanvas.Header closeButton>
                    <Offcanvas.Title>Оплата</Offcanvas.Title>
                    <div className="search-box">
                        <div className="search-input">
                            <input
                                type="search"
                                value={searchTerm}
                                onChange={e => setSearchTerm(e.target.value)}
                                placeholder="Поиск клиентов..."
                            />
                        </div>
                    </div>
                </Offcanvas.Header>
                <Offcanvas.Body>
                    <div className="pay-clients-list">
                        <ul className="pay-clients">
                            {
                                (searchTerm === "" ? clients : result).map((client, index) => {
                                    return (
                                        <li key={index} onClick={() => clickId(client.client_id, client.client_name)} style={styles.title} className="pay-list" >
                                            {
                                                client.color === 'green' ? (
                                                    <span className="status-green"></span>
                                                ) : (
                                                    <span className="status-red"></span>
                                                )
                                            }
                                            {client.client_name}
                                        </li>
                                    )
                                })
                            }
                        </ul>
                    </div>

                    <div className={classes.join(' ')}>
                        <div className="category-box">
                            <ul className="category-ul">
                                <div className="d-flex justify-content-between">
                                    <Label className="text-white h3">{clientName}</Label>
                                </div>
                                <li className="tovar-list dark">
                                    <span className="id-number">№</span>
                                    <span className="tovar">Товар</span>
                                    <span className="obshiy">Общ долг</span>
                                    <span className="tolandi">Оплачено</span>
                                </li>
                                {
                                    orders.length !== 0 ? (
                                        orders.map((order, i) => {
                                            return (
                                                <li onClick={() => getOrderId(order.order_id, order)} className="tovar-list" key={i}>
                                                    {
                                                        order.status === 1 ? (
                                                            <span className="status1"></span>
                                                        ) : (
                                                            <span className="status0"></span>
                                                        )
                                                    }
                                                    <span className="id-number">{i + 1}</span>
                                                    <span className="tovar">{order.product_name}</span>
                                                    <span className="obshiy">{order.product_price}</span>
                                                    <span className="tolandi">{(order.paid_sum).toFixed(2)}</span>
                                                </li>)
                                        })
                                    ) : (
                                        <p className="text-center">Пока заказы нет</p>
                                    )
                                }
                            </ul>
                        </div>
                    </div>
                        <div className={orderClasses.join(' ')}>
                            {
                                status.paid_sum < status.product_price ? (
                                    <Card>
                                        <CardBody>
                                            <div className="d-flex justify-content-end">
                                                <span className="delete-paybox" onClick={deleteInput}>X</span>
                                            </div>
                                            <CardTitle>
                                                <div className="transaction-list py-1">
                                                    Общий долг : <span className="all-debt">{transaction.all_debt !== undefined ? transaction.all_debt.toFixed(1) : ""} </span> сум
                                                </div>
                                                <div className="transaction-list py-1">
                                                    Текушии долг : <span className="amount">{transaction.amount !== undefined ? transaction.amount.toFixed(1) : ""}</span> сум
                                                </div>
                                            </CardTitle>
                                            <Form className="my-3" onSubmit={orderPay}>
                                                <Label className="p-0 mb-1" for="oplata">Добавить оплата</Label>
                                                <Input
                                                    className="text-white"
                                                    type="search"
                                                    size="sm"
                                                    ref={inputRef}
                                                    id="oplata"
                                                    value={oplataSum}
                                                    onChange={fullNumber}
                                                />
                                                <Button type="submit" className="mt-2">
                                                    Оплатить
                                                </Button>
                                            </Form>
                                        </CardBody>
                                        <ModalCon
                                            modal={modal}
                                            toggle={toggle}
                                            orderAllPay={orderAllPay}
                                            allSum={transaction.unprotsent_sum}
                                        />
                                    </Card>
                                ) : (
                                    <Alert color="info">
                                        Деньги за товар оплачены полностью.
                                    </Alert>
                                )
                            }
                        </div>

                </Offcanvas.Body>
            </Offcanvas>
        </>
    );
}

export default OrderPay
