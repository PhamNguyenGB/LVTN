import {
    Switch,
    Route,
    useHistory
} from "react-router-dom";
import PrivateRoute from "./privateRoute";
import Order from "../components/Order/Order";
import Login from "../components/Login/Login";
import OrderDelivered from "../components/OrderDelivered/OrderDelivered";
import OrderReceived from "../components/OrderReceived/OrderReceived";
import Profile from "../components/Profile/Profile";

const ShipperRoute = () => {

    return (
        <>
            <Switch>
                <Route path="/login" exact>
                    <Login />
                </Route>
                <PrivateRoute path="/delivered" component={OrderDelivered} />
                <PrivateRoute path="/received" component={OrderReceived} />
                <PrivateRoute path="/profile" component={Profile} />
                <PrivateRoute path="/" component={Order} exact />


                <Route path="*">
                    404 not found
                </Route>
            </Switch>
        </>
    )
};

export default ShipperRoute;