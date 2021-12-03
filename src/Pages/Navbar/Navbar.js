import React, { useState } from 'react';
import { Col, Container, Row } from 'reactstrap';
import logo from '../../assets/images/logo-icon.png';
import user from '../../assets/images/avatar-2.png';
import { FaHome, FaSearch, FaShoppingCart, FaUserPlus } from 'react-icons/fa';
import { BiCommentAdd } from "react-icons/bi";
import { HiUsers } from "react-icons/hi";
import '../../Styles/main.css';
import Calculator from '../Calculator/Calculator';
import Category from '../Categories/Category';
import { Link } from 'react-router-dom';
import OrderPay from '../OrderPay/OrderPay';

function Navbar({ searchTerm, setSearchTerm }) {

   const [isOpen, setIsOpen] = useState(false);

   const [show, setShow] = useState(false);

   const handleCloseHendler = () => setShow(false);
   const handleOpen = () => setShow(true)

   function toggle() {
      setIsOpen(!isOpen);
   }


   let classes = ['user-modal']
   if (isOpen) {
      classes.push('active')
   }

   return (
      <>
         <div className="main-navbars" id="main-nav">
            <div>
               <Container className="px-4" fluid>
                  <Row className="for-border">
                     <Col className="nav-logo pt-3 pb-2" lg="2">
                        <a href="/">
                           <img src={logo} alt="logo">
                           </img>
                           <h4>Рассрочка</h4>
                        </a>
                     </Col>
                     <Col className="search-box pt-3 pb-2" xs="7">
                        <div className="search-input">
                           <input
                              type="search"
                              value={searchTerm}
                              onChange={e => setSearchTerm(e.target.value)}
                              placeholder="Поиск клиентов..."
                           />
                           <span>
                              <FaSearch />
                           </span>
                        </div>
                     </Col>
                     <Col className="user-profile pt-3 pb-2" xs="3">
                        <div className="user-profile-box" onClick={toggle}>
                           <img className="mr-3" src={user} alt="user" />
                           <div className="user-names">
                              <h5 className='text-white'>Администратор</h5>
                           </div>
                        </div>
                        {/* <div className={classes.join(" ")}>
                                    <a  href="/">
                                       <FaUser />
                                       <span>Профиль</span>
                                    </a>
                                    <div className="hr my-0 mt-1"></div>
                                    <a  href="/">
                                       <BiLogOutCircle />
                                       <span>Выход</span>
                                    </a>
                                </div> */}
                     </Col>
                  </Row>
                  <Row className="for-border less-border">
                     <Col>
                        <Link className="nav-links" to="/">
                           <FaHome />
                           <span>Панель приборов</span>
                        </Link>
                     </Col>
                     <Col>
                        <Link className="nav-links" to="products">
                           <FaShoppingCart />
                           <span>Продукты</span>
                        </Link>
                     </Col>
                     <Col>
                        <Link className="nav-links" to="add-products">
                           <BiCommentAdd />
                           <span>Добавить продукт</span>
                        </Link>
                     </Col>
                     <Col>
                        <Link className="nav-links" to="/clients">
                           <HiUsers />
                           <span>Клиенты</span>
                        </Link>
                     </Col>
                     <Col>
                        <Link className="nav-links" to="/user-register">
                           <FaUserPlus />
                           <span>Добавить клиента</span>
                        </Link>
                     </Col>
                     <Col>
                        <OrderPay
                           show={show}
                           hendleShow={handleOpen}
                           handleClose={handleCloseHendler}
                        />
                     </Col>
                     <Col>
                        <Category />
                     </Col>
                     <Col>
                        <Calculator />
                     </Col>
                  </Row>
               </Container>
            </div>
         </div>
      </>
   )
}

export default Navbar
