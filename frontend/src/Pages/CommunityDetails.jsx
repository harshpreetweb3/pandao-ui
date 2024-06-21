import { useAccount } from "@/AccountContext";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import AvatarCircles from "@/components/ui/myComponents/avatarCircle";
import { clipAddress } from "@/utils/functions/ClipAddress";
import axios from "axios";
import { Bitcoin, Check, ChevronRight, Contact, Copy, Users } from "lucide-react";
import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { toast } from "sonner";
import { useSendTransaction } from "@/hooks/useSendTransaction";
import extractTransactionsData from "@/utils/GetTransactionRecipt";
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

function removeNewLines(input) {
  return input.replace(/\n\s*/g, " ");
}

const CommunityDetails = () => {
  const { accounts } = useAccount();
  const navigate = useNavigate();
  const params = useParams();
  const [data, setData] = useState([]);
  const [participants, setParticipants] = useState([]);
  const [comments, setComments] = useState([]);
  const [copied, setCopied] = useState(false);
  const sendTransaction = useSendTransaction();
  const [loading, setLoading] = useState(false);
  const [manifest, setManifest] = useState("");
const [token,setToken]=useState(0)
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
        `${import.meta.env.VITE_BACKEND_URL}/community/comments/${params.id}`
      );
      setComments(res.data);
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
      <div className="flex md:flex-row flex-col gap-6 px-4 md:px-6 py-8 md:py-12 max-w-[1440px] mx-auto ">
        {data && (
          <div className="space-y-6 md:w-[100%] ">
            <Card className="bg-white md:w-[90%] mx-auto md:p-10 p-6 shadow-lg">
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
                  <h2 className="text-xl font-semibold">Community Overview</h2>
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
            </Card>
            <div className="flex md:flex-row flex-col md:w-[90%] mx-auto gap-2">
              <div className="md:w-[60%] space-y-3">
                <Card className="bg-white md:w-[100%] mx-auto md:p-4 p-4 shadow-lg ">
                  {comments.length === 0 && <div>No Comment</div>}
                  <div className="space-y-4">
                    {comments &&
                      comments.slice(0, 4).map((comment, index) => (
                        <div
                          key={index}
                          className="flex items-start gap-4 bg-white border-b-2 rounded-none p-3  text-black"
                        >
                          <Avatar className="shrink-0 object-cover">
                            <img src={comment.user_image} alt="Avatar" />
                            <AvatarFallback>JD</AvatarFallback>
                          </Avatar>
                          <div className="flex-1 space-y-2">
                            <div className="flex items-center justify-between">
                              <div
                                className="group"
                                onClick={() =>
                                  navigate(
                                    `/userDashboard/userProfile/${comment.user_address}`
                                  )
                                }
                              >
                                <div className="font-medium group-hover:underline cursor-pointer">
                                  {comment.user_name}
                                </div>
                                <div className="font-light group-hover:underline cursor-pointer">
                                  {clipAddress(comment.user_address)}
                                </div>
                              </div>
                              {/* <div className="text-xs text-gray-700 dark:text-gray-700">2 days ago</div> */}
                            </div>
                            <p className="text-gray-800 dark:text-gray-400 font-medium">
                              {comment.comment}
                            </p>
                          </div>
                        </div>
                      ))}
                  </div>
                </Card>
                <div className="bg-transparent w-full mx-auto  flex items-center  ">
                  <Card
                    onClick={() =>
                      navigate(`/community/detail/${params.id}/comments`)
                    }
                    className=" group  p-3 w-64 text-center flex items-center justify-center hover:text-blue-700 cursor-pointer "
                  >
                    <p>See all Comments </p>
                    <ChevronRight className="h-5 w-5 group-hover:translate-x-1 duration-300 transition-transform" />
                  </Card>
                </div>
              </div>
              <div className="md:w-[40%] space-y-6 w-[100%]  ">
                <div className="flex flex-col gap-2 w-full ">
                <Card className="bg-white md:w-[100%] w-full mx-auto md:p-10 p-4 shadow-lg space-y-10">
                    <div className="flex items-center justify-between">
                      <div className="bg-slate-200 w-fit p-2 rounded-full">
                        <Bitcoin className=" text-blue-700" />
                      </div>
                      <div>
                      <Dialog>
                    <DialogTrigger asChild>
                      <Button variant="radix">Buy Token</Button>
                    </DialogTrigger>
                    <DialogContent className="sm:max-w-[425px]">
                      <DialogHeader>
                        <DialogTitle>Buy Token</DialogTitle>
                      </DialogHeader>
                      <div className="grid gap-4 py-4">
                        <div className="grid grid-cols-4 items-center gap-4">
                          <Label htmlFor="name" className="text-right">
                            Token
                          </Label>
                          <Input
                            id="name"
                            className="col-span-3"
                            placeholder="How many Token you want to buy"
                            type="number"
                            onChange={(e)=>setToken(e.target.value)}
                          />
                        </div>
                      </div>
                      <DialogFooter>
                        <Button variant="radix" onClick={handleBuyToken}>
                          Buy Token
                        </Button>
                      </DialogFooter>
                    </DialogContent>
                  </Dialog>
                      </div>
                    </div>
                    <div className="flex items-center justify-between">
                      <div className="text-3xl flex flex-col gap-3 font-semibold">
                        <span>
                        {data.total_token} Tokens

                        </span>
                        <div className="flex flex-col text-base">
                          <span>
                        Token Price:  {data.token_price} 
                          </span>
                          <span>
                         Token Buy Back Price : {data.token_buy_back_price}
                          </span>
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
                          Manage members
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
