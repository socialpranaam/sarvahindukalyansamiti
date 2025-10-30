import { BrowserRouter, Routes, Route, Navigate, Outlet } from "react-router-dom";

// Public Components
import Header from "./components/Header/Header";
import Footer from "./components/Footer/Footer";
import Home from "./pages/Home";
import AboutUs from "./pages/AboutUs";
import OurWorks from "./pages/OurWorks";
import Donation from "./pages/Donation";
import ContactUs from "./pages/ContactUs";
import News from "./pages/News";
import NewsDetails from "./components/News/NewsDetails";
import PujaBookingForm from "./components/Contact/PujaBookingForm";
import MemberForm from "./components/Contact/MemberForm";
import EventForm from "./components/Contact/EventForm";
import ProjectForm from "./components/Contact/ProjectForm";


// Admin Components
import AdminLayout from "./pages/Admin/AdminLayout";
import Dashboard from "./pages/Admin/Dashboard/Dashboard";
import Donations from "./pages/Admin/Donation/Donations";
import AddDonation from "./pages/Admin/Donation/AddDonation";
import TempleProjects from "./pages/Admin/Temple/TempleProjects";
import AddTempleProject from "./pages/Admin/Temple/AddTempleProject";
import Events from "./pages/Admin/Event/Events";
import AddEvent from "./pages/Admin/Event/AddEvent";
import Members from "./pages/Admin/Member/Members";
import AddMember from "./pages/Admin/Member/AddMember";
import PujaBooking from "./pages/Admin/PujaBooking/PujaBooking";
import AddPujaBooking from "./pages/Admin/PujaBooking/AddPujaBooking";
import AddNews from "./pages/Admin/News/AddNews";
import Login from "./pages/Admin/Login/Login";
import ContactList from "./pages/Admin/Contact/ContactList";
import NewsList from "./pages/Admin/News/NewsList";
import AddFeedBack from "./pages/Admin/FeedBack/AddFeedBack";
import ServiceForm from "./pages/Admin/Services/ServiceForm";
import ServicesList from "./pages/Admin/Services/ServiceList";
import UpdateNews from "./pages/Admin/News/UpdateNews";
import EditService from "./pages/Admin/Services/EditService";
import EditFeedbacks from "./pages/Admin/FeedBack/EditFeedBacks";
import FeedbackList from "./pages/Admin/FeedBack/FeedBackList";

//  Public Layout (Header + Footer)
const PublicLayout = () => (
  <>
    <Header />
    <Outlet />
    <Footer />
  </>
);

//  Protected route with expiry
const ProtectedAdmin = () => {
  const token = localStorage.getItem("authToken");
  const expiry = localStorage.getItem("authExpiry");

  if (!token || !expiry || new Date().getTime() > expiry) {
    // Token expired  logout
    localStorage.removeItem("authToken");
    localStorage.removeItem("authExpiry");
    return <Navigate to="/admin/login" replace />;
  }

  return <Outlet />;
};


function App() {
  return (
    <BrowserRouter>
      <Routes>
        {/*  Public Routes */}
        <Route path="/" element={<PublicLayout />}>
          <Route index element={<Home />} />
          <Route path="about" element={<AboutUs />} />
          <Route path="ourworks" element={<OurWorks />} />
          <Route path="donation" element={<Donation />} />
          <Route path="contact" element={<ContactUs />} />
          <Route path="news" element={<News />} />
        </Route>

        {/*  Public Forms (no header/footer) */}
        <Route path="/contact/pujabookingform" element={<PujaBookingForm />} />
        <Route path="/contact/memberform" element={<MemberForm />} />
        <Route path="/contact/eventform" element={<EventForm />} />
        <Route path="/contact/projectform" element={<ProjectForm />} />
        <Route path="/news/:id" element={<NewsDetails />} />

        {/*  Admin Routes */}
        <Route path="/admin">
          {/* Login Page */}
          <Route path="login" element={<Login />} />

          {/* Protected Routes (need login) */}
          <Route element={<ProtectedAdmin />}>
            <Route element={<AdminLayout />}>
              <Route path="dashboard" element={<Dashboard />} />
              <Route path="donations" element={<Donations />} />
              <Route path="donations/add-donation" element={<AddDonation />} />
              <Route path="projects" element={<TempleProjects />} />
              <Route path="projects/add-templeproject" element={<AddTempleProject />} />
              <Route path="events" element={<Events />} />
              <Route path="events/add-event" element={<AddEvent />} />
              <Route path="members" element={<Members />} />
              <Route path="members/add-member" element={<AddMember />} />
              <Route path="pujabooking" element={<PujaBooking />} />
              <Route path="pujabooking/add-pujabooking" element={<AddPujaBooking />} />
              <Route path="newslist" element={<NewsList />} />
              <Route path="newslist/add-news" element={<AddNews />} />
              <Route path="newslist/edit-news/:id" element={<UpdateNews />} />
              <Route path="contactlist" element={<ContactList />} />
              <Route path="feedbacks" element={<FeedbackList />} />
              <Route path="feedbacks/add-feedback" element={<AddFeedBack />} />
              <Route path="feedbacks/edit-feedback/:id" element={<EditFeedbacks />} />
              <Route path="services" element={<ServicesList />} />
              <Route path="services/add-service" element={<ServiceForm />} />
              <Route path="services/edit-service/:id" element={<EditService />} />
            </Route>
          </Route>
        </Route>

        {/* 404 Redirect */}
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
