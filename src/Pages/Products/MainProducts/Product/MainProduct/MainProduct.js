import React from 'react';
import { Button, Card, CardBody, CardFooter, CardImg } from 'reactstrap';
import EditProduct from '../../EditProduct/EditProduct';

function MainProduct({product, deleteProduct, index, }) {
    return (
        <>
            <div className="product my-1" key={index}>
                <Card>
                    <CardImg className="product-img" top width="100%" height="170px" src={product.img_url} alt="product" />
                    <CardBody className="p-1 px-2 m-0">
                        <div className="product-title d-flex align-items-center justify-content-between text-white">
                            <div>
                                <h5 className="mb-0">{product.product_name}</h5>
                                <p>{product.category_name}</p>
                            </div>
                            <div>
                                {product.price}
                            </div>
                        </div>
                    </CardBody>
                    <CardFooter className="d-flex justify-content-between align-items-center">
                        {/* <Link className="text-white edit-product btn btn-success bg-success" to="/edit-product" onClick={click}>Редактировать</Link> */}                        
                        <EditProduct
                            index={product.product_id}
                        />
                        <Button size="md" className="btn btn-danger bg-danger h-25" onClick={() => deleteProduct(product.product_id)}>Удалить</Button>{' '}
                    </CardFooter>
                </Card>
            </div>
        </>
    )
}

export default MainProduct
