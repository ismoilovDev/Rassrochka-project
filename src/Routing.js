import { lazy, Suspense, useState } from 'react';
import {
  BrowserRouter as Router,
  Switch,
  Route
} from 'react-router-dom';
import Registration from "./Pages/Rigistration/Registration";
import Clients from "./Pages/Clinets/Clients";
import Products from './Pages/Products/Products';
import AddProduct from './Pages/Products/AddProduct/AddProduct';
import EditProduct from './Pages/Products/MainProducts/EditProduct/EditProduct';
import MainProducts from './Pages/Products/MainProducts/MainProducts';


const Home = lazy(() => import('./Pages/Home/Home'));
const Login = lazy(() => import('./Pages/Login/Login'))

function Routing() {
  const [token, setToken] = useState(window.localStorage.getItem('token'));


  return (
    <Suspense fallback={<></>}>
      <Router>
        <Switch>
          {
            token ? (
              <Route exact path="/" component={Home} />
            ) : (
              <Route exact path="/" render={() => <Login setToken={setToken}/>} />
            )
          }
          <Route exact path="/clients" component={Clients} />
          <Route exact path="/user-register" component={Registration} />
          <Route exact path="/products" component={MainProducts} />
          <Route exact path="/add-products" component={AddProduct} />
          <Route />
        </Switch>
      </Router>
    </Suspense>
  )
}

export default Routing;
