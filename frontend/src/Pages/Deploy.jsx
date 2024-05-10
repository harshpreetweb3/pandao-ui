import { useAccount } from "@/AccountContext";
import { Button } from "@/components/ui/button";
import { useSendTransaction } from "@/hooks/useSendTransaction";
import { useState } from "react";
import { Input } from "@/components/ui/input";

function Deploy() {
  const { accounts } = useAccount();
  const [loading, setLoading] = useState(false);

  const sendTransaction = useSendTransaction();
  const [organizationName, setOrganizationName] = useState("");
  const [numberOfTokens, setNumberOfTokens] = useState("");
  const [divisibility, setDivisibility] = useState("");
  const [tokenPrice, setTokenPrice] = useState("");
  const [buyBackPrice, setBuyBackPrice] = useState("");
  const [orgIconUrl, setOrgIconUrl] = useState("");
  const [tokenIconUrl, setTokenIconUrl] = useState("");

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
    Address("package_tdx_2_1phqlaxx0lkkujrtsjk4ulpmd86rc8e929l90ytu7sgzyqlhl6w2zvg")
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
    console.log("transaction receipt:", receipt);
  };
  return (
    <div className="pt-20 pb-10 flex flex-col items-center gap-10 justify-center min-h-screen bg-[radial-gradient(ellipse_at_left,_var(--tw-gradient-stops))] from-[#281038] from-0% via-[#181734] via-50%  to-[#0D1E3B] to-100% text-black px-2">
      <h1>Radix Transaction Form</h1>

      <form className="text-black p-5 rounded-lg bg-white  flex flex-col gap-5 items-start">
        <div className="flex flex-col justify-between">
          <label>Organization Name:</label>
          <Input />

          <input
            type="text"
            value={organizationName}
            className="border-2 border-black rounded-lg ml-10 text-black"
            onChange={(e) => setOrganizationName(e.target.value)}
          />
        </div>
        {/* <div>
          <label>Number of Tokens:</label>
          <input
            type="number"
            value={numberOfTokens}
            className="border-2 border-black rounded-lg ml-10 text-black"
            onChange={(e) => setNumberOfTokens(e.target.value)}
          />
        </div>
        <div>
          <label>Divisibility:</label>
          <input
            type="number"
            value={divisibility}
            className="border-2 border-black rounded-lg ml-10 text-black"
            onChange={(e) => setDivisibility(e.target.value)}
          />
        </div>
        <div>
          <label>Token Price:</label>
          <input
            type="text"
            value={tokenPrice}
            className="border-2 border-black rounded-lg ml-10 text-black"
            onChange={(e) => setTokenPrice(e.target.value)}
          />
        </div>
        <div>
          <label>Buy Back Price:</label>
          <input
            type="text"
            value={buyBackPrice}
            className="border-2 border-black rounded-lg ml-10 text-black"
            onChange={(e) => setBuyBackPrice(e.target.value)}
          />
        </div>
        <div>
          <label>Organization Icon URL:</label>
          <input
            type="text"
            value={orgIconUrl}
            className="border-2 border-black rounded-lg ml-10 text-black"
            onChange={(e) => setOrgIconUrl(e.target.value)}
          />
        </div>
        <div>
          <label>Token Icon URL:</label>
          <input
            type="text"
            value={tokenIconUrl}
            className="border-2 border-black rounded-lg ml-10 text-black"
            onChange={(e) => setTokenIconUrl(e.target.value)}
          />
        </div> */}

        <div>
          <Button type="button" onClick={() => handleClaimToken()}>
            Generate String
          </Button>
        </div>
      </form>
    </div>
  );
}

export default Deploy;
