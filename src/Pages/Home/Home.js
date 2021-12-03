import React, { useEffect, useState } from 'react'
import { RiArrowUpFill } from "react-icons/ri";
import { VscActivateBreakpoints } from "react-icons/vsc";
import { CardBody, Col, Container, Row, Card } from 'reactstrap';
import user from '../../assets/images/avatar-2.png';
import Navbar from '../Navbar/Navbar';
import Chart1 from './Charts/Chart1';
import Chart2 from './Charts/Chart2';
// import Chart3 from './Charts/Chart3';
import http from '../../Services/getData';
import '../../Styles/main.css';

function Home() {
    const [clients, setClients] = useState([]);   
    const [searchTerm, setSearchTerm] = useState('');
    const [result, setResult] = useState([])




    useEffect(() => {
        http.get('/cilents')
            .then((res) => {
                setClients(res.data.payload)
            })
            .catch(err => console.log(err))
    }, // eslint-disable-next-line
    []);


    const [products, setProducts] = useState([]);

    useEffect(() => {
        http.get('/products')
            .then((res) => {
                setProducts(res.data.payload)
            })
            .catch(err => console.log(err))
    }, // eslint-disable-next-line
    []);


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
                searchTerm = {searchTerm}
            />
            <Container className="my-5">
                <Row>
                    <Col lg="6" className="my-1">
                        <div className="chart-box">
                            <div className="chart-subtitle mx-3">
                                <h5 className="mb-1 text-white">Статистика о доходе <span className="text-warning">(СКОРО...)</span></h5>
                            </div>
                            <div className="chart-title d-flex align-items-center mx-3 mb-3">
                                <h4 className="text-white">35.652</h4>
                                <p className=" m-0 mx-3 d-flex align-items-center">4.1 <RiArrowUpFill /></p>
                            </div>
                            <Chart1 />
                        </div>
                    </Col>
                    <Col lg="6" className="my-1">
                        <div className="chart-box">
                            <div className="chart-subtitle mx-3 d-flex align-items-center justify-content-between">
                                <h5 className="m-0 text-white">Популярные категории <span className="text-warning">(СКОРО...)</span></h5>
                                <VscActivateBreakpoints />
                            </div>
                            <Chart2 />
                            <ul className="chart-dicr">
                                <li>Телефон <span>52</span></li>
                                <li>Бытовая техника  <span>47</span></li>
                                <li>Furniture  <span>32</span></li>
                                <li>Men  <span>26</span></li>
                            </ul>
                        </div>
                    </Col>

                    {/* 
                        <Col lg="8" className="my-4 mx-auto">
                            <div className="chart-box chart-box-3">
                                <div className="chart-subtitle mx-3 d-flex align-items-center justify-content-between">
                                    <h5 className="m-0 mb-3 text-white">Обзор</h5>
                                    <VscActivateBreakpoints />
                                </div>
                                <Chart3 />
                            </div>
                        </Col> 
                    */}
                </Row>
                <Row>
                    <Col lg="7" className="my-3">
                        <Card className="radius-10 w-100">
                            <CardBody>
                                <div className="chart-subtitle mx-3 text-white d-flex align-items-center justify-content-between">
                                    <h5 className="mb-0">Новые клиенты</h5>
                                    <div>
                                        <VscActivateBreakpoints />
                                    </div>
                                </div>
                            </CardBody>
                            <div className="new-clients-card">
                                <ul className="new-clients-box">
                                    {
                                        (searchTerm === "" ? clients : result).map((item) => {
                                            return (
                                                <li className="new-clients d-flex align-items-center text-white justify-content-between" key={item.client_id}>
                                                    <div>
                                                        <img src={user} alt="user-avatar" />
                                                        <span className="client_name">{item.client_name}</span>
                                                    </div>                                                    
                                                </li>
                                            )
                                        })
                                    }
                                </ul>
                            </div>
                        </Card>
                    </Col>
                    <Col lg="5" className="my-3">
                        <Card className="radius-10 w-100">
                            <CardBody>
                                <div className="chart-subtitle mx-3 text-white d-flex align-items-center justify-content-between">
                                    <h5 className="mb-0">ТОП продукты</h5>
                                    <div>
                                        <VscActivateBreakpoints />
                                    </div>
                                </div>
                            </CardBody>
                            <div className="new-clients-card">
                                <ul className="new-clients-box">
                                    {
                                        products.map((item, id) => {
                                            return (
                                                <li className="new-clients d-flex align-items-center text-white justify-content-between" key={id}>
                                                    <div className="d-flex align-items-center">
                                                        <div className="home-product-img">
                                                            <img src={item.img_url} alt="product-img" />
                                                        </div>
                                                        <div>
                                                            <span className="client_name">{item.product_name}</span>
                                                        </div>
                                                    </div>
                                                    <div className="d-flex align-items-center new-client-call">
                                                        <p>{item.price}</p>
                                                    </div>
                                                </li>
                                            )
                                        })
                                    }
                                </ul>
                            </div>
                        </Card>
                    </Col>
                </Row>
            </Container>
        </>
    )
}

export default Home
