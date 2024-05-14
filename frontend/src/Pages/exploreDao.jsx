import { useAccount } from "@/AccountContext";
import { useNavigate } from "react-router-dom";

const daoData = {
  daoName: "Token Weighted DAO",
  description:
    "A decentralized autonomous organization that utilizes token-based voting for governance decisions.",
};

const ExploreDao = () => {
  const navigate = useNavigate();
  const { accounts } = useAccount();

  if (!accounts || accounts.length === 0) {
    navigate("/");
    return null;
  }

  return (
    <div className="pt-20 pb-10 grid grid-cols-3 items-start gap-3 justify-start min-h-screen bg-[radial-gradient(ellipse_at_left,_var(--tw-gradient-stops))] from-[#281038] from-0% via-[#181734] via-50%  to-[#0D1E3B] to-100% text-black px-2">
      <div
        onClick={() => {
          navigate("/deploy");
        }}
        className="bg-white shadow-md rounded-lg p-6 hover:bg-slate-200 cursor-pointer "
      >
        <h2 className="text-2xl font-bold mb-2">{daoData.daoName}</h2>
        <p className="text-gray-700 mb-4">{daoData.description}</p>
      </div>
    </div>
  );
};

export default ExploreDao;
