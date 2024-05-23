import axios from "axios";
import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { BreadCrumb } from "./components/BreadCrumb";
import { Button } from "@/components/ui/button";

const DaoDetailsPage = () => {
  const param = useParams();
  const [data, setData] = useState();
  const navigate=useNavigate()
  useEffect(() => {
    const fetchBluePrint = async () => {
      try {
        const res = await axios.get(
          `https://pandao-backend.onrender.com/blueprint/${param.slug}`
        );
        setData(res.data);
      } catch (error) {
        console.error("Error fetching blueprint data:", error);
      }
    };
    fetchBluePrint();
  }, [param.slug]);
 
  return (
    <div className="pt-20 pb-10  items-start gap-3 justify-start min-h-screen bg-[radial-gradient(ellipse_at_left,_var(--tw-gradient-stops))] from-[#281038] from-0% via-[#181734] via-50%  to-[#0D1E3B] to-100% text-black px-2">
    
      {data && (
        
        <div className="max-w-[1440px] flex flex-col  mx-auto p-3 text-white gap-2">
   
          <BreadCrumb name={param.slug}/>

      
          <div className="text-4xl font-bold mt-8 text-center">{data.slug}</div>
          <div className="text-lg font-semibold text-center">{data.description}</div>
          <div className="text-lg font-semibold">
            {data.terms.map((term, index) => (
              <div key={index} className="text-white flex flex-col gap-5 ">
                <div className="text-4xl font-semibold text-center mt-5">
                    {term.key}
                </div>
                <div className="text-xl font-medium">
                {term.description}  

                </div>
              </div>
            ))}
          </div>
          <Button
              onClick={() => {
                navigate(`/exploreDao/${param.slug}/deploy`);
              }}
              variant="outline"
              className="text-white bg-purple-600 hover:bg-purple-400 mt-5"
            >
Deploy            </Button>
        </div>
      )}
    </div>
  );
};

export default DaoDetailsPage;
