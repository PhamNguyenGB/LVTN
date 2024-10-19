import {
    Switch,
    Route,
    useHistory
} from "react-router-dom";
import Login from "../components/Login/Login";
import Statistic from "../components/Statistic/statistic";
import PrivateRoute from "./privateRoute";
import Product from "../components/Products/product";
import Order from "../components/Order/order";
import OrderDetail from "../components/OrderDetail/orderDetail";
import Event from "../components/Event/event";
import ListProduct from "../components/ListProduct/ListProduct";
import Point from "../components/Point/point";
import Region from "../components/Region/region";
import { useSelector } from "react-redux";
import Register from "../components/Register/Register";
import Profile from "../components/Profile/profile";

const StaffRoute = () => {

    return (
        <>
            <Switch>
                <Route path="/login" exact>
                    <Login />
                </Route>
                <PrivateRoute path="/region" component={Region} />
                <PrivateRoute path="/point" component={Point} />
                <PrivateRoute path="/listProduct" component={ListProduct} />
                <PrivateRoute path="/event" component={Event} />
                <PrivateRoute path="/orderDetail/:id" component={OrderDetail} />
                <PrivateRoute path="/order" component={Order} />
                <PrivateRoute path="/product" component={Product} />
                <PrivateRoute path="/profile" component={Profile} />
                <PrivateRoute path="/register" component={Register} />
                <PrivateRoute path="/" component={Statistic} exact />


                <Route path="*">
                    404 not found
                </Route>
            </Switch>
        </>
    )
};

export default StaffRoute;