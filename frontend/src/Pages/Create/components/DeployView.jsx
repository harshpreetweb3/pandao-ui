import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import useViewStore from "@/store/view";
import { Progress } from "@/components/ui/progress";
import { useEffect, useState } from "react";
import { useAccount } from "@/AccountContext";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import useTokenWeightStore from "@/store/templateStore/tokenWeightStore";

const DeployView = () => {
  const { setView } = useViewStore();
  const navigate = useNavigate();
  const { accounts } = useAccount();
  const { formFields, setFormFields } = useTokenWeightStore(); // Use the Zustand store
  const [data, setData] = useState([]);

  useEffect(() => {
    if (accounts && accounts.length > 0) {
      setFormFields({ userAddress: accounts[0].address }); // Set the userAddress
    }
  }, [accounts, setFormFields]);

  const handleDeploy = () => {
    console.log(formFields)
  };

  useEffect(() => {
    const fetchBluePrint = async () => {
      try {
        const res = await axios.get(
          `${import.meta.env.VITE_BACKEND_URL}/blueprint`
        );
        setData(res.data);
      } catch (error) {
        console.error("Error fetching blueprint data:", error);
      }
    };
    fetchBluePrint();
  }, []);

  if (!accounts || accounts.length === 0 || !data) {
    navigate("/");
    return null;
  }

  const allFieldsFilled = () => {
    return (
      formFields.communityName.trim() !== "" &&
      formFields.description.trim() !== "" &&
      formFields.communityImage.trim() !== "" &&
      formFields.tokenImage.trim() !== "" &&
      formFields.tokenSupply > 0 &&
      formFields.tokenPrice > 0 &&
      formFields.tokenWithDrawPrice > 0
    );
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormFields({ [name]: value });
  };

  return (
    <div className="max-w-[1000px] mx-auto mt-20">
      <Card className="bg-white text-black mt-10 p-12 flex flex-col gap-3 rounded-xl shadow-sm">
        <div className="mb-6 flex flex-col gap-2">
          <div className="flex items-center justify-between">
            <div>Deploy DAO</div>
            <div>Step 3 of 3</div>
          </div>
          <Progress value={100} className="rounded-sm" />
        </div>

        <div className="text-4xl font-semibold">Deploy your Community</div>
        <div className="flex md:flex-row flex-col items-center justify-between gap-3">
          <span className="w-full">
            Start simple and learn as you go. You can always evolve your DAO in the future.
          </span>
        </div>
      </Card>
      <div className="max-w-[600px] mx-auto mt-5 flex flex-col gap-3">
     
        <div className="flex flex-col gap-1">
          <span className="font-medium text-lg px-1">Token Supply</span>
          <Input
            type="number"
            name="tokenSupply"
            className="border-slate-300 focus:ring-1 focus:ring-purple-400"
            placeholder="Enter Token Supply"
            value={formFields.tokenSupply}
            onChange={handleInputChange}
            required
          />
        </div>
        <div className="flex flex-col gap-1">
          <span className="font-medium text-lg px-1">Token Price</span>
          <Input
            type="number"
            name="tokenPrice"
            className="border-slate-300 focus:ring-1 focus:ring-purple-400"
            placeholder="Enter Token Price"
            value={formFields.tokenPrice}
            onChange={handleInputChange}
            required
          />
        </div>
        <div className="flex flex-col gap-1">
          <span className="font-medium text-lg px-1">Token Withdraw Price</span>
          <Input
            type="number"
            name="tokenWithDrawPrice"
            className="border-slate-300 focus:ring-1 focus:ring-purple-400"
            placeholder="Enter Token Withdraw Price"
            value={formFields.tokenWithDrawPrice}
            onChange={handleInputChange}
            required
          />
        </div>
        <div className="flex items-center justify-between">
          <Button variant="radix" className="w-full" disabled={!allFieldsFilled()} onClick={handleDeploy}>
            Deploy
          </Button>
        </div>
      </div>
    </div>
  );
};

export default DeployView;
