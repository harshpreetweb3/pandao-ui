import { useAccount } from "@/AccountContext";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import axios from "axios";
import { Check, Copy } from "lucide-react";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

const UserDashboard = () => {
  const { accounts } = useAccount();
  const [copied, setCopied] = useState(false);
  const navigate = useNavigate();
  const handleCopy = (address) => {
    navigator.clipboard.writeText(address);
    setCopied(true);
    setTimeout(() => {
      setCopied(false);
    }, 1000);
  };
  const [data, setData] = useState([]);

  useEffect(() => {
    const fetchBluePrint = async () => {
      try {
        const res = await axios.get(
          `https://pandao-backend.onrender.com/community`
        );
        setData(res.data);
      } catch (error) {
        console.error("Error fetching blueprint data:", error);
      }
    };
    fetchBluePrint();
  }, []);
  if (!accounts || accounts.length === 0) {
    navigate("/");
    return null;
  }
  console.log(data)
  return (
    <div className="pt-20 relative flex  items-start gap-3 justify-start min-h-screen  bg-[radial-gradient(ellipse_at_left,_var(--tw-gradient-stops))] from-[#281038] from-0% via-[#181734] via-50%  to-[#0D1E3B] to-100% p-7">
      <div className="max-w-[1440px] flex md:flex-row flex-col w-full mx-auto gap-2">
        <Card className=" md:w-[20%] flex flex-col items-center h-full mt-10 bg-gray-400 rounded-md bg-clip-padding backdrop-filter backdrop-blur-sm bg-opacity-30  max-w-[1440px]  ">
          <CardHeader>
            <Avatar className="h-40 w-40">
              <AvatarImage
                src="https://github.com/shadcn.png"
                className="h-40 w-40"
              />
              <AvatarFallback>CN</AvatarFallback>
            </Avatar>
          </CardHeader>
          <CardContent className="text-xl font-bold flex flex-col gap-2 w-full">
            <div
              className="bg-purple-400 py-1 px-2 rounded-lg flex flex-wrap text-ellipsis overflow-hidden relative group"
              style={{ maxWidth: "100%" }}
            >
              <TooltipProvider>
                <Tooltip>
                  <TooltipTrigger> {accounts[0].address}</TooltipTrigger>
                  <TooltipContent>
                    {accounts[0].address}

                  </TooltipContent>
                </Tooltip>
              </TooltipProvider>
              <button
                onClick={() => handleCopy(accounts[0].address)}
                disabled={copied}
                className="py-0 bg-purple-500 text-white rounded-md px-2  h-6 text-xs absolute top-2 right-2 group-hover:block hidden "
              >
                {copied ? (
                  <Check className="h-4 w-4" />
                ) : (
                  <Copy className="h-4 w-4" />
                )}
              </button>
            </div>

            <p className="bg-purple-400 p-2 rounded-lg">{accounts[0].label}</p>
          </CardContent>
        </Card>
        <div className=" md:w-[80%] mt-10 flex flex-col items-center justify-start ">
          <div className="flex gap-2 items-center justify-end w-full border-b-2 border-gray-500 pb-3">
            {/* <Button
              onClick={() => {
                navigate("/myCommunities");
              }}
              variant="outline"
              className="text-white bg-purple-600"
            >
              My Communities
            </Button> */}
            <Button
              onClick={() => {
                navigate("/exploreDao");
              }}
              variant="outline"
              className="text-white bg-purple-600"
            >
              Explore DAO
            </Button>
          </div>
          <div>
            {data.length == 0 &&
              <Card className=" w-full flex flex-col items-center p-5 text-xl font-bold  mt-2 bg-gray-200 rounded-md bg-clip-padding backdrop-filter backdrop-blur-sm bg-opacity-30  max-w-[1440px]  ">
                Currently there is no Activity by User
              </Card>
            }
            <div className="grid grid-cols-1  gap-6">
              {data.map((item) => (
                <div key={item.id} className="bg-white p-6 rounded-lg shadow-md overflow-hidden">
                  <h3 className="text-xl font-semibold mb-2">{item.name}</h3>
                  <p className="text-gray-700"><span className="font-bold">Description:</span> {item.description}</p>
                  <p className="text-gray-700"><span className="font-bold">Component Address:</span> {item.component_address}</p>
                  <p className="text-gray-700"><span className="font-bold">Owner Address:</span> {item.owner_address}</p>
                  <p className="text-gray-700"><span className="font-bold">Owner Name:</span> {item.owner.name}</p>
                  <p className="text-gray-700"><span className="font-bold">Owner Public Address:</span> {item.owner.public_address}</p>
                  <hr className="mt-4" />
                </div>
              ))}
            </div>
          </div>

        </div>
      </div>
    </div>
  );
};

export default UserDashboard;
