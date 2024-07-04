import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { useEffect, useState } from "react";
import { useAccount } from "@/AccountContext";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { Input } from "@/components/ui/input";
import useTokenWeightStore from "@/store/templateStore/tokenWeightStore";

import extractTransactionsData from "@/utils/TranscationsRecipt";
import { useSendTransaction } from "@/hooks/useSendTransaction";
import useModalStore from "@/store/modal";
import ReceiptModal from "@/Pages/components/ReceiptModal";
const DeployView = () => {
  const navigate = useNavigate();
  const { accounts } = useAccount();
  const { formFields, setFormFields, resetFormFields } = useTokenWeightStore();
  const [Recipt, setRecipt] = useState(null);
  const sendTransaction = useSendTransaction();
  const [manifest,setManifest]=useState("")
  const { successOpen,setSuccessOpen } = useModalStore();


  const [loading, setLoading] = useState(false);

  const [data, setData] = useState([]);

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
          {loading ?(<Button variant="radix" className="w-full" disabled>
            Deploying....
          </Button>) :( <Button variant="radix" className="w-full" disabled={!allFieldsFilled()} onClick={handleClaimToken}>
            Deploy
          </Button>)}
         
        </div>
      </div>
    </div>

    </>
 
  );
};

export default DeployView;
