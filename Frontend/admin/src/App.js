// import Statistic from "./components/Statistic/statistic";
// import Login from "./components/Login/Login";
import Nav from "./components/Navigation/nav";
import StaffRoute from "./routes/staffRoute";
import {
  BrowserRouter as Router
} from "react-router-dom";
import { useSelector } from "react-redux";
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';


const App = () => {
  const staff = useSelector((state) => state.staff.staff);

  return (
    <Router>
      {staff ?
        <div className="App-header">
          <Nav />
        </div>
        :
        <>
        </>
      }
      <div className="App-body">
        <StaffRoute />
      </div>
      <ToastContainer
        position="top-center"
        autoClose={5000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="light"
      />
    </Router>
  );
}

export default App;
