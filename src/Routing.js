import { lazy, Suspense, useState } from 'react';
import {
  BrowserRouter as Router,
  Switch,
  Route
} from 'react-router-dom';
import Registration from "./Pages/Rigistration/Registration";
import Clients from "./Pages/Clinets/Clients";
import AddProduct from './Pages/AddProduct/AddProduct';
import MainProducts from './Pages/Products/Products';
// import EditProduct from './Pages/Products/MainProducts/EditProduct/EditProduct';


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
              <>
                <Route exact path="/" component={Home} />
                <Route path="/clients" component={Clients} />
                <Route path="/user-register" component={Registration} />
                <Route path="/add-products" component={AddProduct} />
                <Route path="/products" component={MainProducts} />              
              </>
            ) : (
              <Route exact path="/" render={() => <Login setToken={setToken}/>} />
            )
          }
        </Switch>
      </Router>
    </Suspense>
  )
}

export default Routing;
