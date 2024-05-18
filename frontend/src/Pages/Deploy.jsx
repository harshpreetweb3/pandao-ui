import { useAccount } from "@/AccountContext";
import { Button } from "@/components/ui/button";
import { useSendTransaction } from "@/hooks/useSendTransaction";
import { useEffect, useState } from "react";
import { Input } from "@/components/ui/input";
import { useNavigate } from "react-router-dom";
import AgreementModal from "./components/AgreementModal";
import useModalStore from "@/store/modal";

import extractTransactionsData from "@/utils/TranscationsRecipt";
import ReceiptModal from "./components/ReceiptModal";

const InputField = ({ label, type, value, onChange }) => (
  <div className="flex flex-col items-start gap-2 justify-between w-full">
    <label className="font-semibold text-xl">{label}</label>
    <Input
      type={type}
      value={value}
      onChange={onChange}
      className="border-2 border-black  text-black w-full"
      required
    />
  </div>
);

function Deploy() {
  const { accounts } = useAccount();
  const navigate = useNavigate();

  const [loading, setLoading] = useState(false);
  const [Recipt, setRecipt] = useState(null);
  const sendTransaction = useSendTransaction();
  const { open, setOpen,setSuccessOpen } = useModalStore();
  const [organizationName, setOrganizationName] = useState("");
  const [numberOfTokens, setNumberOfTokens] = useState("");
  const [divisibility, setDivisibility] = useState("");
  const [tokenPrice, setTokenPrice] = useState("");
  const [buyBackPrice, setBuyBackPrice] = useState("");
  const [orgIconUrl, setOrgIconUrl] = useState("");
  const [tokenIconUrl, setTokenIconUrl] = useState("");
  const areFieldsFilled =
    organizationName &&
    numberOfTokens &&
    divisibility &&
    tokenPrice &&
    buyBackPrice &&
    orgIconUrl &&
    tokenIconUrl;
  //   const generateString = () => {
  //     return `CALL_FUNCTION
  // Address("package_tdx_2_1phqlaxx0lkkujrtsjk4ulpmd86rc8e929l90ytu7sgzyqlhl6w2zvg")
  // "TokenWeigtedDao"
  // "initiate"
  // "${organizationName}"
  // ${numberOfTokens}i32
  // ${divisibility}u8
  // Decimal("${tokenPrice}")
  // Decimal("${buyBackPrice}")
  // "${orgIconUrl}"
  // "${tokenIconUrl}"
  // ;
  // CALL_METHOD
  //     Address("${accounts[0].address}")
  //     "deposit_batch"
  //     Expression("ENTIRE_WORKTOP")
  // ;`;
  //   };

  const handleClaimToken = async () => {
    console.log("selectedAccount:", accounts[0].address);
    if (!accounts[0].address) {
      alert("Please select an account first.");
      return;
    }
    setLoading(true);

    let manifest = `CALL_FUNCTION
    Address("package_tdx_2_1pk55nren5qpvr5xsrn48lnkuym83lf6wjjeq3z2mqhpydvme6kh5ml")
    "TokenWeigtedDao"
    "initiate"
    "${organizationName}"
    ${numberOfTokens}i32
    ${divisibility}u8
    Decimal("${tokenPrice}")
    Decimal("${buyBackPrice}")
    "${orgIconUrl}"
    "${tokenIconUrl}"
    ;
    CALL_METHOD
        Address("${accounts[0].address}")
        "deposit_batch"
        Expression("ENTIRE_WORKTOP")
    ;`;

    const { receipt } = await sendTransaction(manifest).finally(() =>
      setLoading(false)
    );

    let txId = receipt.transaction.intent_hash;
    // create a transaction recipt
    const recipt = await extractTransactionsData(txId);
    if(receipt){
      setSuccessOpen(true)
    }
    setRecipt(() => recipt);
  };

  // useEffect(() => {
  //   setOpen(true);
  //   }, [setOpen]);
  if (!accounts || accounts.length === 0) {
    navigate("/");
    return null;
  }

  return (
    <>
      <AgreementModal />
      <ReceiptModal>
        
      {Recipt ? (
          <div className="w-full ">
            <Recipt className="w-full relative bg-red-500" />
          </div>
        ) : (
          ""
        )}
      </ReceiptModal>

      <div className="pt-10 pb-10 flex flex-col items-center gap-10 justify-center min-h-screen bg-[radial-gradient(ellipse_at_left,_var(--tw-gradient-stops))] from-[#281038] from-0% via-[#181734] via-50%  to-[#0D1E3B] to-100% text-black px-2">
        <h1 className="text-2xl font-semibold text-white pt-14">
          Radix Transaction Form
        </h1>

        <form className="text-black bg-clip-padding backdrop-filter backdrop-blur-sm bg-opacity-50 border border-gray-100 p-5 max-w-[1440px] mx-auto rounded-lg bg-white  grid md:grid-cols-2 grid-cols-1 gap-4 items-start w-full ">
          <div className="md:col-span-2">
            <InputField
              label="Organization Name:"
              type="text"
              value={organizationName}
              onChange={(e) => setOrganizationName(e.target.value)}
            />
          </div>

          <InputField
            label="Number of Tokens:"
            type="number"
            value={numberOfTokens}
            onChange={(e) => setNumberOfTokens(e.target.value)}
          />
          <InputField
            label="Divisibility:"
            type="number"
            value={divisibility}
            onChange={(e) => setDivisibility(e.target.value)}
          />
          <InputField
            label="Token Price:"
            type="text"
            value={tokenPrice}
            onChange={(e) => setTokenPrice(e.target.value)}
          />

          <InputField
            label="Buy Back Price:"
            type="text"
            value={buyBackPrice}
            onChange={(e) => setBuyBackPrice(e.target.value)}
          />

          <InputField
            label="Organization Icon URL:"
            type="text"
            value={orgIconUrl}
            onChange={(e) => setOrgIconUrl(e.target.value)}
          />
          <InputField
            label="Token Icon URL:"
            type="text"
            value={tokenIconUrl}
            onChange={(e) => setTokenIconUrl(e.target.value)}
          />

          <div className="w-full">
            <Button
              disabled={!areFieldsFilled || loading}
              className="w-1/2"
              onClick={() => handleClaimToken()}
            >
              Generate String
            </Button>
          </div>
        </form>
   
      </div>
    </>
  );
}

export default Deploy;
