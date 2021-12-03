import React, { useState } from 'react';
import { Col, Card, CardBody, CardTitle, Form, Row, Label, InputGroup, Input, InputGroupText, Button, Alert } from 'reactstrap';
import { FaUnlockAlt, FaUser, FaUserCircle } from 'react-icons/fa';
import '../../Styles/main.css';
import http from '../../Services/getData';
const Login = ({ setToken }) => {
    const [hasError, setHasError] = useState(false);
    const [emailValue, setEmailValue] = useState('')
    const [passValue, setPassValue] = useState('')

    const onFormSubmit = (e) => {
        e.preventDefault();
        const data = {
            email: emailValue,
            password: passValue
        }
        http.post('/login', data)
            .then((res) => {
                setToken(res.data.payload.token);
                window.localStorage.setItem('token', res.data.payload.token)
                window.location.reload(false);                
            })
            .catch(() => { setHasError(true) })
    }

    return (
        <div>
            <Col xl="7" className="mx-auto">
                <Card>
                    <CardBody className="p-5">
                        {
                            hasError ? (
                            <Alert className="text-center" color="danger">
                                Email or Password is wrong!
                            </Alert>
                            ) : (
                                <></>
                            )
                        }
                        <CardTitle className="text-center text-white mb-5">
                            <FaUserCircle />
                            <h5 className="mt-3">Логин пользователя</h5>
                        </CardTitle>
                        <div className="hr"></div>
                        <Form className="pb-5" onSubmit={onFormSubmit}>
                            <Row>
                                <Col xs="12">
                                    <Label className="mb-2" for="Email">Имя пользователя</Label>
                                    <InputGroup size="lg">
                                        <InputGroupText><FaUser /></InputGroupText>
                                        <Input  onChange={(e) => setEmailValue(e.target.value)} className="border-start-0 text-white" type="email" id="Email" placeholder="Введите имя пользователя" />
                                    </InputGroup>
                                    <br />
                                </Col>

                                <Col xs="12">
                                    <Label className="mb-2" for="Password">Пароль</Label>
                                    <InputGroup size="lg">
                                        <InputGroupText><FaUnlockAlt /></InputGroupText>
                                        <Input  onChange={(e) => setPassValue(e.target.value)} className="border-start-0 text-white" type="password" id="Password" placeholder="Введите пароль" />
                                    </InputGroup>
                                    <br />
                                </Col>

                                {/* <Col xs="6">
                                    <FormGroup check>
                                        <Input type="checkbox" id="gridCheck" />{' '}
                                        <Label check for="gridCheck">
                                            Проверить меня
                                        </Label>
                                    </FormGroup>
                                </Col> */}

                                {/* <Col xs="6" className="text-end">
                                    <a className="text-white" href="/" > Забыли пароль ? </a>
                                </Col> */}

                                <Col xs="12" className="mt-4 w-100">
                                    <Button type="submit" className="w-100 align-items-center px-5" size="lg" block>
                                        <FaUnlockAlt />Вход
                                    </Button>
                                </Col>
                            </Row>
                        </Form>
                    </CardBody>
                </Card>
            </Col>

        </div>
    )
}

export default Login
