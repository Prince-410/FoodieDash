import { Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import ToastContainer from './components/ToastContainer';
import Landing from './pages/Landing';
import Restaurants from './pages/Restaurants';
import MenuPage from './pages/MenuPage';
import Cart from './pages/Cart';
import DeliveryPartners from './pages/DeliveryPartners';
import Payment from './pages/Payment';
import OrderTracking from './pages/OrderTracking';
import Orders from './pages/Orders';
import Favorites from './pages/Favorites';
import AdminLayout from './pages/admin/AdminLayout';
import Login from './pages/Login';
import Signup from './pages/Signup';
import StaticPage from './pages/StaticPage';
import Contact from './pages/Contact';

export default function App() {
  return (
    <>
      <Navbar />
      <ToastContainer />
      <Routes>
        <Route path="/" element={<><Landing /><Footer /></>} />
        <Route path="/restaurants" element={<><Restaurants /><Footer /></>} />
        <Route path="/restaurant/:id" element={<><MenuPage /><Footer /></>} />
        <Route path="/cart" element={<Cart />} />
        <Route path="/delivery-partners" element={<DeliveryPartners />} />
        <Route path="/payment" element={<Payment />} />
        <Route path="/tracking/:orderId" element={<OrderTracking />} />
        <Route path="/orders" element={<><Orders /><Footer /></>} />
        <Route path="/favorites" element={<><Favorites /><Footer /></>} />
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/about" element={<><StaticPage /><Footer /></>} />
        <Route path="/careers" element={<><StaticPage /><Footer /></>} />
        <Route path="/blog" element={<><StaticPage /><Footer /></>} />
        <Route path="/press" element={<><StaticPage /><Footer /></>} />
        <Route path="/privacy" element={<><StaticPage /><Footer /></>} />
        <Route path="/terms" element={<><StaticPage /><Footer /></>} />
        <Route path="/help" element={<><StaticPage /><Footer /></>} />
        <Route path="/contact" element={<><Contact /><Footer /></>} />
        <Route path="/admin/*" element={<AdminLayout />} />
      </Routes>
    </>
  );
}
