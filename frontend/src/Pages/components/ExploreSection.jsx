import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import axios from "axios";
import { Building2, GraduationCap } from "lucide-react";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

const ExploreSection = () => {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);
  const navigate=useNavigate()
  useEffect(() => {
    const fetchBluePrint = async () => {
      try {
        const res = await axios.get(
          `${import.meta.env.VITE_BACKEND_URL}/community`
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
  return (
    <div className="bg-slate-100 ">
      <div className=" flex flex-col items-start p-3 md:p-0  justify-start   -translate-y-24 mx-auto max-w-[1000px]">
        <div className="w-full min-h-1/2 grid md:grid-cols-3 grid-cols-1 gap-3 ">
          <Card className=" p-5 w-full gap-4 flex flex-col items-center justify-between bg-white rounded-md bg-clip-padding backdrop-filter backdrop-blur-sm bg-opacity-90   ">
            <div className=" w-full">
              <Building2 className="h-14 w-14 text-blue-900" />
            </div>
            <div className="w-full text-2xl font-semibold mt-2">
              Create your DAO
            </div>
            <p className="font-extralight text-slate-600 w-full">
              Create your own DAO on Radix Blockchain
            </p>
            <div className="w-full">
              <Button   variant="radix">
                Create a DAO
              </Button>
            </div>
          </Card>
          <Card className=" p-5 w-full gap-4 flex flex-col items-center justify-between bg-white rounded-md bg-clip-padding backdrop-filter backdrop-blur-sm bg-opacity-90   ">
            <div className=" w-full">
              <GraduationCap className="h-14 w-14 text-blue-800" />
            </div>
            <div className="w-full text-2xl font-semibold mt-2">
              Learn about DAOs
            </div>
            <p className="font-extralight text-slate-600 w-full">
              Learn about DAOs.How to create them using Radix
            </p>
            <div className="w-full">
              <Button onClick={()=>navigate("/resources")}   variant="radix">
                Learn about DAOs
              </Button>
            </div>
          </Card>
        </div>
        <div className=" mt-14 w-full">
          <div className="text-3xl  font-semibold">Explore DAOs</div>

          {loading ? (
            <div className="flex h-[200px] items-center justify-center text-center  mt-5 ">
               <div className="h-10 w-10 animate-spin rounded-full border-4 border-gray-200 border-t-blue-500" />
            </div>
          ) : (
            <div className="mt-5 grid md:grid-cols-2 grid-cols-1 gap-4 ">
              {data.map((dao, index) => (
                <Card
                  key={index}
                  onClick={() => {
                    navigate(`/community/detail/${dao.id}`)
                  }}
                  className="flex overflow-hidden flex-col items-start justify-between p-5 h-[160px] cursor-pointer hover:shadow-md "
                >
                  <div className="flex items-start gap-2">
                    <div className="h-16 w-16">
                      <div className="h-14 w-14 bg-blue-900 rounded-full flex items-center justify-center text-center text-white">
                        RD
                      </div>
                    </div>
                    <div>
                      <div className="text-xl font-semibold">{dao.name}</div>
                      <div className="text-sm font-semibold">{dao.owner.name}</div>
                    </div>
                  </div>
                  <div className="line-clamp-2">{dao.description}</div>
               

                </Card>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default ExploreSection;
