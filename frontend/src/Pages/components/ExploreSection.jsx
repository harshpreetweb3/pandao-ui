import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import useViewStore from "@/store/view";
import axios from "axios";
import { Banknote, Building2, GraduationCap, Users } from "lucide-react";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { SkeletonCard } from "../GlobalComponents/Skeleton";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";

const ExploreSection = () => {
  const [data, setData] = useState([]);
  const { setView } = useViewStore();
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();
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
    setView("1");
    fetchBluePrint();
  }, [setView]);
  return (
    <div className="bg-slate-100 ">
      <div className=" flex flex-col items-start p-3 md:p-0  justify-start   -translate-y-24 mx-auto max-w-[1200px]">
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
              <Button
                onClick={() => {
                  navigate("/create");
                }}
                variant="radix"
              >
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
              <Button onClick={() => navigate("/resources")} variant="radix">
                Learn about DAOs
              </Button>
            </div>
          </Card>
        </div>
        <div className=" mt-14 w-full">
          <div className="text-3xl  font-semibold">Explore Top DAOs</div>
          {!loading && data.length === 0 && (
            <div className="flex items-center justify-center bg-white mt-3 h-32 rounded-lg shadow-xl">
              No Deployed DAOs
            </div>
          )}
          {loading ? (
            <div className="mt-5 grid md:grid-cols-2 grid-cols-1 gap-3">
              <SkeletonCard />
              <SkeletonCard /> <SkeletonCard /> <SkeletonCard />{" "}
              <SkeletonCard /> <SkeletonCard />
            </div>
          ) : (
            <div className="mt-5 grid md:grid-cols-2 grid-cols-1 gap-4 ">
              {data.length > 0 &&
                data.map((dao, index) => (
                  <Card
                    key={index}
                    onClick={() => {
                      navigate(`/community/detail/${dao.id}`);
                    }}
                    className="flex overflow-hidden flex-col items-start justify-between p-5 h-[180px] cursor-pointer hover:shadow-md ga "
                  >
                    <div className="flex items-start gap-">
                      <div className="h-16 w-16">
                        <Avatar className="h-14 w-14">
                          <AvatarImage
                            src={dao.image}
                            alt="@shadcn"
                            className="h-14 w-14"
                          />
                          <AvatarFallback className="h-14 w-14">
                            CN
                          </AvatarFallback>
                        </Avatar>
                      </div>
                      <div>
                        <div className="text-xl font-semibold">{dao.name}</div>
                        {/* <div className="text-sm font-semibold">{dao.owner.name}</div> */}
                      </div>
                    </div>
                    <div className="line-clamp-2">{dao.description}</div>
                    <div className="flex items-center justify-start w-full mt-1">
                      <div className="flex items-center  gap-2 ">
                        <div className="flex items-center gap-2 border-2 px-2 rounded-md shadow-sm ">
                          <TooltipProvider>
                            <Tooltip>
                              <TooltipTrigger className="flex items-center gap-1">
                              <Users className="h-4 w-4" />{" "}
                              <p> {dao.number_of_participants} </p>{" "}
                              </TooltipTrigger>
                              <TooltipContent side="bottom">
                                <p>Total Number of Participant</p>
                              </TooltipContent>
                            </Tooltip>
                          </TooltipProvider>
                        
                        </div>
                        <div className="flex items-center gap-2   border-2 px-2 rounded-md shadow-sm ">
                          {" "}
                          <TooltipProvider>
                            <Tooltip>
                              <TooltipTrigger className="flex items-center gap-1">
                              <Banknote className="h-4 w-4" />{" "}
                              <p> {dao.fund || 0} </p>{" "}
                              </TooltipTrigger>
                              <TooltipContent side="bottom">
                                <p>Total Funds</p>
                              </TooltipContent>
                            </Tooltip>
                          </TooltipProvider>
                        
                        </div>
                      </div>
                    </div>
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
