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
import Navbar from '../Navbar/Navbar'


function Clients() {

    const [clients, setClients] = useState([]);
    const [clickedId, setClickedId] = useState(null);

    const clicked = (id) => {
        setClickedId(id);
        console.log(id);
    }
    

    useEffect(() => {
        http.get('/cilents')
        .then((res) => {
            console.log(res.data.payload);
            setClients(res.data.payload)
        })
        .catch(err => console.log(err))
    }, // eslint-disable-next-line
    [])

    return (
        <Router>
            <Switch>
                <Route exact path="/clients">
                    <ClientsBox
                        clientsList={clients}
                        changeId={clicked}
                    />
                </Route>
                <Route exact path="/user-info">
                    <UserInformation
                        index={clickedId}
                    />
                </Route>
                <Route exact path="/user-register">
                    <Registration
                    />
                </Route>
            </Switch>
        </Router>
    )
}

export default Clients;
