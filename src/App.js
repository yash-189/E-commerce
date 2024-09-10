import './App.css';
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import { Routes, Route, useLocation } from "react-router-dom";
import { useState, useEffect, useLayoutEffect } from 'react';
import { useGlobalContext } from './components/CartContext';

import {
  Login, Signup, Profile, Homepage, Cart, Wishlist, Productpage,
  Contact, Order, Explore, Checkout, PaymentPage, Success,
  SearchPage, Address, Moffer, Offers
} from './components';

import { Navbar, Footer, Nav, Mnavbar } from './components/layout';

const MOBILE_BREAKPOINT = 425;

const useWindowSize = () => {
  const [windowSize, setWindowSize] = useState(window.innerWidth);

  useLayoutEffect(() => {
    const handleResize = () => setWindowSize(window.innerWidth);
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  return windowSize <= MOBILE_BREAKPOINT;
};

const withLayout = (Component, { requireAuth = false, showNav = false, showFooter = false }) => {
  return function WrappedComponent(props) {
    const isMobile = useWindowSize();
    const { auth } = useGlobalContext();

    if (requireAuth && !auth) {
      // Redirect to login or show unauthorized message
      return <Redirect to="/login" />;
    }

    return (
      <>
        {isMobile && <Nav />}
        {isMobile ? <Mnavbar /> : <Navbar />}
        <Component {...props} />
        {showNav && isMobile && <Nav />}
        {showFooter && !isMobile && <Footer />}
      </>
    );
  };
};

const routeConfig = [
  { path: "/login", component: Login },
  { path: "/", component: Homepage, showFooter: true },
  { path: "/register", component: Signup, showFooter: true },
  { path: "/profile", component: Profile, requireAuth: true, showNav: true, showFooter: true },
  { path: "/cart", component: Cart, showNav: true, showFooter: true },
  { path: "/wishlist", component: Wishlist, requireAuth: true, showFooter: true },
  { path: "/details", component: Productpage, showNav: true, showFooter: true },
  { path: "/payment", component: PaymentPage, requireAuth: true },
  { path: "/contact", component: Contact, showFooter: true },
  { path: "/orders", component: Order, requireAuth: true, showFooter: true },
  { path: "/explore", component: Explore, showFooter: true },
  { path: "/offers", component: ({ isMobile }) => isMobile ? <Moffer /> : <Offers />, showFooter: true },
  { path: "/search", component: SearchPage, showFooter: true },
  { path: "/checkout", component: Checkout, requireAuth: true },
  { path: "/success", component: Success, requireAuth: true },
  { path: "/address", component: Address, requireAuth: true, showFooter: true },
];

function App() {
  const isMobile = useWindowSize();

  return (
    <Routes>
      {routeConfig.map(({ path, component: Component, ...layoutProps }) => (
        <Route
          key={path}
          path={path}
          element={withLayout(Component, layoutProps)({ isMobile })}
        />
      ))}
    </Routes>
  );
}

export default App;
