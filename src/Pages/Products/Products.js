import React, { useEffect, useState } from 'react';
import http from '../../Services/getData';
import Product from './MainProducts/Product/Product';
import {
   BrowserRouter as Router,
   Switch,
   Route
} from 'react-router-dom';
import AddProduct from '../AddProduct/AddProduct';
import Navbar from '../Navbar/Navbar';
import { useHistory } from 'react-router-dom';



function MainProducts() {


   const [clients, setClients] = useState([]);
   const [products, setProducts] = useState([]);
   const [searchTerm, setSearchTerm] = useState('');
   const [result, setResult] = useState([]);
   const history = useHistory();



   // All Products-------------->
   useEffect(() => {
      http.get('/products')
         .then((res) => {
            setProducts(res.data.payload)
         })
         .catch(err => console.log(err))
   }, // eslint-disable-next-line 
      []);


   // SEARCH Hendler ->
   useEffect(() => {
      const filteredResults = clients.filter((client) =>
         (client.client_name !== undefined ? (client.client_name).toLowerCase() : "").includes(searchTerm.toLowerCase())
         || (client.phone1 !== undefined ? (client.phone1).toLowerCase() : "").includes(searchTerm.toLowerCase())
         || (client.phone2 !== undefined ? (client.phone2).toLowerCase() : "").includes(searchTerm.toLowerCase()));

         setResult(filteredResults.reverse());
   }, [clients, searchTerm])


   // GET Clients ->
   useEffect(() => {
      http.get('/cilents')
         .then((res) => {
            setClients(res.data.payload)
         })
         .catch(err => console.log(err))
   }, // eslint-disable-next-line
      [])


   // Delete Product-------------->
   const deleteProduct = async (id) => {

      await http.delete(`/product/del?id=${id}`)
         .then((res) => {
            const newProductsList = products.filter(product => product.id !== id);
            
            setProducts(newProductsList);
            history.push('/products')
            window.location.reload(false);
         })
         .catch(err => console.log(err))
   }

   return (
      <>
         <Navbar
            setSearchTerm={setSearchTerm}
            searchTerm={searchTerm}
         />
         <Router>
            <Switch>
               <Route path="/products">
                  <Product
                     productsList={products}
                     deleteProduct={deleteProduct}
                  />
               </Route>
               <Route path="/add-products">
                  <AddProduct />
               </Route>
            </Switch>
         </Router>
      </>
   )
}

export default MainProducts
