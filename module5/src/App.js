import logo from './logo.svg';
import './App.css';
import ProductList from "./product/list";
import {BrowserRouter, NavLink, Route, Routes} from "react-router-dom";
import {ToastContainer} from "react-toastify";
import 'bootstrap/dist/css/bootstrap.min.css';
import ProductCreate from "./product/create";


function App() {
  return (
      <>
        <BrowserRouter>

          <div className="navbar navbar-expand-lg navbar-light bg-light">
            <nav className="navbar navbar-expand-lg navbar-light bg-light">
              <div className="container-fluid">
                <div className="collapse navbar-collapse" id="navbarNav">
                  <ul className="navbar-nav">
                    <li className="nav-item">
                      <NavLink to="/product" className="nav-link" >Product</NavLink>
                    </li>
                    <li className="nav-item">
                      <NavLink to="/create" className="nav-link">Them moi</NavLink>
                    </li>
                  </ul>
                </div>
              </div>
            </nav>


          </div>
          <Routes>

            <Route path="/create" element={<ProductCreate/>}/>
            <Route path="/product" element={<ProductList/>}/>
          </Routes>
        </BrowserRouter>
        <ToastContainer></ToastContainer>
      </>
  );
}

export default App;
