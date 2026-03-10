import './App.css'
import Navbar from './components/navbar/Navbar'
import 'bootstrap/dist/css/bootstrap.min.css';
import Home from './pages/home/Home';
import { BrowserRouter, Routes, Route, HashRouter } from 'react-router-dom';
import Men from './pages/Men/Categories';
import Shop from './pages/Shop/Shop';
import About from './pages/About/About';
import Login from './pages/login/Login';
import Detail from './pages/detail/Detail';
import Register from './pages/register/Register';
import Footer from './pages/footer/Footer';
import { ProtectRoute } from './components/Protect/ProtectRoute';
import Cart from './pages/cart/Cart';
import Checkout from './pages/checkout/Checkout';
// import { Counter } from './pages/react/Counter';


function App() {


  return (
    <>

      <BrowserRouter>
        {/* <HashRouter> */}
        <Navbar />
        <Cart /> {/* Render globally outside of Routes */}
        <Routes>
          <Route element={<ProtectRoute />}>
            <Route path={"/"} element={<Home />} />
            <Route path={"/:category"} element={<Men />} />
            <Route path={"/shop"} element={<Shop />} />
            <Route path={"/about"} element={<About />} />
            <Route path={`/:category/detail/:id`} element={<Detail />} />
            <Route path={"/checkout"} element={<Checkout />} />
          </Route>
          <Route path={"/login"} element={<Login />} />
          <Route path={"/register"} element={<Register />} />
        </Routes>
        <Footer></Footer>
        {/* </HashRouter> */}
      </BrowserRouter>

    </>
  )
}

export default App
