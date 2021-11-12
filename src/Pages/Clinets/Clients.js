import React, { useEffect, useState } from 'react';
import {
   BrowserRouter as Router,
   Switch,
   Route,
   useHistory
} from 'react-router-dom';
import http from '../../Services/getData';
import Registration from '../Rigistration/Registration';
import ClientsBox from "./ClientsBox/ClientsBox";
import UserInformation from './UserInfo/UserInformation';
import Navbar from '../Navbar/Navbar';


function Clients() {

   const [clients, setClients] = useState([]);
   const [clickedId, setClickedId] = useState(null);
   const [searchTerm, setSearchTerm] = useState('');
   const [result, setResult] = useState([])
   const history = useHistory();


   // SEARCH Hendler ->
   const searchHendler = () => {
      http.get(`/cilent_search?search=${searchTerm}`)
         .then((res) => {
            console.log(res.data.payload);
            setResult(res.data.payload)
         })
         .catch((err) => {
            console.log(err);
         })
   }

   useEffect(() => {
      searchHendler()
      // eslint-disable-next-line
   }, [searchTerm])

   const empty = []
   const clicked = (id) => {
      setClickedId(id);
      console.log(clickedId);
   }
   empty.push(clickedId);
   console.log(empty);


   // GET Clients ->
   useEffect(() => {
      http.get('/cilents')
         .then((res) => {
            setClients(res.data.payload)
         })
         .catch(err => console.log(err))
   }, // eslint-disable-next-line
   [])

   const toClients = () => {
      history.push('/');
   }

   return (
      <>
         <Navbar
            setSearchTerm={setSearchTerm}
            searchTerm={searchTerm}
         />
         <Router>
            <Switch>
               <Route exact path="/clients">
                  <ClientsBox
                     clientsList={searchTerm === "" ? clients : result}
                     changeId={clicked}
                  />
               </Route>
               <Route exact path="/user-info">
                  <UserInformation
                     index={clickedId !== null ? clickedId : toClients}
                     empty={empty}
                  />
               </Route>
               <Route path="/user-register">
                  <Registration
                  />
               </Route>
            </Switch>
         </Router>
      </>
   )
}

export default Clients;
