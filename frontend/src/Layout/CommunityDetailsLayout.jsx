import PropTypes from "prop-types";
import { Outlet } from "react-router-dom";

const CommunityDetailsLayout = ({ children }) => {
  return (
    <div className="community-details-content">
      {children || <Outlet />}
    </div>
  );
};

CommunityDetailsLayout.propTypes = {
  children: PropTypes.node,
};

export default CommunityDetailsLayout;
