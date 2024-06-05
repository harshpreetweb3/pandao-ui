import { useAccount } from "@/AccountContext";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { clipAddress } from "@/utils/functions/ClipAddress";
import axios from "axios";
import {

  Check,
  ChevronRight,
  Copy,
  Users,
} from "lucide-react";
import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { toast } from "sonner";

const CommunityDetails = () => {
  const { accounts } = useAccount();
  const navigate = useNavigate();
  const params = useParams();
  const [data, setData] = useState([]);
  const [participants, setParticipants] = useState([]);
  const [comments, setComments] = useState([]);
  const [copied, setCopied] = useState(false);

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
      toast.success("Welcome to the Community")
      fetchParticipant();
    } catch (error) {
      console.error("Error joining community:", error);
    }
  };
  // const handleAddComment = async () => {
  //   const data = {
  //     user_addr: accounts[0].address,

  //     comment: comment,
  //     community_id: params.id,
  //   };

  //   try {
  //     const response = await axios.post(
  //       `${import.meta.env.VITE_BACKEND_URL}/community/comment`,
  //       data
  //     );
  //     console.log("Comment Response:", response.data);
  //     setComment("");
  //     fetchComments();
  //   } catch (error) {
  //     console.error("Error adding comment:", error);
  //   }
  // };
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
  return (
    <div className="pt-20 pb-10 items-start gap-3 justify-start min-h-screen overflow-hidden bg-slate-100 text-black px-2">
      <div className="flex md:flex-row flex-col gap-6 px-4 md:px-6 py-8 md:py-12 max-w-[1440px] mx-auto ">
        {data && (
          <div className="space-y-6 md:w-[100%] ">
            <Card className="bg-white md:w-[90%] mx-auto md:p-10 p-6 shadow-lg">
              <div className="flex md:flex-row flex-col items-center justify-between gap-5">
                <h1 className="text-3xl font-bold text-left w-full">
                  {data.name}
                </h1>
                <div className="flex items-end md:items-start md:justify-end w-full">
                  <Button
                    onClick={handleJoinCommunity}
                    className="bg-purple-600 hover:bg-purple-500 text-white"
                  >
                    Join Community
                  </Button>
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
                  <p  className="cursor-pointer"  onClick={() => handleCopy(data.owner_address)}>
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
                                    `/userProfile/${comment.user_address}`
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
                <div className="bg-transparent w-full mx-auto  flex items-center   ">
                  <Card onClick={()=>navigate(`/community/detail/${params.id}/comments`)}  className="p-3 w-64 text-center flex items-center justify-center hover:text-blue-700 cursor-pointer ">
                    <p>See all Comments </p>
                    <ChevronRight className="h-5 w-5" />
                  </Card>
                </div>
              </div>
              <div className="md:w-[40%] space-y-6  ">
                <div>
                  <Card className="bg-white md:w-[100%] mx-auto md:p-10 p-4 shadow-lg space-y-10">
                    <div className="flex items-center justify-between">
                      <div className="bg-slate-200 w-fit p-2 rounded-full">
                        <Users className=" text-blue-700" />
                      </div>
                      <div>
                        <Button onClick={()=>navigate(`/community/detail/${params.id}/members`)}  className="bg-blue-600 rounded-xl">
                          Manage members
                        </Button>
                      </div>
                    </div>
                    <div className="text-3xl font-semibold">
                      {participants.length} Members
                    </div>
                  </Card>
                </div>

                <Card className="bg-white md:w-[100%] mx-auto md:p-4 p-4 shadow-lg space-y-2 ">
                  {participants.length > 0 &&
                    participants.slice(0, 4).map((participant, index) => (
                      <Card
                        key={index}
                        onClick={() =>
                          navigate(`/userProfile/${participant.participant}`)
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
                  <Card onClick={()=>navigate(`/community/detail/${params.id}/members`)}  className="p-3 w-32 text-center flex items-center justify-center hover:text-blue-700 cursor-pointer ">
                    <p>See all</p>
                    <ChevronRight className="h-5 w-5" />
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
