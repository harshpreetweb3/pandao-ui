import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import "./App.css";
import HomePage from "./Pages/HomePage";
import Product from "./Pages/product";
import Aboutus from "./Pages/AboutUs";
import Resource from "./Pages/resources";
import UserDashboard from "./Pages/UserDashboard";
import ExploreDao from "./Pages/exploreDao";
import Deploy from "./Pages/Deploy";
import DaoDetailsPage from "./Pages/DaoDetailsPage";
import MyCommunity from "./Pages/MyCommunites";
import SignupPage from "./Pages/SignUpPage";
import CommunityDetails from "./Pages/CommunityDetails";
import UserPublicProfile from "./Pages/UsersPublicProfile";
import CommunityDetailsLayout from "./Layout/CommunityDetailsLayout";
import HomePageLayout from "./Layout/HomePageLayout";
import Members from "./Pages/CommunityPage/Members";
import Comments from "./Pages/CommunityPage/Comments";
import UserDashboardLayout from "./Layout/UserDashboardLayout";

function App() {
  return (
    <Router>
      <Routes>
      <Route path="/" element={<HomePageLayout />}>
          <Route index element={<HomePage />} />
          <Route path="aboutus" element={<Aboutus />} />
      
        </Route>
        <Route path="/userDashboard" element={<UserDashboardLayout />}>
        <Route index element={<UserDashboard />} />
        </Route>
      
        <Route path="/products" element={<Product />} />
        <Route path="/resources" element={<Resource />} />
        <Route path="/userDashboard" element={<UserDashboard />} />
        <Route path="/signup" element={<SignupPage />} />
        <Route path="/myCommunities" element={<MyCommunity />} />
        <Route path="/exploreDao" element={<ExploreDao />} />
        <Route path="/exploreDao/:slug" element={<DaoDetailsPage />} />
        <Route path="/exploreDao/:slug/deploy" element={<Deploy />} />
        <Route path="/community/detail/:id" element={<CommunityDetailsLayout />}>
          <Route index element={<CommunityDetails />} />
          <Route path="members" element={<Members />} />
          <Route path="comments" element={<Comments />} />
        </Route>
        <Route path="/userProfile/:id" element={<UserPublicProfile />} />
      </Routes>
    </Router>
  );
}

export default App;
