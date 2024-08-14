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
import CommunityImageUrl from "@/Pages/components/CommunityImageUrl";
import TokenImageURL from "@/Pages/components/TokenImage";

const DescribeView = () => {
  const { setView } = useViewStore();
  const navigate = useNavigate();
  const { accounts } = useAccount();
  const { formFields, setFormFields } = useTokenWeightStore(); // Use the Zustand store
  const [data, setData] = useState([]);
  const handleUrlId = (id) => {
    const url = `https://ucarecdn.com/${id}/-/preview/1000x562/`;
    console.log("Received file URL:", url);
    setFormFields({ communityImage: url });
  };
  const handleTokenUrl = (id2) => {
    const url2 = `https://ucarecdn.com/${id2}/-/preview/1000x562/`;
    console.log("Received file URLsdsdsdsdsdsdsdsdsdsdsdsdsdsdsdsdsdsdS:", url2);
    setFormFields({ tokenImage: url2 });
  };
  useEffect(() => {
    if (accounts && accounts.length > 0) {
      setFormFields({ userAddress: accounts[0].address }); // Set the userAddress
    }
  }, [accounts, setFormFields]);
const handleViewChange=()=>{
    setView("4")
}
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
      formFields.tokenImage.trim() !== ""
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
            <div>Describe your DAO</div>
            <div>Step 2 of 3</div>
          </div>
          <Progress value={66} className="rounded-sm" />
        </div>

        <div className="text-4xl font-semibold">Describe your DAO</div>
        <div className="flex md:flex-row flex-col items-center justify-between gap-3">
          <span className="w-full">
            Start simple and learn as you go. You can always evolve your DAO in the future.
          </span>
        </div>
      </Card>
      <div className="max-w-[600px] mx-auto mt-5 flex flex-col gap-3">
        <div className="flex flex-col gap-1">
          <span className="font-medium text-lg px-1">Community Name</span>
          <span className="text-xs px-1">Keep it short and simple</span>
          <Input
            name="communityName"
            className="border-slate-300 focus:ring-1 focus:ring-purple-400"
            placeholder="Type your Communities name..."
            value={formFields.communityName}
            onChange={handleInputChange}
            required
          />
        </div>
        <div className="flex flex-col gap-1">
          <span className="font-medium text-lg px-1">Community Description</span>
          <span className="text-xs px-1">Keep it short and simple</span>
          <Textarea
            name="description"
            className="border-slate-300 focus:ring-1 focus:ring-purple-400"
            placeholder="Type your Communities description..."
            value={formFields.description}
            onChange={handleInputChange}
            required
          />
        </div>
        <div className="flex flex-col gap-1">
          <span className="font-medium text-lg px-1">Community Image URL</span>
          <div className="flex items-center ">
          <Input
            name="communityImage"
            className="border-slate-300 focus:ring-1 focus:ring-purple-400 rounded-r-none"
            placeholder="Type your Community Image URL..."
            value={formFields.communityImage}
            //onChange={handleInputChange}
            required
            disabled
          />
          <CommunityImageUrl onUploadSuccess={handleUrlId}/>
          </div>
  
        </div>
        <div className="flex flex-col gap-1">
          <span className="font-medium text-lg px-1">Token Image URL</span>
          <div className="flex items-center ">
          <Input
            name="tokenImage"
            className="border-slate-300 focus:ring-1 focus:ring-purple-400"
            placeholder="Type your Token Image URL..."
            value={formFields.tokenImage}
           //onChange={handleInputChange}
            required
            disabled
            
          />

<TokenImageURL onUploadComplete2={handleTokenUrl}/>
          </div>
         
        </div>
        <div className="flex items-center justify-between">
          <Button onClick={() => setView("2")}>Back</Button>
          <Button disabled={!allFieldsFilled()} onClick={handleViewChange}>
            Next
          </Button>
        </div>
      </div>
    </div>
  );
};

export default DescribeView;
