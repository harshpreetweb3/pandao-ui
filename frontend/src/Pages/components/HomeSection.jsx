import { useAccount } from "@/AccountContext";
import { Button } from "../../components/ui/button";
import { useNavigate } from "react-router-dom";


const HomeSection = () => {
  const { accounts } = useAccount();
  const navigate = useNavigate();



  return (
    <div className="bg-gradient-to-r from-[#375e91] from-0%  to-[#68237b]">
      <div className="h-[500px] flex items-start  justify-start  text-white max-w-[1200px] mx-auto">
        <div className="flex flex-col  items-start  gap-5 justify-center  p-5 w-full h-full object-cover bg-no-repeat md:bg-none">
          <div className="md:text-5xl text-3xl font-semibold tracking-wider md:leading-[55px] leading-[40px] ">
            Bringing Governance to All: Effortless, Effective, Empowering.
          </div>
          <p className="text-xl">
            Making Blockchain Accessible and DAO Governance Effortless.
          </p>
          {!accounts || accounts.length === 0 ? (
            <Button   variant="radix">Get Started</Button>
          ) : (
            <Button
              onClick={() => navigate("/userDashboard")}
             variant="radix"
            >
              My Dashboard
            </Button>
          )}
        </div>
     
      </div>
    </div>
  );
};

export default HomeSection;
