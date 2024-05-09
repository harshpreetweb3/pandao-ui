import { useAccount } from "@/AccountContext";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

const UserDashboard = () => {
  const { accounts } = useAccount();

  return (
    <div className="pt-20 min-h-screen bg-[radial-gradient(ellipse_at_left,_var(--tw-gradient-stops))] from-[#281038] from-0% via-[#181734] via-50%  to-[#0D1E3B] to-100% text-white">
      <Card className="mx-10">
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
