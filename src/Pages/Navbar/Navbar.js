import React, { useState, useRef } from 'react';
import { Col, Container, Row } from 'reactstrap';
import logo from '../../assets/images/logo-icon.png';
import user from '../../assets/images/avatar-2.png';
import {FaHome, FaSearch, FaShoppingCart, FaUser, FaUserPlus} from 'react-icons/fa';
import { BiLogOutCircle } from "react-icons/bi";
import { HiUsers } from "react-icons/hi";
import '../../Styles/main.css';
import Calculator from '../Calculator/Calculator';
import http from '../../Services/getData';

function Navbar() {

    const inputEl = useRef("")
    const [isOpen, setIsOpen] = useState(false);

    


    function toggle() {
        setIsOpen(!isOpen);
    }


    let classes = ['user-modal']
    if(isOpen) {
        classes.push('active')
    }
    return (
        <>
            <div className="main-navbars" id="main-nav">
                <div>
                    <Container className="px-4" fluid>
                        <Row className="for-border">
                            <Col className="nav-logo pt-3 pb-2" xs="2">
                                <a href="/">
                                    <img src={logo} alt="logo">
                                    </img>
                                    <h4>Рассрочка</h4>
                                </a>
                            </Col>
                            <Col className="search-box pt-3 pb-2" xs="7">
                                <div className="search-input">
                                    <input 
                                    ref={inputEl}
                                        type="search" 
                                        placeholder="Введите для поиска..."
                                    />
                                    <span>
                                        <FaSearch />
                                    </span>
                                </div>
                            </Col>
                            <Col className="user-profile pt-3 pb-2" xs="3">
                                <div className="user-profile-box" onClick={toggle}>
                                    <img src={user} alt="user" />
                                    <div className="user-names">
                                        <p>Алибек Ембергенов</p>
                                        <span>Магазин Powerline</span>
                                    </div>
                                </div>
                                <div className={classes.join(" ")}>
                                    <a  href="/">
                                        <FaUser />
                                        <span>Профиль</span>
                                    </a>
                                    <div className="hr my-0 mt-1"></div>
                                    <a  href="/">
                                        <BiLogOutCircle />
                                        <span>Выход</span>
                                    </a>
                                </div>
                            </Col>
                        </Row>
                        <Row className="for-border less-border">
                            <Col>
                                <a className="nav-links" href="/">
                                    <FaHome />
                                    <span>Панель приборов</span>
                                </a>
                            </Col>
                            <Col>
                                <a className="nav-links" href="/products">
                                    <FaShoppingCart />
                                    <span>Товары</span>
                                </a>
                            </Col>
                            <Col>
                                <a className="nav-links" href="/clients">
                                    <HiUsers />
                                    <span>Клиенты</span>
                                </a>
                            </Col>
                            <Col>
                                <Calculator />
                            </Col>
                            <Col>
                                <a className="nav-links" href="/user-register">
                                    <FaUserPlus />
                                    <span>Добавить клиента</span>
                                </a>
                            </Col>
                        </Row>
                    </Container>
                </div>            
            </div>
        </>
    )
}

export default Navbar
