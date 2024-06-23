import { useAccount } from "@/AccountContext";
import axios from "axios";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Skeleton } from "@/components/ui/skeleton"
import BackButton from "../components/BackButton";



const Template = () => {
  const navigate = useNavigate();
  const { accounts } = useAccount();
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);
  useEffect(() => {
    const fetchBluePrint = async () => {
      try {
        const res = await axios.get(`${import.meta.env.VITE_BACKEND_URL}/blueprint`);
        setData(res.data);
      } catch (error) {
        console.error("Error fetching blueprint data:", error);
      } finally {
        setLoading(false);
      }
    };
    fetchBluePrint();
  }, []);

  if (!accounts || accounts.length === 0 || !data) {
    navigate("/");
    return null;
  }
  return (
    <div className=" pb-10  items-start gap-3 justify-start min-h-screen text-black px-2">
      <div className="max-w-[1440px]  grid md:grid-cols-3 grid-cols-1 mx-auto p-3 gap-3">
   

      {loading ? (
          <>
      <div>
        Loading
      </div>

         
          </>
        ) : (
          data.map((project, index) => (
            <div
              key={index}
              onClick={() => {
                navigate(`/exploreDao/${project.slug}`);
              }}
              className="bg-slate-100 shadow-md rounded-lg p-6 hover:bg-slate-200 hover:shadow-lg cursor-pointer"
            >
              <h2 className="text-2xl font-bold mb-2">{project.slug}</h2>
              <p className="text-gray-900 mb-4 line-clamp-3">{project.description}</p>
            </div>
          ))
        )}
      </div>
    </div>
  );
};

export default Template ;
