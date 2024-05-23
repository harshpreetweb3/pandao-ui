import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import "./App.css";
import HomePage from "./Pages/HomePage";
import Navbar from "./Pages/components/Navbar";
import Product from "./Pages/product";
import Aboutus from "./Pages/AboutUs";
import Resource from "./Pages/resources";
import Footer from "./Pages/components/Footer";
import UserDashboard from "./Pages/UserDashboard";
import ExploreDao from "./Pages/exploreDao";
import Deploy from "./Pages/Deploy";
import DaoDetailsPage from "./Pages/DaoDetailsPage";


function App() {
  return (
    <Router>
      <Navbar />
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/aboutus" element={<Aboutus/>} />
        <Route path="/products" element={<Product />} />
        <Route path="/resources" element={<Resource />} />
        <Route path="/userDashboard" element={<UserDashboard />} />
        <Route path="/exploreDao" element={<ExploreDao />} />
        <Route path="/exploreDao/:slug" element={<DaoDetailsPage />} />
        <Route path="/exploreDao/:slug/deploy" element={<Deploy />} />

              </Routes>
      <Footer/>
    </Router>
  );
}

export default App;
