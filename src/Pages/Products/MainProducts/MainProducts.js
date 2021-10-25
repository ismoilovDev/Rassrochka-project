import React, { useEffect, useState } from 'react';
import http from '../../../Services/getData';
import Product from './Product/Product';
import { BrowserRouter as Router,
    Switch,
    Route
} from 'react-router-dom'
import EditProduct from './EditProduct/EditProduct';
import AddProduct from '../AddProduct/AddProduct'

function MainProducts() {
    const [id, setId] = useState(null)
    const [products, setProducts] = useState([]);


    // All Products-------------->
    useEffect(() => {
        http.get('/products')
        .then((res) => {
                console.log(res.data.payload);
                setProducts(res.data.payload)
            })
            .catch(err => console.log(err))
    }, // eslint-disable-next-line 
    []);

    
    // Delete Product-------------->
    const deleteProduct = async (id) => {
        
        await http.delete(`/product/del?id=${id}`)
            .then((res) => {
                window.location.reload(false);
            })
            .catch(err => console.log(err))
    }


    return (
        <Router>
            <Switch>
                <Route exact path="/products">
                    <Product
                        productsList={products}
                        deleteProduct={deleteProduct}
                        setId={setId}
                    />
                </Route>
                <Route exact path="/edit-product">
                    <EditProduct 
                        inds={id}
                    />
                </Route>
                <Route exact path="/add-products">
                    <AddProduct
                    />
                </Route>
            </Switch>
        </Router>
    )
}

export default MainProducts
