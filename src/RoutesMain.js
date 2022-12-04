// import React from 'react'
// import {
//     BrowserRouter,
//     Routes,
//     Route,
//   } from "react-router-dom";
// import Cart from './components/Buttons/Cart';
// import Checkout from './components/Checkout';
// import Contact from './components/Contact';
// import Explore from './components/Explore';
// import Homepage from './components/Homepage';
// import Login from './components/Login';
// import Navbar from './components/Navbar';
// import Order from './components/OrderPage';
// import PaymentPage from './components/PaymentPage';
// import Profile from './components/Profile';
// import { ProtectedRoute } from './components/ProtectedRoute';
// import Signup from './components/Signup';
// import Success from './components/Success';
// import Wishlist from './components/Wishlist';

// const RoutesMain = () => {
//   return (
//  <>
//      <Navbar />
//  <Routes>
//         <Route path="/login" element={<Login />}></Route>

//         <Route path="/" element={<Homepage />}></Route>

//         <Route path="/register" element={<Signup
//          />}></Route>
//         <Route path="/profile" element={<Profile />}></Route>
//         {/* <Route path="/error" element={<Errorpage />}></Route> */}
//         <Route path="/" element={<Homepage />}></Route>
//         <Route path="/cart" element={<Cart />}></Route>
//         <Route path="/wishlist" element={<ProtectedRoute><Wishlist /></ProtectedRoute>}></Route>
//         <Route path="/details" element={< Productpag/>}></Route>
//         <Route path="/payment" element={
//           <ProtectedRoute>< PaymentPage /></ProtectedRoute>}></Route>
//         <Route path="/contact" element={< Contact />}></Route>
//         <Route path="/orders" element={<ProtectedRoute><Order /></ProtectedRoute>}></Route>
//         <Route path="/explore" element={<Explore />}></Route>
//         <Route path="/checkout" element={<ProtectedRoute><Checkout /></ProtectedRoute>}></Route>
//         <Route path="/success" element={<ProtectedRoute><Success /></ProtectedRoute>}></Route>

//       </Routes>
 
 
 
//  </>
//   )
// }

// export default RoutesMain