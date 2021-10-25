import React, { useEffect, useState } from 'react';
import { IoMdCloudUpload } from "react-icons/io";
import logo from '../../assets/images/logo-icon.png';
import { FaEllipsisH, FaIdCard, FaPhoneAlt, FaPhoneVolume, FaUser, FaUserCheck, FaUserPlus } from 'react-icons/fa';
import { Card, CardTitle, CardBody, Col, Form, Row, Label, InputGroup, InputGroupText, Input, Button } from 'reactstrap';
import '../../Styles/main.css';
import http from '../../Services/getData';
import { useHistory } from 'react-router-dom';

function Registration() {

    const [clients, setClients] = useState([])
    const [img1, setImg1] = useState(null);
    const [img2, setImg2] = useState(null);
    const [firstName, setFirstName] = useState("");
    const [lastName, setLastName] = useState("");
    const [middleName, setMiddleName] = useState("");
    const [phone1, setPhone1] = useState(null);
    const [phone2, setPhone2] = useState(null);
    const [pasportSer, setPasportSer] = useState("");
    const [pasportNumber, setPasportNumber] = useState(null);
    const history = useHistory();

    useEffect(() => {
        const fetchPosts = async () => {
            try {
                const response = await http.get('/cilents');
                setClients(response.data.payload);
            } catch (err) {
                if (err.response) {
                    console.log(err.response.data);
                } else {
                    console.log(`Error: ${err.message}`);
                }
            }
        }

        fetchPosts();
    }, [])


    const register = (e) => {
        e.preventDefault();
        if(firstName &&
            lastName && 
            middleName &&
            phone1 &&
            phone2 &&
            pasportSer &&
            pasportNumber &&
            img1 &&
            img2 
        ){
            let formdata = new FormData();
            formdata.append('first_name', firstName);
            formdata.append('last_name', lastName);
            formdata.append('middle_name', middleName);
            formdata.append('phone1', phone1);
            formdata.append('phone2', phone2);
            formdata.append('pasport_serial', pasportSer);
            formdata.append('pasport_number', pasportNumber);
            formdata.append('pasport_photo', img1, img1.name);
            formdata.append('latter', img2, img2.name);

            console.log(formdata);
            
            http.post('/client/registration', formdata)
                .then(res => {
                    const allPosts = [...clients, res.data.payload];
                    setClients(allPosts);
                    history.push('/clients');
                    console.log(res.data.payload);
                })
                .catch((err) => console.log(err))

        }else {
            return ''
        }
    }
    return (
        <div className="main py-3">
            <Col xl="7" className="mx-auto">
                <Card>
                    <CardBody className="p-5 register-title">
                        <CardTitle className="d-flex align-items-center justify-content-between text-white">
                            <div>
                                <FaUserPlus />
                                <h5>Регистрация клиента</h5>
                            </div>
                            <div className="nav-logo nav-logo-1">
                                <a href="/">
                                    <img src={logo} alt="logo">
                                    </img>
                                    <h4>Рассрочка</h4>
                                </a>
                            </div>
                        </CardTitle>
                        
                        <div className="hr"></div>

                        <Form onSubmit={register} className="register-form">
                            <Row>
                                <Col md="4" className="mt-2">
                                    <Label className="mb-2" for="Имя">Имя</Label>
                                    <InputGroup size="lg">
                                        <InputGroupText><FaUser /></InputGroupText>
                                        <Input className="border-start-0" onChange={(e) => setFirstName(e.target.value)} id="Имя" placeholder="Имя" />
                                    </InputGroup>
                                </Col>
                                
                                <Col md="4" className="mt-2">
                                    <Label className="mb-2" for="Фамилия">Фамилия</Label>
                                    <InputGroup size="lg">
                                        <InputGroupText><FaUserPlus /></InputGroupText>
                                        <Input className="border-start-0" onChange={(e) => setLastName(e.target.value)}  id="Фамилия" placeholder="Фамилия" />
                                    </InputGroup>
                                </Col>
                                
                                <Col md="4" className="mt-2">
                                    <Label className="mb-2" for="Отчество">Отчество</Label>
                                    <InputGroup size="lg">
                                        <InputGroupText><FaUserCheck /></InputGroupText>
                                        <Input className="border-start-0" onChange={(e) => setMiddleName(e.target.value)} id="Отчество" placeholder="Отчество" />
                                    </InputGroup>
                                </Col>

                                <Col xs="6" className="mt-3">
                                    <Label className="mb-2" for="Телефон1">Телефон № 1</Label>
                                    <InputGroup size="lg">
                                        <InputGroupText><FaPhoneAlt /></InputGroupText>
                                        <Input className="border-start-0" onChange={(e) => setPhone1(e.target.value)} id="Телефон1" placeholder="Телефон" />
                                    </InputGroup>
                                </Col>
                                
                                <Col xs="6" className="mt-3">
                                    <Label className="mb-2" for="Телефон2">Телефон № 2</Label>
                                    <InputGroup size="lg">
                                        <InputGroupText><FaPhoneVolume /></InputGroupText>
                                        <Input className="border-start-0" onChange={(e) => setPhone2(e.target.value)} id="Телефон2" placeholder="Телефон" />
                                    </InputGroup>
                                </Col>

                                {/* <Col xs="12" className="mt-3 mb-2">
                                    <Label className="mb-2" for="Adress">Адрес</Label>
                                    <Input type="textarea" className="border-start-0 teaxtarea" id="Adress" row="5" placeholder="Ул. Каракалпакстан №65" />
                                </Col> */}
                            </Row>
                            
                            <div className="hr"></div>
                            <h6 className="text-white mt-2 mb-4">Паспортные данные</h6>
                            <Row>
                                <Col xs="6">
                                    <Label className="mb-2" for="PasportSeria">Серия паспорта</Label>
                                    <InputGroup size="lg">
                                        <InputGroupText><FaIdCard /></InputGroupText>
                                        <Input className="border-start-0" onChange={(e) => setPasportSer(e.target.value)} id="PasportSeria" placeholder="KA" />
                                    </InputGroup>
                                </Col>

                                <Col xs="6">
                                    <Label className="mb-2" for="PasportNumber">Серийный номер</Label>
                                    <InputGroup size="lg">
                                        <InputGroupText><FaEllipsisH /></InputGroupText>
                                        <Input className="border-start-0" onChange={(e) => setPasportNumber(e.target.value)} id="PasportNumber" placeholder="1234567" />
                                    </InputGroup>
                                </Col>

                                <div className="mt-3">
                                    <Label className="mb-2" for="PasportSeria">Сканер паспорта</Label>
                                    <Card>
                                        <CardBody>
                                            <div className="image-uploadify">
                                                <div className="image-uploadify-plase">
                                                    <IoMdCloudUpload />
                                                    <Label className="mb-2 justify-content-start" for="pasport">Паспорт</Label>                                
                                                    <Input className="text-white mb-4" onChange={(e) => setImg1(e.target.files[0])} type="file" id="pasport" />
                                                    <Label className="mb-2" for="latter">Соглашение</Label>
                                                    <Input className="text-white mb-" onChange={(e) => setImg2(e.target.files[0])} type="file" id="latter" />
                                                    
                                                </div>                                                
                                            </div>
                                        </CardBody>
                                    </Card>
                                </div>
                            </Row>
                            <div className="hr mt-5"></div>

                            <Col xs="12" className="mt-4">
                                <Button type="submit" className="text-white" outline color="secondary">Регистрация</Button>{' '}
                            </Col>
                        </Form>
                        
                        
                    </CardBody>
                </Card>
            </Col>

        </div>
    )
}

export default Registration
