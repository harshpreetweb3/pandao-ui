import { Link, useNavigate } from "react-router-dom";
import { Button } from "../../components/ui/button";
import MobileSidebar from "./MobileSidebar";
import { Rocket } from "lucide-react";
import { useRdt } from "@/hooks/useRdt";
import axios from "axios";



const Navbar = () => {
  const rdt = useRdt();
  const navigate=useNavigate()
 rdt.walletApi.provideConnectResponseCallback(async (result) => {
  if (result.isErr()) {
    console.log("Error");
  } else {
    try {
      const response = await axios.get(`${import.meta.env.VITE_BACKEND_URL}/user/check-signup/${result.value.accounts[0].address}`);
      console.log(response.data.exist);
      
      if (response.data.exist === false) {
        navigate("/signup");
      } else {
        
        navigate("/userDashboard");
        // try {
        //   const loginResponse = await axios.post(`${import.meta.env.VITE_BACKEND_URL}/user/login`, {
        //     public_address: result.value.accounts[0].address
        //   });
        //   console.log("Login successful", loginResponse.data);
        //   if(loginResponse.status==200){

        //   navigate("/userDashboard");
        //   }
        // } catch (loginError) {
        //   console.log("Error during login API call", loginError);
        // }
      }
    } catch (error) {
      console.log("Error in API call", error);
    }
  }
});


  return (
    <div className="w-full z-10 p-4 bg-[radial-gradient(ellipse_at_left,_var(--tw-gradient-stops))] from-[#281038] from-0% via-[#181734] via-50%  to-[#0D1E3B] to-100%  border-b-2 border-purple-800  text-white fixed ">
      <div className="max-w-[1440px] mx-auto flex  items-center justify-between h-10   ">
        <div className="w-full ">
          <Link to="/">
            <img src="/logo.png" alt="Logo" className=" h-14 " />
          </Link>
        </div>
        <ul className="md:flex hidden items-center justify-center gap-5 w-full font-semibold text-lg">
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

          <Button className="bg-purple-600 flex items-center gap-2">
            <Rocket /> <span>Launch Dao </span>{" "}
          </Button>
          <radix-connect-button  />
        </div>
        <div className="md:hidden block">
          <MobileSidebar />
        </div>
      </div>
    </div>
  );
};

export default Navbar;
 //const image_url = "https://github.com/shadcn.png";
  //  public_address: result.value.accounts[0].address,
  //         name: result.value.persona.label,
  //         image_url,