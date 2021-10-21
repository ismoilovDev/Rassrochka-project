import React, { useEffect, useState } from 'react';
import logo from '../../../assets/images/logo-icon.png';
import http from '../../../Services/getData';
import { AiFillFolderAdd } from "react-icons/ai";
import { FaUserPlus } from 'react-icons/fa';
import { Col, Card, CardBody, CardTitle, Form, Row, Label, InputGroup, Input, Button } from 'reactstrap';
import { useHistory } from 'react-router-dom';


const AddProduct = () => {

    const [products, setProducts] = useState([])
    const [option, setOption] = useState([]);
    const [img, setImg] = useState('');
    const [name, setName] = useState("");
    const [price, setPrice] = useState("");
    const [ind, setInd] = useState("4");
    const [surcharge, setSurcharge] = useState('');
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

    // Post {Add} Product
    const addProducts = async (e) => {
        if(
            img &&
            ind &&
            name &&
            price &&
            surcharge
        ){
            e.preventDefault();
            let formdata = new FormData();
            formdata.append('product_img', img, img.name);
            formdata.append('category_id', ind);
            formdata.append('name', name);
            formdata.append('price', price);
            formdata.append('surcharge', surcharge);
            console.log(formdata);
            await http.post('/product/add', formdata)
                .then((res) => {
                    const allPosts = [...products, res.data.payload];
                    setProducts(allPosts);
                    setName('');
                    setPrice('');
                    setSurcharge('');
                    history.push('/products');
                })
                .catch((err) => console.log(err))
        }else {
            return ''
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
        <div className="main">
            <Col xl="7" className="mx-auto">
                <Card>
                    <CardBody className="p-5 register-title">
                        <CardTitle className="d-flex align-items-center justify-content-between text-white">
                            <div>
                                <FaUserPlus />
                                <h5>Add Product</h5>
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
                        <Form className="pb-5" onSubmit={addProducts}>
                            <Row>
                                <Col xs="6">
                                    <Label className="mb-2" for="product_img">Product Image</Label>
                                    <InputGroup size="md">
                                        <Input className="text-white" onChange={(e) => setImg(e.target.files[0])} type="file" id="product_img" placeholder="product img" />
                                    </InputGroup>
                                    <br />
                                </Col>

                                <Col xs="6">
                                    <Label className="mb-2" for="product_name">Product Name</Label>
                                    <InputGroup size="md">
                                        <Input className="text-white" onChange={(e) => setName(e.target.value)} type="text" id="product_name" placeholder="product name" />
                                    </InputGroup>
                                    <br />
                                </Col>

                                <Col xs="6">
                                    <Label className="mb-2" for="product_price">Price</Label>
                                    <InputGroup size="md">
                                        <Input className="text-white" onChange={(e) => setPrice(e.target.value)} type="text" id="product_price" placeholder="product price" />
                                    </InputGroup>
                                    <br />
                                </Col>

                                <Col xs="6">
                                    <Label className="mb-2" for="product_surcharge">Surcharge</Label>
                                    <InputGroup size="md">
                                        <Input className="text-white" onChange={(e) => setSurcharge(e.target.value)} type="text" id="product_surcharge" placeholder="product price" />
                                    </InputGroup>
                                    <br />
                                </Col>

                                <Col xs="6">
                                    <Label className="mb-2" for="category_id">Category id:</Label>
                                    <select className="mx-2 bg-dark" id="category_id" onChange={(e) => setInd(e.target.value)} >
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

                                <Col xs="12" className="mt-4 w-100">
                                    <Button type="submit" className=" align-items-center px-5" size="md">
                                        <AiFillFolderAdd />Add
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
