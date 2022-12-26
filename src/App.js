import './App.css';
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import Login from './components/Login';
import {
  BrowserRouter,
  Routes,
  Route,
  useLocation,
} from "react-router-dom";
import Signup from './components/Signup';
import Profile from './components/Profile';
import Errorpage from './components/Errorpage';
import Homepage from './components/Homepage';
import Cart from './components/cart/Cart';
import Wishlist from './components/Wishlist';
import Footer from './components/Footer';
import Navbar from './components/Navbar';
import Productpage from './components/Productpage';
import Contact from './components/Contact';
import Order from './components/OrderPage';
import Explore from './components/Explore';
import Checkout from './components/Checkout';
import Nav from './components/Nav';
import PaymentPage from './components/PaymentPage';
import Success from './components/Success';
import { ProtectedRoute } from './components/ProtectedRoute';
import Mnavbar from './components/mobile/Mnavbar';
import SearchPage from './components/SearchPage';
import { useGlobalContext } from './components/CartContext';
import Address from './components/Address';
import Moffer from './components/mobile/Moffer';
import Offers from './components/Offers';
import { useState } from 'react';
import { useEffect } from 'react';
import { useLayoutEffect } from 'react';
function App() {
  const token = localStorage.getItem("token")
  console.log(token);
  const location = useLocation();
  const pathName = location.pathname

  const [windowSize, setWindowSize] = useState(1024)
  useLayoutEffect(() => {
    window.addEventListener('resize', () => {
      const myWidth = window.innerWidth;
      console.log('www', myWidth)

     return setWindowSize(myWidth)
    })
  }, [window])



  const { auth } = useGlobalContext()
  return (
    <>
      {windowSize <= 425 ? <Nav /> : ''}



      <Routes>
      {windowSize <= 425 ? <Route path="/login" element={<> <Mnavbar /> <Nav />< Login /> </>}></Route>
      :
        <Route path="/login" element={<><Navbar /><Login /> </>}></Route>}

        {windowSize <= 425 ?
          <Route path="/" element={<><Mnavbar />  <Homepage /> </>}></Route>
          :

          <Route path="/" element={<><Navbar /><Homepage /> <Footer /></>}></Route>
        }
        {windowSize <= 425 ?
          <Route path="/register" element={<> <Mnavbar /><Nav /> <Signup /> </>}></Route>
          :
        <Route path="/register" element={<><Navbar /><Signup /><Footer /> </>}></Route>}




        {windowSize <= 425 ?  <Route path="/profile" element={<> <Mnavbar />< Profile />  <Nav /></>}></Route>
        :
        <Route path="/profile" element={<><Navbar /><Profile /> <Footer /></>}></Route>}
        {/* <Route path="/error" element={<Errorpage />}></Route> */}
        {/* <Route path="/" element={<Homepage />}></Route> */}
        {windowSize <= 425 ?
          <Route path="/cart" element={<> <Mnavbar />< Cart />  <Nav /></>}></Route>

          :
          <Route path="/cart" element={<><Navbar /><Cart /><Footer /> </>}></Route>}
        {windowSize <= 425 ?  <Route path="/wishlist" element={<ProtectedRoute><> <Mnavbar /><Wishlist /> </></ProtectedRoute>}></Route>
        :
          <Route path="/wishlist" element={<ProtectedRoute><Navbar /><><Wishlist /> <Footer /></></ProtectedRoute>}></Route>}
       {windowSize <= 425 ?
          <Route path="/details" element={<><Mnavbar />< Productpage />  <Nav /></>}></Route>
          :
          <Route path="/details" element={<><Navbar /><Productpage /> <Footer /></>}></Route>}
        {windowSize <= 425 ? <Route path="/payment" element={<ProtectedRoute>< PaymentPage /></ProtectedRoute>}></Route>
          :
          <Route path="/payment" element={<ProtectedRoute>< PaymentPage /></ProtectedRoute>}></Route>}
        {windowSize <= 425 ?
          <Route path="/contact" element={<> <Mnavbar /><Contact /> </>}></Route>
          :
          <Route path="/contact" element={<><Navbar /><Contact /><Footer /> </>}></Route>}
        {windowSize <= 425 ?  <Route path="/orders" element={<ProtectedRoute><Mnavbar /><Order /></ProtectedRoute>}></Route>
        :
          <Route path="/orders" element={<ProtectedRoute><Navbar /><Order /><Footer /></ProtectedRoute>}></Route>}
        {windowSize <= 425 ?  <Route path="/explore" element={<> <Mnavbar /><Explore /></>}></Route>
        :
        <Route path="/explore" element={<><Navbar /><Explore /><Footer /></>}></Route>}
        {windowSize <= 425 ? <Route path="/offers" element={<><Mnavbar /><Moffer /></>}></Route>
        :
         <Route path="/offers" element={<><Navbar /><Offers /><Footer /></>}></Route>}
        {windowSize <= 425 ?  <Route path="/search" element={<><Mnavbar /> <SearchPage /></>}></Route>
        :
        <Route path="/search" element={<><Navbar /><SearchPage /><Footer /></>}></Route>}
        {windowSize <= 425 ?  <Route path="/checkout" element={<ProtectedRoute><Checkout /></ProtectedRoute>}></Route>
        :
        <Route path="/checkout" element={<ProtectedRoute><Checkout /></ProtectedRoute>}></Route>}

        {windowSize <= 425 ? <Route path="/success" element={<ProtectedRoute><Success /></ProtectedRoute>}></Route> :
          <Route path="/success" element={<ProtectedRoute><Success /></ProtectedRoute>}></Route>}
        {windowSize <= 425 ?  <Route path="/address" element={<><ProtectedRoute> <Mnavbar /><Address /></ProtectedRoute></>}></Route>
        :
        <Route path="/address" element={<ProtectedRoute><Navbar /><Address /><Footer /></ProtectedRoute>}></Route>}
      </Routes>


     

    </>
  );
}

export default App;
