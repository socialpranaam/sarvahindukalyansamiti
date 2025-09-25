import { BrowserRouter, Routes, Route, Navigate, Outlet } from "react-router-dom";
import Header from './components/Header/Header';
import Footer from './components/Footer/Footer';
import Home from './pages/Home';
import AboutUs from './pages/AboutUs';
import OurWorks from './pages/OurWorks';
import Donation from './pages/Donation';
import ContactUs from './pages/ContactUs';
import News from './pages/News';

// Admin Pages
import AdminLayout from "./pages/Admin/AdminLayout";
import Dashboard from "./pages/Admin/Dashboard";
import Donations from "./pages/Admin/Donations";
import TempleProjects from "./pages/Admin/TempleProjects";
import Events from "./pages/Admin/Events";
import Members from "./pages/Admin/Members";
import PujaBooking from "./pages/Admin/PujaBooking";
import Login from "./pages/Admin/Login";
import NewsDetails from "./components/News/NewsDetails";

// Protected Admin wrapper
const ProtectedAdmin = () => {
  const isLoggedIn = !!localStorage.getItem("authToken"); // check login
  return isLoggedIn ? <Outlet /> : <Navigate to="/admin" replace />;
};

function App() {
  return (
    <BrowserRouter>
      <Routes>
        {/* Public Pages */}
        <Route path="/*" element={
          <>
            <Header />
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/about" element={<AboutUs />} />
              <Route path="/ourworks" element={<OurWorks />} />
              <Route path="/donation" element={<Donation />} />
              <Route path="/news" element={<News />} />   
              <Route path="/contact" element={<ContactUs />} />
            </Routes>
            <Footer />
          </>
        } />
        <Route path="/news/:id" element={<NewsDetails/>}/>

        {/* Admin Pages */}
        <Route path="/admin">
          {/* Login Page */}
          <Route index element={<Login />} />

          {/* Protected Admin Pages */}
          <Route element={<ProtectedAdmin />}>
            <Route element={<AdminLayout />}>
              <Route path="dashboard" element={<Dashboard />} />
              <Route path="donations" element={<Donations />} />
              <Route path="projects" element={<TempleProjects />} />
              <Route path="events" element={<Events />} />
              <Route path="members" element={<Members />} />
              <Route path="pujabooking" element={<PujaBooking />} />
            </Route>
          </Route>
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
