import PropTypes from "prop-types";
import Footer from "@/Pages/components/Footer";
import Navbar from "@/Pages/components/Navbar";
import { Outlet } from "react-router-dom";

const HomePageLayout = ({ children }) => {
  return (
    <div>
      <Navbar />
      <div className="home-page-content">
        {children || <Outlet />}
      </div>
      <Footer />
    </div>
  );
};

HomePageLayout.propTypes = {
  children: PropTypes.node,
};

export default HomePageLayout;
