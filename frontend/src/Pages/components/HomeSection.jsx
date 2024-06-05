import { useAccount } from "@/AccountContext";
import { Button } from "../../components/ui/button";
import { useNavigate } from "react-router-dom";

const HomeSection = () => {
  const { accounts } = useAccount();
  const navigate = useNavigate();

  return (
    <div className="bg-[#3164fa] ">
      <div className="h-[500px] flex items-start  justify-start  text-white max-w-[1000px] mx-auto">
        <div className="flex flex-col  items-start  gap-5 justify-center  p-5 w-full h-full object-cover bg-no-repeat md:bg-none">
          <div className="text-5xl font-semibold tracking-wider leading-[55px] ">
            Bringing Governance to All: Effortless, Effective, Empowering.
          </div>
          <p className="text-xl">
            Making Blockchain Accessible and DAO Governance Effortless.
          </p>
          {!accounts || accounts.length === 0 ? (
            <Button className="bg-green-700">Get Started</Button>
          ) : (
            <Button
              onClick={() => navigate("/userDashboard")}
              className="bg-green-700"
            >
              User Dashboard
            </Button>
          )}
        </div>
     
      </div>
    </div>
  );
};

export default HomeSection;
