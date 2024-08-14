import { useAccount } from "@/AccountContext";
import { useNavigate } from "react-router-dom";
import {
    Tooltip,
    TooltipContent,
    TooltipProvider,
    TooltipTrigger,
  } from "@/components/ui/tooltip";
import { useEffect, useState } from "react";
import useViewStore from "@/store/view";
import axios from "axios";
import { SkeletonCard } from "./GlobalComponents/Skeleton";
import { Card } from "@/components/ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Banknote, Users } from "lucide-react";
const ExploreAllDao = () => {
    const { accounts } = useAccount();
    const navigate = useNavigate();

    const [data, setData] = useState([]);
    const [loading, setLoading] = useState(true);
    useEffect(() => {
        const fetchBluePrint = async () => {
          try {
            const res = await axios.get(
              `${import.meta.env.VITE_BACKEND_URL}/community/all`
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
    if (!accounts || accounts.length === 0) {
        navigate("/");
        return null;
      }
    return ( 
    <div className="bg-blue-50">
    <div className="min-h-screen pt-20 max-w-[1440px] mx-auto ">
        <div className="px-2 mt-2 text-3xl font-semibold">
            Explore all DAOs
        </div>
        {!loading && data.length === 0 && (
            <div className="flex items-center justify-center bg-white mt-3 h-32 rounded-lg shadow-xl">
              No Deployed DAOs
            </div>
          )}
          {loading ? (
            <div className="mt-5 grid md:grid-cols-3 grid-cols-1 gap-3">
              <SkeletonCard />
              <SkeletonCard /> <SkeletonCard /> <SkeletonCard />{" "}
              <SkeletonCard /> <SkeletonCard />
            </div>
          ) : (
            <div className="mt-5 grid md:grid-cols-3 grid-cols-1 gap-4 px-2 pb-10">
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
                              <p className="text-sm"> {dao.number_of_participants} </p>{" "}
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
                              <p className="text-sm"> {dao.funds || 0} </p>{" "}
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
 );
}
 
export default ExploreAllDao;