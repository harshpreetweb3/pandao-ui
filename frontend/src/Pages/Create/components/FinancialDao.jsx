import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { useEffect, useState } from "react";
import { useAccount } from "@/AccountContext";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { Input } from "@/components/ui/input";
import useTokenWeightStore from "@/store/templateStore/tokenWeightStore";
import { Select as Select2, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";

import extractTransactionsData from "@/utils/TranscationsRecipt";
import { useSendTransaction } from "@/hooks/useSendTransaction";
import useModalStore from "@/store/modal";
import ReceiptModal from "@/Pages/components/ReceiptModal";
import { Textarea } from "@/components/ui/textarea";
import TokenImageURL from "@/Pages/components/TokenImage";
import Select from 'react-select';  // Import react-select
import CommunityImageUrl from "@/Pages/components/CommunityImageUrl";

const FinancialView = () => {
  const navigate = useNavigate();
  const { accounts } = useAccount();
  const { formFields, setFormFields, resetFormFields } = useTokenWeightStore();
  const [Recipt, setRecipt] = useState(null);
  const sendTransaction = useSendTransaction();
  const [manifest,setManifest]=useState("")
  const { successOpen,setSuccessOpen } = useModalStore();


  const [loading, setLoading] = useState(false);

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
  const handleClaimToken = async () => {
    console.log("selectedAccount:", accounts[0].address);
    if (!accounts[0].address) {
      alert("Please select an account first.");
      return;
    }
    setLoading(true);

    try {
      const response = await axios.post(
        `${import.meta.env.VITE_BACKEND_URL}/manifest/build/deploy_token_weighted_dao`,
        formFields,
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      );
      console.log(response.data);
      setManifest(response.data)
    } catch (error) {
      window.alert(error);
    }
    

    const { receipt } = await sendTransaction(manifest).finally(() =>
      setLoading(false)
    );

    let txId = receipt.transaction.intent_hash;
    if (txId) {
      try {
        const response = await axios.post(
          `${import.meta.env.VITE_BACKEND_URL}/submit-tx`,
          {
            tx_id: txId,
            user_address: accounts[0].address,
          },
          {
            headers: {
              "Content-Type": "application/json",
            },
          }
        );
        console.log(response.data);
      } catch (error) {
        window.alert(error);
      }
    }
      
      

    // create a transaction recipt
    const recipt = await extractTransactionsData(txId);
    console.log(receipt);
    if (receipt) {
      setSuccessOpen(true);

      // also send community registrartion data
      // let communityPostBody = {
      //   name: organizationName,
      //   component_address: "not defined",
      //   description: organizationDescription,
      //   owner_address: accounts[0].address,
      // };
      // try {
      //   const response = await axios.post(
      //     `${import.meta.env.VITE_BACKEND_URL}/community`,
      //     communityPostBody,
      //     {
      //       headers: {
      //         "Content-Type": "application/json",
      //       },
      //     }
      //   );
      // } catch (error) {
      //   window.alert(error);
      // }
    }
    setRecipt(() => recipt);
  };

  const handleDeploy = () => {
    console.log(formFields)
resetFormFields()
navigate("/");
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
  const handleTagsChange = (selectedTags) => {
    setFormFields({ tags: selectedTags });
  };
  const handleDaoPurposeChange = (value) => {
    setFormFields({ daoPurpose: value });
  };
  return (

    <>    
     <ReceiptModal>
    {Recipt ? (
      <div className="w-full ">
        <Recipt className="w-full relative bg-red-500" />
      </div>
    ) : (
      ""
    )}
  </ReceiptModal>
  <div className="max-w-[1000px] mx-auto mt-20">
      {/* <Card className="bg-white relative z-40 text-black mt-10 p-12 flex flex-col gap-3 rounded-xl shadow-sm">
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
      </Card> */}
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
              <SelectItem value="investment
">Investment
              </SelectItem>
              <SelectItem value="insurance">insurance
              </SelectItem>
              <SelectItem value="lending">Lending and Borrowing</SelectItem>
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
            value={formFields.tags}
            onChange={handleTagsChange}
            placeholder="Select tags..."
          />
        </div>
        <div className="flex items-center justify-between">
          <Button disabled={!allFieldsFilled()}>
            Sumbit
          </Button>
        </div>
      </div>
    </div>

    </>
 
  );
};

export default FinancialView;
