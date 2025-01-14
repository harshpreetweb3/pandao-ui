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
import { Select as Select2, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import Select from 'react-select';  // Import react-select

const DescribeView = () => {
  const { setView } = useViewStore();
  const navigate = useNavigate();
  const { accounts } = useAccount();
  const { formFields, setFormFields } = useTokenWeightStore(); 
  const [data, setData] = useState([]);
  
  const predefinedTags = [
    { value: 'blockchain', label: 'Blockchain' },
    { value: 'web3', label: 'Web3' },
    { value: 'nft', label: 'NFT' },
    { value: 'defi', label: 'DeFi' },
    { value: 'community', label: 'Community' },
    // Add more tags as needed
  ];

  const handleUrlId = (id) => {
    const url = `https://ucarecdn.com/${id}/-/preview/1000x562/`;
    setFormFields({ communityImage: url });
  };

  const handleTokenUrl = (id2) => {
    const url2 = `https://ucarecdn.com/${id2}/-/preview/1000x562/`;
    setFormFields({ tokenImage: url2 });
  };

  useEffect(() => {
    if (accounts && accounts.length > 0) {
      setFormFields({ userAddress: accounts[0].address }); // Set the userAddress
    }
  }, [accounts, setFormFields]);

  const handleViewChange = () => {
    setView("4");
  };

  useEffect(() => {
    const fetchBluePrint = async () => {
      try {
        const res = await axios.get(`${import.meta.env.VITE_BACKEND_URL}/blueprint`);
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
      formFields.purpose.trim() !== "" &&
      formFields.tags && formFields.tags.length > 0 // Ensure tags are selected
    );
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormFields({ [name]: value });
  };

  const handleDaoPurposeChange = (value) => {
    setFormFields({ purpose: value });
  };

  const handleTagsChange = (selectedTags) => {
    const labels = selectedTags.map(tag => tag.label);
    // console.log(labels);
    setFormFields({ tags: labels });
  };
  const selectedTags = formFields.tags ? formFields.tags.map(label => 
    predefinedTags.find(tag => tag.label === label)
  ).filter(tag => tag) : [];
  return (
    <div className="max-w-[1000px] mx-auto mt-20">
      <Card className="bg-white relative z-40 text-black mt-10 p-12 flex flex-col gap-3 rounded-xl shadow-sm">
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
      <div className="max-w-[600px] mx-auto mt-2 flex flex-col gap-3 relative z-40 bg-white p-5 rounded-lg shadow-lg">
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
          <span className="font-medium text-lg px-1">What is the purpose of creating this DAO. </span>
          <Select2 onValueChange={handleDaoPurposeChange}>
            <SelectTrigger className="w-full">
              <SelectValue placeholder="Select the purpose" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="governance">Governance</SelectItem>
              <SelectItem value="communityBuilding">Community Building</SelectItem>
              <SelectItem value="fundraising">Fundraising</SelectItem>
              <SelectItem value="socialImpact">Social Impact</SelectItem>
            </SelectContent>
          </Select2>
        </div>
        <div className="flex flex-col gap-1">
          <span className="font-medium text-lg px-1">Community Image URL</span>
          <div className="flex items-center ">
            <Input
              name="communityImage"
              className="border-slate-300 focus:ring-1 focus:ring-purple-400 rounded-r-none"
              placeholder="Type your Community Image URL..."
              value={formFields.communityImage}
              required
              disabled
            />
            <CommunityImageUrl onUploadSuccess={handleUrlId} />
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
              required
              disabled
            />
            <TokenImageURL onUploadComplete2={handleTokenUrl} />
          </div>
        </div>
        <div className="flex flex-col gap-1">
          <span className="font-medium text-lg px-1">Tags</span>
          <Select
            isMulti
            name="tags"
            options={predefinedTags}
            className="basic-multi-select"
            classNamePrefix="select"
            value={selectedTags}
            onChange={handleTagsChange}
            placeholder="Select tags..."
          />
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
