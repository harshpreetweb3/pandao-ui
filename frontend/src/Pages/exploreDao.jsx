import { useAccount } from "@/AccountContext";
import axios from "axios";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import BackButton from "./components/BackButton";
import { Skeleton } from "@/components/ui/skeleton"



const ExploreDao = () => {
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
    <div className="pt-20 pb-10  items-start gap-3 justify-start min-h-screen bg-[radial-gradient(ellipse_at_left,_var(--tw-gradient-stops))] from-[#281038] from-0% via-[#181734] via-50%  to-[#0D1E3B] to-100% text-black px-2">
     <BackButton/>
      <div className="max-w-[1440px]  grid md:grid-cols-3 grid-cols-1 mx-auto p-3 gap-3">
   

      {loading ? (
          <>
            <Skeleton className="w-[450px] h-[200px] bg-purple-300" />
            <Skeleton className="w-[450px] h-[200px] bg-purple-300" />
            <Skeleton className="w-[450px] h-[200px] bg-purple-300" />
            <Skeleton className="w-[450px] h-[200px] bg-purple-300" />
            <Skeleton className="w-[450px] h-[200px] bg-purple-300" />
            <Skeleton className="w-[450px] h-[200px] bg-purple-300" />

         
          </>
        ) : (
          data.map((project, index) => (
            <div
              key={index}
              onClick={() => {
                navigate(`/exploreDao/${project.slug}`);
              }}
              className="bg-purple-400 shadow-md rounded-lg p-6 hover:bg-purple-300 cursor-pointer"
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

export default ExploreDao;
