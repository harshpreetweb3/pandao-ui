import Footer from "@/Pages/components/CommunityComponents/Footer";
import Navbar from "@/Pages/components/UserDashboardComponents/Navbar";
import PropTypes from "prop-types";
import { Outlet } from "react-router-dom";

const UserDashboardLayout = ({ children }) => {
  return (
    <div>
      <div className="community-details-content">{children || <Outlet />}</div>
      <Footer/>
    </div>
  );
};

UserDashboardLayout.propTypes = {
  children: PropTypes.node,
};

export default UserDashboardLayout;
