import Navbar from "@/Pages/components/CommunityComponents/Navbar";
import PropTypes from "prop-types";
import { Outlet } from "react-router-dom";

const CommunityDetailsLayout = ({ children }) => {
  return (
    <div>
      <Navbar/>
      <div className="community-details-content">{children || <Outlet />}</div>
    </div>
  );
};

CommunityDetailsLayout.propTypes = {
  children: PropTypes.node,
};

export default CommunityDetailsLayout;
