import React, { useEffect, useState } from 'react';
import logo from '../../../../assets/images/logo-icon.png';
import http from '../../../../Services/getData';
import { AiFillFolderAdd } from "react-icons/ai";
import { FaCheck, FaUserPlus } from 'react-icons/fa';
import { Col, Card, CardBody, CardTitle, Form, Row, Label, InputGroup, Input, Button } from 'reactstrap';
import { useHistory } from 'react-router-dom';


const EditProduct = ({inds}) => {

    const [option, setOption] = useState([]);
    const [product, setProduct] = useState([]);
    const [img, setImg] = useState('');
    const [name, setName] = useState(product.product_name);
    const [price, setPrice] = useState("");
    const [ind, setInd] = useState("");
    const history = useHistory();


    // Single Product
    useEffect(() => {
        const fetchPosts = async () => {
            try {
                const response = await http.get(`/product/single?id=${inds}`);
                setProduct(response.data.payload);
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



    // Get Option
    const getOption = () => {
        http.get('/categories')
            .then((res) => {
                setOption(res.data.payload)
            })
            .catch(err => console.log(err))
    }


    // Edit Product
    const editProduct = async (e) => {
        if(
            img &&
            name &&
            price &&
            ind
        ){
            e.preventDefault();
            let formdata = new FormData();
            formdata.append('file', img, img.name);
            formdata.append('name', name);
            formdata.append('price', price);
            formdata.append('category_id', ind);
            await http.post(`/product/edit/${inds}`, formdata)
                .then((res) => {
                    setName('');
                    setPrice('');
                    history.push('/products');
                    window.location.reload(false);
                })
                .catch((err) => console.log(err))
        }else {
            alert("Forma to'liq to'ldirilmadi")
            history.push('/products');
        }
    }

    useEffect(() => {
        getOption()

        // eslint-disable-next-line
    }, [])


    return (
        
        <div className="main py-4">
            <Col xl="7" className="mx-auto">
                <Card>
                    <CardBody className="p-5 register-title">
                        <CardTitle className="d-flex align-items-center justify-content-between text-white">
                            <div>
                                <FaUserPlus />
                                <h5>Редактировать продукт</h5>
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
                        <Form className="pb-5" onSubmit={editProduct}>
                            <Row>
                                <Col xs="6" className="mb-2 old-img-box">
                                    <p className="text-white">Cтарое изображение</p>
                                    {
                                    img === "" ? (
                                        <img className="rounded" height="150px" src={product.img_url} alt="product" />
                                    ) : (                                      
                                        <p className="text-white clicked-img">
                                            <FaCheck className="mb-1" />
                                            Изображение выбрано
                                        </p>
                                    )
                                    }
                                </Col>
                                <Col xs="6">
                                    <Label className="mb-3 text-white" for="product_img">Изображение продукта</Label>
                                    <InputGroup size="md">
                                        <Input className="text-white" onChange={(e) => setImg(e.target.files[0])} type="file" id="product_img" placeholder="product img" />
                                    </InputGroup>
                                    <br />
                                </Col>

                                <Col xs="6" className="mt-4">
                                    <Label className="mb-2 text-white" for="product_name">Наименование товара</Label>
                                    <InputGroup size="md">
                                        <Input className="text-white" onChange={(e) => setName(e.target.value)} type="text" id="product_name" placeholder={product.product_name} />
                                    </InputGroup>
                                    <br />
                                </Col>

                                <Col xs="6" className="mt-4">
                                    <Label className="mb-2 text-white" for="product_price">Цена</Label>
                                    <InputGroup size="md">
                                        <Input className="text-white" onChange={(e) => setPrice(e.target.value)} type="text" id="product_price" placeholder={product.price} />
                                    </InputGroup>
                                    <br />
                                </Col>

                                <Col xs="6" className="mt-2">
                                    <Label className="mb-2 text-white" for="category_id">Категории Ид</Label><br />
                                    <select className="bg-dark" id="category_id" onChange={(e) => setInd(e.target.value)} >
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

                                <Col xs="6" className="mt-4 d-flex justify-content-end">
                                    <Button type="submit" className=" align-items-center px-4" size="xs">
                                        <AiFillFolderAdd />Редактировать
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

export default EditProduct;
