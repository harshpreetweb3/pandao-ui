import { Link, NavLink, useNavigate, useParams } from "react-router-dom";
import { Button } from "../../../components/ui/button";
import MobileSidebar from "../MobileSidebar";
import { ChevronLeft, Rocket } from "lucide-react";
import { useRdt } from "@/hooks/useRdt";
import axios from "axios";
import MobileNav from "./MobileNav";

const Navbar = () => {
  const rdt = useRdt();
  const navigate = useNavigate();
  const params = useParams();

  rdt.walletApi.provideConnectResponseCallback(async (result) => {
    if (result.isErr()) {
      console.log("Error");
    } else {
      try {
        const response = await axios.get(
          `${import.meta.env.VITE_BACKEND_URL}/user/check-signup/${
            result.value.accounts[0].address
          }`
        );
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
    <div className="z-10 p-4  w-full  rounded-md bg-clip-padding backdrop-filter backdrop-blur-sm bg-opacity-80  bg-blue-50  text-black fixed ">
      <div className="max-w-[1440px] mx-auto flex  items-center justify-between h-10 md:px-10  ">
        <ul className="md:flex hidden items-center justify-start gap-5 w-full font-semibold text-lg">
        <NavLink
            to="/"
         className="bg-white p-2 rounded-xl hover:text-sky-600 group"
            end
          >
           <ChevronLeft className="group-hover:-translate-x-[2px] duration-300 transition-transform" />
          </NavLink>
          <NavLink
            to={`/community/detail/${params.id}`}
            className={({ isActive }) =>
              isActive
                ? "bg-white text-blue-800 w-32 text-center py-2 px-4 rounded-lg font-semibold"
                : "bg-transparent text-black w-32 text-center py-2 px-4 rounded-lg hover:text-[#003bf5] "
            }
            end
          >
            <li>Dashboard</li>
          </NavLink>
          <NavLink
            to={`/community/detail/${params.id}/members`}
            className={({ isActive }) =>
              isActive
                ? "bg-white text-blue-800 w-32 text-center py-2 px-4 rounded-lg font-semibold"
                : "bg-transparent text-black w-32 text-center py-2 px-4 rounded-lg hover:text-[#003bf5] "
            }
            end
          >
            <li>Members</li>
          </NavLink>
          <NavLink
            to={`/community/detail/${params.id}/comments`}
            className={({ isActive }) =>
              isActive
                ? "bg-white text-blue-800 w-32 text-center py-2 px-4 rounded-lg font-semibold"
                : "bg-transparent text-black w-32 text-center py-2 px-4 rounded-lg hover:text-[#003bf5] "
            }
            end
          >
            <li>Comments</li>
          </NavLink>
        </ul>
        <div className="w-full md:flex items-center justify-end gap-4 hidden ">
          <radix-connect-button />
        </div>
        <div className="md:hidden gap-3 flex items-center justify-between w-full">
        <NavLink
            to="/"
         className="bg-white p-2 rounded-xl hover:text-sky-600"
            end
          >
           <ChevronLeft/>
          </NavLink>  
          <MobileNav />
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
