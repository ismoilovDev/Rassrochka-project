import React from 'react';
import { Col, Container, Row } from 'reactstrap';
import MainProduct from './MainProduct/MainProduct';
function Product({productsList, deleteProduct, editProduct, }) {


    return (
        <>
            {/* <Navbar 
                setSearchTerm={setSearchTerm}
                searchTerm={searchTerm}
            /> */}
            <Container className="my-4">
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
                                    />
                                </Col>
                            )
                        })
                    }
                </Row>
            </Container>
        </>
    )
}

export default Product
