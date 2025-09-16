import { BrowserRouter, Routes, Route } from "react-router-dom";
import Header from './components/Header/Header';
import Footer from './components/Footer/Footer';
import Home from './pages/Home';
import AboutUs from './pages/AboutUs';
import OurWorks from './pages/OurWorks';
import Donation from './pages/Donation';
import ContactUs from './pages/ContactUs';

// Admin Layout + Pages
import AdminLayout from "./pages/Admin/AdminLayout";
import Dashboard from "./pages/Admin/Dashboard";
import Donations from "./pages/Admin/Donations";
import TempleProjects from "./pages/Admin/TempleProjects";

import Events from "./pages/Admin/Events";
import Members from "./pages/Admin/Members";
import PujaBooking from "./pages/Admin/PujaBooking";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        
        <Route
          path="/*"
          element={
            <>
              <Header />
              <Routes>
                <Route path="/" element={<Home />} />
                <Route path="/about" element={<AboutUs />} />
                <Route path="/ourworks" element={<OurWorks />} />
                <Route path="/donation" element={<Donation />} />
                <Route path="/contact" element={<ContactUs />} />
              </Routes>
              <Footer />
            </>
          }
        />

        {/* Admin Layout  */}
        <Route path="/admin" element={<AdminLayout />}>
          <Route path="dashboard" element={<Dashboard />} />
          <Route path="donations" element={<Donations />} />
          <Route path="projects" element={<TempleProjects />} />
          <Route path="events" element={<Events />} />
          <Route path="members" element={<Members />} />
          <Route path="puja" element={<PujaBooking />} /> 
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
