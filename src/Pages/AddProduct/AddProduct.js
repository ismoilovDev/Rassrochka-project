import React, { useEffect, useState } from 'react';
import logo from '../../assets/images/logo-icon.png';
import http from '../../Services/getData';
import { AiFillFolderAdd } from "react-icons/ai";
import { MdAddShoppingCart } from "react-icons/md";
import { Col, Card, CardBody, CardTitle, Form, Row, Label, InputGroup, Input, Button, Alert } from 'reactstrap';
import { useHistory } from 'react-router-dom';
import { Link } from '@material-ui/core';


const AddProduct = () => {

    const [products, setProducts] = useState([])
    const [option, setOption] = useState([]);
    const [img, setImg] = useState('');
    const [name, setName] = useState("");
    const [ind, setInd] = useState('');
    const history = useHistory();

    useEffect(() => {
        const fetchPosts = async () => {
            try {
                const response = await http.get('/products');
                setProducts(response.data.payload);
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

    // Alert Messege ---->
    let [classes, setClasses] = useState('messege-alert-box')
    const showAlert = () => {
        if(classes === 'messege-alert-box'){
            setClasses('messege-alert-box active')
        }else {
            setClasses('messege-alert-box')
        }
    }

    // Alert Messege ---->
    let [classesAdd, setClassesAdd] = useState('messege-alert-box')
    const showAddAlert = () => {
        if(classesAdd === 'messege-alert-box'){
            setClassesAdd('messege-alert-box active')
        }else {
            setClassesAdd('messege-alert-box')
        }
    }

    // Post {Add} Product
    const addProducts = async (e) => {
        if(
            img &&
            ind &&
            name
        ){
            e.preventDefault();
            console.log(img);
            let formdata = new FormData();
            formdata.append('product_img', img, img.name);
            formdata.append('category_id', ind);
            formdata.append('name', name);
            console.log(formdata);
            await http.post('/product/add', formdata)
                .then((res) => {
                    console.log(res.data.payload);
                    if (res.data.payload.length === 0) {
                        showAlert()
                    } else if(res.data.payload.length !== 0) {
                        showAddAlert()
                        const allPosts = [...products, res.data.payload];
                        setProducts(allPosts);
                        setName('');
                        history.push('/products');
                        // window.location.reload(false);
                    }
                })
                .catch((err) => console.log(err))
                showAlert()
        }else {
            alert("Forma to'liq to'ldirilmadi")
        }
    }

    // Get Option
    const getOption = () => {
        http.get('/categories')
            .then((res) => {
                setOption(res.data.payload)
            })
            .catch(err => console.log(err))

    }

    useEffect(() => {
        getOption()
        // eslint-disable-next-line
    }, [])
    
    return (
        <div className="main mt-3">
            <div className={classes}>
                <Alert className="messege-alert" color="warning">
                    Название продукта было введено ранее
                </Alert>
            </div>
            <div className={classesAdd}>
                <Alert className="messege-alert" color="warning">
                    Подождите пожалуйста! Товар добавляется
                </Alert>
            </div>
            <Col xl="7" className="mx-auto">
                <Card>
                    <CardBody className="p-5 register-title">
                        <CardTitle className="d-flex align-items-center justify-content-between text-white">
                            <div>
                                <MdAddShoppingCart />
                                <h5>Добавить товар</h5>
                            </div>
                            <div className="nav-logo nav-logo-1">
                                <Link href="/">
                                    <img src={logo} alt="logo">
                                    </img>
                                    <h4>Рассрочка</h4>
                                </Link>
                            </div>
                        </CardTitle>
                        <div className="hr"></div>
                        <Form className="pb-5" onSubmit={addProducts}>
                            <Row>
                                <Col xs="6">
                                    <Label className="mb-2" for="product_img">Изображение</Label>
                                    <InputGroup size="md">
                                        <Input className="text-white input-type-file w-100" onChange={(e) => setImg(e.target.files[0])} type="file" id="product_img" placeholder="Изображение" />
                                    </InputGroup>
                                    <br />
                                </Col>

                                <Col xs="6">
                                    <Label className="mb-2" for="product_name" >Имя</Label>
                                    <InputGroup size="md">
                                        <Input className="text-white" onChange={(e) => setName(e.target.value)} type="text" id="product_name" placeholder="Имя" />
                                    </InputGroup>
                                    <br />
                                </Col>


                                <Col xs="6">
                                    <Label className="mb-2" for="category_id">Выбрать категорию !</Label>
                                    <select className="mx-2 bg-dark form-select text-white" id="category_id" onChange={(e) => setInd(e.target.value)} >
                                        <option value=""></option>
                                        {
                                            option.map((item) => {
                                                return (
                                                    <option key={item.id} value={String(item.id)}>{String(item.name)}</option>
                                                )
                                            })
                                        }
                                    </select>
                                    <br />
                                </Col>

                                <Col xs="6" className="d-flex justify-content-end align-items-center">
                                    <Button type="submit" className="py-2" size="md">
                                        <AiFillFolderAdd />Добавить
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

export default AddProduct;
