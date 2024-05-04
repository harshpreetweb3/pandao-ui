import { Link } from "react-router-dom";
import { Button } from "../../components/ui/button";
import MobileSidebar from "./MobileSidebar";
import { Rocket } from "lucide-react";
const Navbar = () => {
  return (
    <div className="w-full p-4 bg-[radial-gradient(ellipse_at_left,_var(--tw-gradient-stops))] from-[#281038] from-0% via-[#181734] via-50%  to-[#0D1E3B] to-100%  border-b-2 border-purple-800  text-white fixed ">
      <div className="max-w-[1440px] mx-auto flex  items-center justify-between h-10   ">
        <div className="w-full ">
          <Link to="/">
            <img src="/logo.png" alt="Logo" className=" h-14 " />
          </Link>
        </div>
        <ul className="md:flex hidden items-center justify-center gap-5 w-full font-semibold text-2xl">
          <Link to="/aboutus">
            <li>About Us</li>
          </Link>

          <Link to="/products">
            <li>Products</li>
          </Link>
          <Link to="/resources">
            <li>Resources</li>
          </Link>
        </ul>
        <div className="w-full md:flex items-center justify-end gap-4 hidden ">
          <Button className="bg-purple-600 ">What is Dao?</Button>
          <Button className="bg-purple-600 flex items-center gap-2"><Rocket/>  <span>Launch Dao </span>  </Button>
        </div>
        <div className="md:hidden block">
          <MobileSidebar />
        </div>
      </div>
    </div>
  );
};

export default Navbar;
