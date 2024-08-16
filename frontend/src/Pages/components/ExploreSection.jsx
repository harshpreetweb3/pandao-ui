import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import useViewStore from "@/store/view";
import axios from "axios";
import {
  Banknote,
  Building2,
  Check,
  Filter,
  GraduationCap,
  Users,
} from "lucide-react";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { SkeletonCard } from "../GlobalComponents/Skeleton";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { useAccount } from "@/AccountContext";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";

const ExploreSection = () => {
  const [data, setData] = useState([]);
  const { setView } = useViewStore();
  const { accounts } = useAccount();
  const [loading, setLoading] = useState(true);
  const [selectedOption, setSelectedOption] = useState("participants");
  const [open, setOpen] = useState(false);
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const navigate = useNavigate();
  useEffect(() => {
    const fetchBluePrint = async () => {
      try {
        const res = await axios.get(
          `${import.meta.env.VITE_BACKEND_URL}/community?sort=${selectedOption}`
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
  }, [setView, selectedOption]);
  const options = [
    { id: "participants", label: "Participants" },
    { id: "funds", label: "Funds" },
    { id: "name", label: "Name" },
  ];
  const handleOptionSelect = (optionId) => {
    setSelectedOption(optionId);
    setOpen(false);
  };
  const handleNavigation = (path) => {
    if (accounts && accounts.length > 0) {
      navigate(path);
    } else {
      setIsDialogOpen(true);
    }
  };
  // if (!accounts || accounts.length === 0 || !data) {
  //   navigate("/");
  //   return null;
  // }
  return (
    <div className="bg-slate-100 ">
      <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
        <DialogTrigger></DialogTrigger>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>You have not connected your Wallet</DialogTitle>
            <DialogDescription>
             Please connect your wallet your Radix Wallet
            </DialogDescription>
          </DialogHeader>
        </DialogContent>
      </Dialog>

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
                onClick={() => handleNavigation("/create")}
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
          <div className="flex items-center justify-between">
            <div className="text-3xl  font-semibold">Explore Top DAOs</div>
            <Popover open={open} onOpenChange={setOpen}>
              <PopoverTrigger className="bg-white p-2 rounded-md">
                <Filter className="" />
              </PopoverTrigger>
              <PopoverContent className="mr-[100px] p-2">
                {options.map((option) => (
                  <div
                    key={option.id}
                    onClick={() => handleOptionSelect(option.id)}
                    className={`flex items-center justify-between p-2 cursor-pointer hover:bg-gray-100 rounded-md ${
                      selectedOption === option.id ? "bg-gray-100" : ""
                    }`}
                  >
                    <span>{option.label}</span>
                    {selectedOption === option.id && (
                      <Check className="h-4 w-4 text-green-600" />
                    )}
                  </div>
                ))}
              </PopoverContent>
            </Popover>
          </div>
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
                      handleNavigation(`/community/detail/${dao.id}`);
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
                                <p className="text-sm">
                                  {" "}
                                  {dao.number_of_participants}{" "}
                                </p>{" "}
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
    </div>
  );
};

export default ExploreSection;
