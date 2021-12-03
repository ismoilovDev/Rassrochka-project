import React, { useEffect, useState } from 'react';
import {
   BrowserRouter as Router,
   Switch,
   Route
} from 'react-router-dom';
import http from '../../Services/getData';
import Registration from '../Rigistration/Registration';
import ClientsBox from "./ClientsBox/ClientsBox";
import UserInformation from './UserInfo/UserInformation';
import Navbar from '../Navbar/Navbar';


function Clients() {




   return (
      <>
         <Router>
            <Switch>
               <Route exact path="/clients">
                  <ClientsBox />
               </Route>
               <Route exact path="/user-info/:id" component={UserInformation} />
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
