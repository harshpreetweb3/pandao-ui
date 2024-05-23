import { useAccount } from "@/AccountContext";
import axios from "axios";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";




const MyCommunity = () => {
    const { accounts } = useAccount();
    const navigate = useNavigate();
    const [data, setData] = useState([]);

    useEffect(() => {
      const fetchBluePrint = async () => {
        try {
          const res = await axios.get(
            "https://pandao-backend.onrender.com/blueprint"
          );
          setData(res.data);
        } catch (error) {
          console.error("Error fetching blueprint data:", error);
        }
      };
      fetchBluePrint();
    }, []);
    if (!accounts || accounts.length === 0 ) {
        navigate("/");
        return null;
      }
    return (   <div className="pt-20 pb-10  items-start gap-3 justify-start min-h-screen bg-[radial-gradient(ellipse_at_left,_var(--tw-gradient-stops))] from-[#281038] from-0% via-[#181734] via-50%  to-[#0D1E3B] to-100% text-black px-2">
    <div className="max-w-[1440px]  grid md:grid-cols-3 grid-cols-1 mx-auto p-3 gap-3">
sfsf
    </div>
  </div> );
}
 
export default MyCommunity;