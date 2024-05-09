import { useAccount } from "@/AccountContext";
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
  const navigate=useNavigate()

  if (!accounts || accounts.length === 0) {
    return null;
  }

  return (
    <div className="pt-20 flex flex-col items-center gap-3 justify-start min-h-screen bg-[radial-gradient(ellipse_at_left,_var(--tw-gradient-stops))] from-[#281038] from-0% via-[#181734] via-50%  to-[#0D1E3B] to-100% text-white">
      <div className="px-10 w-full flex items-center justify-end">
        <Button onClick={()=>{
            navigate("/exploreDao")
        }} variant="outline" className="text-black">
          Explore DAO
        </Button>
      </div>
      <Card className="mx-10 w-1/2">
        <CardHeader>
          <CardTitle>User Details</CardTitle>
        </CardHeader>
        <CardContent>
          <p>{accounts[0].address}</p>
        </CardContent>
        <CardFooter>
          <p>{accounts[0].label}</p>
        </CardFooter>
      </Card>
    </div>
  );
};

export default UserDashboard;
