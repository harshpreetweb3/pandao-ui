import { ArrowLeft } from "lucide-react";
import { useNavigate } from "react-router-dom";

const BackButton = () => {
  const navigate = useNavigate();
  return (
    <div className="text-white max-w-[1440px] mx-auto ">
      <div onClick={()=>navigate("/userDashboard")} className="ml-3 flex items-center gap-2 hover:text-slate-200 cursor-pointer w-20">
        <ArrowLeft className="h-4 w-4" />
        Back
      </div>
    </div>
  );
};

export default BackButton;
