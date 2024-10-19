import {
    Route,
    Redirect,
} from "react-router-dom";
import { useSelector } from "react-redux";


const PrivateRoute = (props) => {
    const user = useSelector((state) => state.user.user);
    if (user) {
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