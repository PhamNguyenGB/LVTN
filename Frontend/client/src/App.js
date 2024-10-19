import Header from "./components/Navigation/Header";
import Footer from "./components/Navigation/Footer";
import UserRoute from "./routes/userRoute";
import {
  BrowserRouter as Router
} from "react-router-dom";
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';


function App() {
  return (
    <Router>
      <div className="App">
        <header className="App-header">
          <Header />
        </header>
        <div className="App-body">
          <UserRoute />
          <ToastContainer
            position="top-center"
            autoClose={3000}
            hideProgressBar={false}
            newestOnTop={false}
            closeOnClick
            rtl={false}
            pauseOnFocusLoss
            draggable
            pauseOnHover
            theme="light"
            className={'blockquote'}
          />
        </div>
        <footer>
          <Footer />
        </footer>
      </div>
    </Router>
  );
}

export default App;
