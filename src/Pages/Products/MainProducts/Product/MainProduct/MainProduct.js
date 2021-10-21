import React from 'react';
import { Button, Card, CardBody, CardFooter, CardImg } from 'reactstrap';
import { Link } from 'react-router-dom';

function MainProduct({product, deleteProduct, index, setId}) {

    return (
        <>
            <div className="product my-1" key={index}>
                <Card>
                    <CardImg className="product-img" top width="100%" height="170px" src={product.img_url} alt="product" />
                    <CardBody className="p-1 px-2 m-0">
                        <div className="product-title d-flex align-items-center justify-content-between text-white">
                            <div>
                                <h6 className="mb-0">{product.product_name}</h6>
                                <p>{product.category_name}</p>
                            </div>
                            <div>
                                {product.price}
                            </div>
                        </div>
                    </CardBody>
                    <CardFooter className="d-flex justify-content-between">
                        <Button onClick={() => setId(product.product_id)}>
                            <Link className="text-white" to="/edit-product">Edit</Link>
                        </Button>
                        <Button className="bg-danger" onClick={() => deleteProduct(product.product_id)}>Delete</Button>{' '}
                    </CardFooter>
                </Card>
            </div>
        </>
    )
}

export default MainProduct
