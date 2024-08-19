import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";

import useViewStore from "@/store/view";
import { Progress } from "@/components/ui/progress";
import { useEffect, useState } from "react";
import { useAccount } from "@/AccountContext";
import { useNavigate } from "react-router-dom";
import axios from "axios";

const TemplateView = () => {
  const { setView } = useViewStore();
  const navigate = useNavigate();
  const { accounts } = useAccount();
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);
  const handleViewChange=()=>{
    setView("3")
  }
  useEffect(() => {
    const fetchBluePrint = async () => {
      try {
        const res = await axios.get(
          `${import.meta.env.VITE_BACKEND_URL}/blueprint`
        );
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
    <div className="max-w-[1000px] mx-auto mt-20">
      <Card className="bg-white relative z-30 text-black mt-10 p-12 flex flex-col gap-3 rounded-xl shadow-sm">
        <div className="mb-6 flex flex-col gap-2">
          <div className="flex items-center justify-between ">
            <div>Create your DAO</div>
            <div>Step 1 of 3</div>
          </div>
          <Progress value={33} className="rounded-sm" />
        </div>

        <div className="text-4xl font-semibold">Select your template</div>
        <div className="flex md:flex-row flex-col items-center justify-between gap-3">
          <span className="w-full">
            Start simple and learn as you go. You can always evolve your DAO in
            the future.
          </span>
          {/* <Button
              onClick={() => setView("3")}
              className="w-full md:w-1/3 group"
              variant="radix"
            >
              <span>Build you DAO</span>
              <ChevronRight className="h-4 w-5 group-hover:translate-x-2 duration-200 transition-transform" />
            </Button> */}
        </div>
      </Card>
      <div className="max-w-[1000px] pt-4  relative z-30 grid md:grid-cols-3 grid-cols-1 mx-auto  gap-3">
        {loading ? (
          <>
            <div className="flex items-center justify-center w-full h-52   col-span-3 rounded-md mt-4">
              Loading..
            </div>
          </>
        ) : (
          data.map((project, index) => (
            <div
              key={index}
             
              className="bg-white shadow-md rounded-lg p-6 hover:bg-slate-50 hover:shadow-lg cursor-pointer"
            >
              <h2 className="text-2xl font-bold mb-2">{project.slug}</h2>
              <p className="text-gray-900 mb-4 line-clamp-3">
                {project.description}
              </p>
              <div className="flex w-full gap-3 ">
                <Button  onClick={() => {
                navigate(`/exploreDao/${project.slug}`);
              }}>
                    Details
                </Button>
                <Button onClick={handleViewChange}>
                    Use
                </Button>
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
};

export default TemplateView;
