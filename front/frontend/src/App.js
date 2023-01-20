import React, {useEffect} from "react";
import {BrowserRouter as Router, Routes, Route, HashRouter} from "react-router-dom";
import './index.css';

import Layout from "./hocs/Layout";

import Home from "./containers/Home";
import Register from "./containers/Register";
import RegisterStaff from "./containers/RegisterStaff";
import Login from "./containers/Login";
import Dashboard from "./containers/Dashboard";
import Catalog from "./containers/Catalog";
import ItemInfo from "./components/ItemInfo";
import Test from "./containers/[ TEST ]";
import ActiveUsersOrders from "./components/ActiveUsersOrders";
import AllOrders from "./containers/AllOrders";
import AllUsers from "./containers/AllUsers";
import NewItem from "./containers/NewItem";
import UpdateItem from "./containers/UpdateItem";

import {Provider} from "react-redux";
import store from './store';
import {is_user_staff} from "./actions/auth";
import {connect} from "react-redux";
import {mapStateToPropsFactory} from "react-redux/es/connect/mapStateToProps";


const App = () => {
    return (
        <Provider store={store}>
            <Router>
                <Layout>
                    <Routes>
                        <Route exact path='/' element={<Home/>}/>
                        <Route exact path='/register' element={<Register/>}/>
                        <Route exact path='/register_staff' element={<RegisterStaff/>}/>
                        <Route exact path='/login' element={<Login/>}/>
                        <Route exact path='/dashboard' element={<Dashboard/>}/>
                        <Route exact path='/catalog' element={<Catalog/>}/>
                        <Route path='/catalog/:id' element={<ItemInfo/>}/>
                        <Route path='/orders' element={<ActiveUsersOrders/>}/>

                        <Route path='/all_orders' element={<AllOrders/>}/>
                        <Route path='/users' element={<AllUsers/>}/>
                        <Route path='/new_item' element={<NewItem/>}/>
                        <Route path='/update_item' element={<UpdateItem/>}/>



                        <Route path='/test' element={<Test/>}/>

                        {/*<Route exact path='/' component={Home}/>*/}
                        {/*<Route exact path='/register' component={Register}/>*/}
                        {/*<Route exact path='/login' component={Login}/>*/}
                        {/*<Route exact path='/dashboard' component={Dashboard}/>*/}
                    </Routes>
                </Layout>
            </Router>
        </Provider>
    )
}
// export default connect(null, {is_user_staff})(App);
export default App;
