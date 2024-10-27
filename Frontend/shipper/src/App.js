import {
  BrowserRouter as Router
} from "react-router-dom";
import ShipperRoute from "./routes/shipperRoute";
import Sidebar from "../src/components/Sidebar/Sidebar";
import React, { useState } from 'react';
import './App.scss';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { useSelector } from "react-redux";

const App = () => {
  const shipper = useSelector((state) => state.shipper.shipper);

  const [isSidebarActive, setIsSidebarActive] = useState(false);

  const handleToggleSidebar = (isActive) => {
    setIsSidebarActive(isActive);
  };

  return (
    <Router>
      {shipper ?
        <div className="App-header">
          {/* <Nav /> */}
          <Sidebar onToggleSidebar={handleToggleSidebar} />

        </div>
        :
        <>
        </>
      }
      <div className={`App-body ${shipper ? (isSidebarActive === true ? 'body-with-sidebar' : 'body') : ''}`}>
        <ShipperRoute />
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
    </Router >
  );
}

export default App;

