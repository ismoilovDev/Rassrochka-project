import React from 'react'
import { Link } from 'react-router-dom'
import { Col, Container, Row } from 'reactstrap'
import MainProduct from './MainProduct/MainProduct'
import { FaPlusSquare } from "react-icons/fa";
import Navbar from '../../../Navbar/Navbar';

function Product({productsList, deleteProduct, editProduct, setId}) {
    
    const getIdHendler = (clickedId) => {
        setId(clickedId)
        console.log(clickedId);
    } 
    
    return (
        <div>
            <Navbar />
            <Container className="my-4">
                <Link className="text-white add-product" to="/add-products">
                    AddProduct
                    <FaPlusSquare className="mx-2" />
                </Link>
                <Row className="my-3">
                    {
                        productsList.map((product, index) => {
                            return (
                                <Col key={index} className="my-1" lg="4">
                                    <MainProduct 
                                        key={index}
                                        product={product}
                                        deleteProduct={deleteProduct}
                                        editProduct={editProduct}
                                        click={() => getIdHendler(product.product_id)}
                                    />
                                </Col>
                            )
                        })
                    }
                </Row>
            </Container>
        </div>
    )
}

export default Product
