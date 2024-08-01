import { useAccount } from "@/AccountContext";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import AvatarCircles from "@/components/ui/myComponents/avatarCircle";
import { clipAddress } from "@/utils/functions/ClipAddress";
import axios from "axios";
import {
  Bitcoin,
  Check,
  ChevronRight,
  Contact,
  Copy,
  Users,
} from "lucide-react";
import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { toast } from "sonner";
import { useSendTransaction } from "@/hooks/useSendTransaction";
import extractTransactionsData from "@/utils/GetTransactionRecipt";
import { PieChart } from "react-minimal-pie-chart";
import {
  Dialog,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Label } from "@radix-ui/react-label";
import { Input } from "@/components/ui/input";
import useCustomAlertStore from "@/store/customAlertStore";
import { CustomAlert } from "./GlobalComponents/CustomAlert";

function removeNewLines(input) {
  return input.replace(/\n\s*/g, " ");
}

const CommunityDetails = () => {
  const { accounts } = useAccount();
  const [openBuyModal, setBuyModal] = useState(false);
  const [openSellModal, setSellModal] = useState(false);
  const { setOpen, setText } = useCustomAlertStore();

  const navigate = useNavigate();
  const params = useParams();
  const [data, setData] = useState([]);
  const [participants, setParticipants] = useState([]);
  const [communities, setCommunities] = useState([]);
  const [copied, setCopied] = useState(false);
  const sendTransaction = useSendTransaction();
  const [loading, setLoading] = useState(false);
  const [manifest, setManifest] = useState("");
  const [token, setToken] = useState(0);
  const handleCopy = (address) => {
    navigator.clipboard.writeText(address);
    setCopied(true);
    setTimeout(() => {
      setCopied(false);
    }, 1000);
  };
  const handleJoinCommunity = async () => {
    const data = {
      community_id: params.id,
      participant_address: accounts[0].address,
    };

    try {
      const response = await axios.post(
        `${import.meta.env.VITE_BACKEND_URL}/community/participant`,
        data
      );
      console.log("Response:", response.data);
      toast.success("Welcome to the Community");
      fetchParticipant();
    } catch (error) {
      console.log("Error joining community:", error);
      toast.error("Something went wrong");
    }
  };
  // const handleClaimToken = async () => {
  //   console.log("selectedAccount:", accounts[0].address);
  //   if (!accounts[0].address) {
  //     alert("Please select an account first.");
  //     return;
  //   }

  //   try {
  //     const response = await axios.post(
  //       `${import.meta.env.VITE_BACKEND_URL}/manifest/build/deploy_token_weighted_dao`,
  //       formFields,
  //       {
  //         headers: {
  //           "Content-Type": "application/json",
  //         },
  //       }
  //     );
  //     console.log(response.data);
  //     setManifest(response.data)
  //   } catch (error) {
  //     window.alert(error);
  //   }

  //   const { receipt } = await sendTransaction(manifest).finally(() =>
  //     setLoading(false)
  //   );

  //   let txId = receipt.transaction.intent_hash;
  //   if (txId) {
  //     try {
  //       const response = await axios.post(
  //         `${import.meta.env.VITE_BACKEND_URL}/submit-tx`,
  //         {
  //           tx_id: txId,
  //           user_address: accounts[0].address,
  //         },
  //         {
  //           headers: {
  //             "Content-Type": "application/json",
  //           },
  //         }
  //       );
  //       console.log(response.data);
  //     } catch (error) {
  //       window.alert(error);
  //     }
  //   }

  //   // create a transaction recipt
  //   const recipt = await extractTransactionsData(txId);
  //   console.log(recipt);

  // };

  const handleBuyToken = async () => {
    const data = {
      community_id: params.id,
      userAddress: accounts[0].address,
      tokenSupply: token,
    };

    try {
      setLoading(true);
      const response = await axios.post(
        `${
          import.meta.env.VITE_BACKEND_URL
        }/manifest/build/buy_token/token_weighted_dao`,
        data
      );
      console.log("Response:", removeNewLines(response.data.trim("")));
      setManifest(response.data);
    } catch (error) {
      console.log("Error joining community:", error);
      toast.error("Something went wrong");
      setText("Please join the community");
      setOpen(true);
      setLoading(false);
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
        toast.success("Token Bought");
        setText("Token Bought");
        setOpen(true);
        setBuyModal(false);
        setLoading(false);
      } catch (error) {
        window.alert(error);
      }
    }
  };
  const handleSellToken = async () => {
    const data = {
      community_id: params.id,
      userAddress: accounts[0].address,
      tokenSupply: token,
    };

    try {
      setLoading(true);
      const response = await axios.post(
        `${
          import.meta.env.VITE_BACKEND_URL
        }/manifest/build/sell_token/token_weighted_dao`,
        data
      );
      console.log("Response:", removeNewLines(response.data.trim("")));
      setManifest(response.data);
    } catch (error) {
      console.log("Error joining community:", error);
      toast.error("Something went wrong");
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
        toast.success("Token Sold");
        setText("Token Sold");
        setOpen(true);
        setSellModal(false);
        setLoading(false);
      } catch (error) {
        window.alert(error);
      }
    }
  };
  const fetchDetails = async () => {
    try {
      const res = await axios.get(
        `${import.meta.env.VITE_BACKEND_URL}/community/detail/${params.id}`
      );
      setData(res.data);
    } catch (error) {
      console.error("Error fetching blueprint data:", error);
    }
  };
  const fetchParticipant = async () => {
    try {
      const res = await axios.get(
        `${import.meta.env.VITE_BACKEND_URL}/community/participant/${params.id}`
      );
      setParticipants(res.data);
    } catch (error) {
      console.error("Error fetching blueprint data:", error);
    }
  };
  const fetchComments = async () => {
    try {
      const res = await axios.get(
        `${import.meta.env.VITE_BACKEND_URL}/community/discussion/${params.id}`
      );
      setCommunities(res.data);
    } catch (error) {
      console.error("Error fetching blueprint data:", error);
    }
  };
  useEffect(() => {
    fetchDetails();
    fetchParticipant();
    fetchComments();
  }, [params.id]);

  if (!accounts || accounts.length === 0) {
    navigate("/");
    return null;
  }
  const isUserParticipant = participants.some(
    (participant) => participant.participant === accounts[0].address
  );
  return (
    <div className="pt-20 pb-10 items-start gap-3 justify-start min-h-screen overflow-hidden bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-blue-50 to-purple-50 text-black px-2">
      <CustomAlert />
      <div className="flex md:flex-row flex-col gap-6 px-4 md:px-6 py-8 md:py-12 max-w-[1440px] mx-auto ">
        {data && (
          <div className="space-y-6 md:w-[100%] ">
            <Card className="bg-white md:w-[90%] mx-auto md:p-5 p-6 shadow-lg flex  md:flex-row flex-col gap-3">
              <Avatar className="h-28 w-28 border-[5px] border-purple-400">
                <AvatarImage
                  src={data.image}
                  className="h-28 w-28 object-cover"
                />
                <AvatarFallback>CN</AvatarFallback>
              </Avatar>
              <div className="w-full">
                <div className="flex md:flex-row flex-col items-center justify-between gap-5">
                  <h1 className="text-3xl font-bold text-left w-full">
                    {data.name}
                  </h1>
                  <div className="flex items-end md:items-start md:justify-end w-full gap-2">
                    {!isUserParticipant && (
                      <Button variant="radix" onClick={handleJoinCommunity}>
                        Join Community
                      </Button>
                    )}
                  </div>
                </div>
                <div className="grid gap-4">
                  <div>
                    <h2 className="text-xl font-semibold">
                      Community Overview
                    </h2>
                    <p className=" mt-2">{data.description}</p>
                  </div>
                  <div>
                    <h2 className="text-md font-semibold">Owner Name</h2>
                    <p className="text-gray-800 dark:text-gray-400 mt-2">
                      {data.owner?.name || "N/A"}
                    </p>
                  </div>
                  <div>
                    <h2 className="text-md font-semibold">Owner Address</h2>
                    <div className="flex items-center  gap-2">
                      <p className="text-gray-900 dark:text-gray-400 mt-2 text-ellipsis overflow-hidden">
                        {clipAddress(data.owner_address || "N/A")}
                      </p>
                      <p
                        className="cursor-pointer"
                        onClick={() => handleCopy(data.owner_address)}
                      >
                        {copied ? (
                          <Check className="h-4 w-4" />
                        ) : (
                          <Copy className="h-4 w-4" />
                        )}
                      </p>
                    </div>
                  </div>
                  <div>
                    <h2 className="text-md font-semibold">Component Address</h2>
                    <p className="text-gray-900 dark:text-gray-400 mt-2">
                      {data.component_address || "N/A"}
                    </p>
                  </div>
                </div>
              </div>
            </Card>
            <div className="flex md:flex-row flex-col md:w-[90%] mx-auto gap-2">
              <div className="md:w-[60%] space-y-3">
                <Card className="bg-white md:w-[100%] mx-auto md:p-4 p-4 shadow-lg flex items-center justify-between ">
                  <div>Total Proposals</div>
                  <div className="flex items-center gap-2">
                    <div
                      onClick={() =>
                        navigate(`/community/detail/${params.id}/proposals`)
                      }
                      className="bg-purple-600 shadow-lg min-w-28 flex items-center justify-center rounded-lg text-white py-1 px-2 cursor-pointer "
                    >
                      New Proposal
                    </div>
                  </div>
                </Card>
                <Card className="bg-white md:w-[100%] mx-auto md:p-4 p-4 shadow-lg flex items-center justify-between ">
                  <div>Total Funds</div>
                  <div className="bg-purple-600 shadow-lg min-w-28 flex items-center justify-center rounded-lg text-white p-1">
                    {data.funds} XRD
                  </div>
                </Card>
                <Card className="bg-white md:w-[100%] mx-auto md:p-4 p-4 shadow-lg ">
                  {communities.length === 0 && (
                    <div className="flex items-center justify-center">
                      No active discussions
                    </div>
                  )}
                  {communities.length > 0 && (
                    <div className="grid md:grid-cols-2 grid-cols-1 gap-4">
                      {communities.map((community, index) => (
                        <Card
                          key={index}
                          onClick={() =>
                            navigate(`/community/detail/${params.id}/discussion`)
                          }
                          className="p-4 flex flex-col gap-2 hover:shadow-lg shadow-md cursor-pointer"
                        >
                          <div className="text-lg font-semibold">
                            {community.title}
                          </div>
                          <div className="text-sm flex items-center gap-2">
                            <div>Started By - </div>
                            <div className="flex items-center gap-1">
                              <div>
                                <Avatar className="h-6 w-6">
                                  <AvatarImage src={community.user_image} />
                                  <AvatarFallback>CN</AvatarFallback>
                                </Avatar>
                              </div>
                              <div>{community.user_name}</div>
                            </div>
                          </div>
                        </Card>
                      ))}
                    </div>
                  )}
                </Card>
                <div className="bg-transparent w-full mx-auto  flex items-center  ">
                  <Card
                    onClick={() =>
                      navigate(`/community/detail/${params.id}/discussion`)
                    }
                    className=" group  p-3 w-64 text-center flex items-center justify-center hover:text-blue-700 cursor-pointer "
                  >
                    <p>See all Discussions </p>
                    <ChevronRight className="h-5 w-5 group-hover:translate-x-1 duration-300 transition-transform" />
                  </Card>
                </div>
              </div>
              <div className="md:w-[40%] space-y-6 w-[100%]  ">
                <div className="flex flex-col gap-2 w-full ">
                  <Card className="bg-white md:w-[100%] w-full mx-auto md:p-10 p-4 shadow-lg space-y-10 md:h-80">
                    <div className="flex items-center justify-between">
                      <div className="bg-slate-200 w-fit p-2 rounded-full">
                        <Bitcoin className=" text-blue-700" />
                      </div>
                      <div className="flex items-center gap-1">
                        {data.total_token > 0 && data.token_bought > 0 && (
                          <div>
                            <Dialog
                              open={openSellModal}
                              onOpenChange={setSellModal}
                            >
                              <DialogTrigger asChild>
                                <Button variant="radix">Sell Token</Button>
                              </DialogTrigger>
                              <DialogContent className="sm:max-w-[425px]">
                                <DialogHeader>
                                  <DialogTitle>Sell Token</DialogTitle>
                                </DialogHeader>
                                <div className="grid gap-4 py-4">
                                  <div className="grid grid-cols-4 items-center gap-4">
                                    <Label
                                      htmlFor="name"
                                      className="text-right"
                                    >
                                      Token
                                    </Label>
                                    <Input
                                      id="name"
                                      className="col-span-3"
                                      placeholder="How many Token you want to Sell"
                                      type="number"
                                      onChange={(e) => setToken(e.target.value)}
                                      required
                                    />
                                  </div>
                                </div>
                                <DialogFooter>
                                  {loading ? (
                                    <Button variant="radix" disabled>
                                      Selling...
                                    </Button>
                                  ) : (
                                    <Button
                                      variant="radix"
                                      onClick={handleSellToken}
                                      disabled={!token}
                                    >
                                      Sell Token
                                    </Button>
                                  )}
                                </DialogFooter>
                              </DialogContent>
                            </Dialog>
                          </div>
                        )}
                        {data.total_token > data.token_bought && (
                          <div>
                            <Dialog
                              open={openBuyModal}
                              onOpenChange={setBuyModal}
                            >
                              <DialogTrigger asChild>
                                <Button variant="radix">Buy Token</Button>
                              </DialogTrigger>
                              <DialogContent className="sm:max-w-[425px]">
                                <DialogHeader>
                                  <DialogTitle>Buy Token</DialogTitle>
                                </DialogHeader>
                                <div className="grid gap-4 py-4">
                                  <div className="grid grid-cols-4 items-center gap-4">
                                    <Label
                                      htmlFor="name"
                                      className="text-right"
                                    >
                                      Token
                                    </Label>
                                    <Input
                                      id="name"
                                      className="col-span-3"
                                      placeholder="How many Token you want to buy"
                                      type="number"
                                      onChange={(e) => setToken(e.target.value)}
                                      required
                                    />
                                  </div>
                                </div>
                                <DialogFooter>
                                  {loading ? (
                                    <Button variant="radix" disabled>
                                      Buying...
                                    </Button>
                                  ) : (
                                    <Button
                                      variant="radix"
                                      onClick={handleBuyToken}
                                      disabled={!token}
                                    >
                                      Buy Token
                                    </Button>
                                  )}
                                </DialogFooter>
                              </DialogContent>
                            </Dialog>
                          </div>
                        )}
                      </div>
                    </div>
                    <div className="flex items-center justify-between">
                      <div className="text-3xl flex flex-col gap-3 font-semibold">
                        <span>{data.total_token} Tokens</span>
                        <div className="flex flex-col text-base">
                          <span>Token Price: {data.token_price}</span>
                          <span>
                            Token Buy Back Price : {data.token_buy_back_price}
                          </span>
                        </div>
                      </div>
                      <div className="h-36 w-36 -translate-y-3 ">
                        <PieChart
                          data={[
                            {
                              title: "Total Token",
                              value: data.total_token - data.token_bought,
                              color: "#BF40BF",
                            },
                            {
                              title: "Token Bought",
                              value: data.token_bought,
                              color: "#770737",
                            },
                          ]}
                        />
                        <div className="text-sm w-full flex-col items-center justify-center md:flex hidden ">
                          <div className="flex items-center justify-between w-28">
                            Total Token:{" "}
                            <span className="bg-[#BF40BF] h-4 w-4"></span>
                          </div>
                          <div className="flex items-center justify-between w-28">
                            Bought :{" "}
                            <span className="bg-[#770737] h-4 w-4"></span>
                          </div>
                        </div>
                      </div>
                    </div>
                  </Card>
                  <Card className="bg-white md:w-[100%] w-full mx-auto md:p-10 p-4 shadow-lg space-y-10">
                    <div className="flex items-center justify-between">
                      <div className="bg-slate-200 w-fit p-2 rounded-full">
                        <Users className=" text-blue-700" />
                      </div>
                      <div>
                        <Button
                          onClick={() =>
                            navigate(`/community/detail/${params.id}/members`)
                          }
                          variant="radix"
                        >
                          View members
                        </Button>
                      </div>
                    </div>
                    <div className="flex items-center justify-between">
                      <div className="text-3xl font-semibold">
                        {participants.length} Members
                      </div>
                      {participants.length > 4 && (
                        <AvatarCircles
                          numPeople={participants.length - 3}
                          src1={participants[0].image_url}
                        />
                      )}
                    </div>
                  </Card>
                </div>

                <Card className="bg-white md:w-[100%] mx-auto md:p-4 p-4 shadow-lg space-y-2 ">
                  {participants.length === 0 && <div>No Participants</div>}
                  {participants.length > 0 &&
                    participants.slice(0, 4).map((participant, index) => (
                      <Card
                        key={index}
                        onClick={() =>
                          navigate(
                            `/userDashboard/userProfile/${participant.participant}`
                          )
                        }
                        className="bg-white flex items-center gap-2 md:w-[100%] mx-auto  p-2 border-none shadow-none"
                      >
                        <Avatar>
                          <AvatarImage
                            alt="Avatar"
                            src={participant.image_url}
                          />
                          <AvatarFallback>JD</AvatarFallback>
                        </Avatar>
                        <div className="text-left hover:text-blue-600 cursor-pointer text-ellipsis overflow-hidden">
                          <p className="font-medium">
                            {participant.name || "Unnamed Participant"}
                          </p>
                          <div className="text-gray-black dark:text-gray-400 text-sm truncate">
                            {participant.participant || ""}
                          </div>
                        </div>
                      </Card>
                    ))}
                </Card>
                <div className="bg-transparent w-full mx-auto  flex items-center   ">
                  <Card
                    onClick={() =>
                      navigate(`/community/detail/${params.id}/members`)
                    }
                    className="p-3 w-32 text-center flex items-center justify-center hover:text-blue-700 cursor-pointer group"
                  >
                    <p>See all</p>
                    <ChevronRight className="h-5 w-5 group-hover:translate-x-1 duration-300 transition-transform" />
                  </Card>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default CommunityDetails;
