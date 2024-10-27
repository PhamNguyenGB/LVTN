import {
    Route,
    Redirect,
} from "react-router-dom";
import Login from "../components/Login/Login";
import { useSelector } from "react-redux";


const PrivateRoute = (props) => {
    const shipper = useSelector((state) => state.shipper.shipper);
    if (shipper) {
        return (
            <>
                <Route path={props.path} component={props.component}></Route>
            </>
        );
    } else {
        return (
            <Redirect to='/login'>

            </Redirect>
        )
    }
};

export default PrivateRoute;