import {
    Switch,
    Route,
    useHistory
} from "react-router-dom";
import PrivateRoute from "./privateRoute";
import Order from "../components/Order/Order";

const ShipperRoute = () => {

    return (
        <>
            <Switch>
                {/* <Route path="/login" exact>
                    <Login />
                </Route> */}
                <PrivateRoute path="/order" component={Order} exact />
                <PrivateRoute path="/" component={Order} exact />


                <Route path="*">
                    404 not found
                </Route>
            </Switch>
        </>
    )
};

export default ShipperRoute;