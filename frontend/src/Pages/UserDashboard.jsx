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
import { useNavigate } from "react-router-dom";

const UserDashboard = () => {
  const { accounts } = useAccount();
  const navigate = useNavigate();

  if (!accounts || accounts.length === 0) {
    return null;
  }

  return (
    <div className="pt-20 relative flex flex-col items-center gap-3 justify-start min-h-screen  bg-[url('/bg.svg')]  bg-cover bg-black p-7">
      <Card className=" w-full flex items-center h-full mt-10 bg-gray-400 rounded-md bg-clip-padding backdrop-filter backdrop-blur-sm bg-opacity-30 border border-gray-100 max-w-[1440px]  ">
        <CardHeader>
          <Avatar className="h-40 w-40">
            <AvatarImage
              src="https://github.com/shadcn.png"
              className="h-40 w-40"
            />
            <AvatarFallback>CN</AvatarFallback>
          </Avatar>
        </CardHeader>
        <CardContent className="text-xl font-bold flex flex-col gap-2">
          <p className="bg-purple-400 p-2 rounded-lg flex flex-wrap">
            {accounts[0].address}
          </p>
          <p className="bg-purple-400 p-2 rounded-lg">{accounts[0].label}</p>
        </CardContent>
      </Card>
      <div className="px-2 w-full flex items-center justify-end max-w-[1440px]  ">
        <Button
          onClick={() => {
            navigate("/exploreDao");
          }}
          variant="outline"
          className="text-black"
        >
          Explore DAO
        </Button>
      </div>
    </div>
  );
};

export default UserDashboard;
