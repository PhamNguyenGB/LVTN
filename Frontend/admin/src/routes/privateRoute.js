import {
    Route,
    Redirect,
} from "react-router-dom";
import Login from "../components/Login/Login";
import { useSelector } from "react-redux";


const PrivateRoute = (props) => {
    const staff = useSelector((state) => state.staff.staff);
    if (staff) {
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