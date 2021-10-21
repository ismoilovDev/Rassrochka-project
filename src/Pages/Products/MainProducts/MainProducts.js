import React, { useEffect, useState } from 'react';
import http from '../../../Services/getData';
import { useHistory } from 'react-router-dom';
import Product from './Product/Product';
import { Route } from 'react-router-dom'
import EditProduct from './EditProduct/EditProduct';

function MainProducts() {
    const [products, setProducts] = useState([]);
    const [id, setId] = useState(null);
    const history = useHistory();
    const [product, setProduct] = useState([]);
    const [img, setImg] = useState('');
    const [name, setName] = useState("");
    const [price, setPrice] = useState("");
    const [ind, setInd] = useState("4");

    // All Products-------------->
    useEffect(() => {
        http.get('/products')
            .then((res) => {
                setProducts(res.data.payload)
            })
            .catch(err => console.log(err))
    }, // eslint-disable-next-line 
    []);

    // Single Product 
    useEffect(() => {
        const fetchPosts = async () => {
            try {
                const response = await http.get(`/product/single?id=${id}`);
                setProduct(response.data.payload);
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

    
    
    
    // Edit Product
    const editProduct = async (e) => {
        console.log(id);
        e.preventDefault();
        let formdata = new FormData();
        formdata.append('file', img, img.name);
        formdata.append('name', name);
        formdata.append('price', price);
        formdata.append('category_id', ind);
        await http.post(`/product/edit/${id}`, formdata)
            .then((res) => {
                setName('');
                setPrice('');
            })
            .catch((err) => console.log(err))
    }
    
    

    // Delete Product-------------->
    const deleteProduct = async (id) => {
        
        await http.delete(`/product/del?id=${id}`)
            .then((res) => {
                history.push('/products');
            })
            .catch(err => console.log(err))
    }


    return (
        <>
            <Route exact path="/products">
                <Product
                    productsList={products}
                    deleteProduct={deleteProduct}
                    editProduct={editProduct}
                    setId={setId}
                />
            </Route>
            <Route path="/edit-product">
                <EditProduct
                    editProduct={editProduct}
                    setImg={setImg}
                    setName={setName}
                    setInd={setInd}
                    setPrice={setPrice}
                />
            </Route>
        </>
    )
}

export default MainProducts
