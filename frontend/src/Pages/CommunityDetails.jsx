import { useAccount } from "@/AccountContext";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Textarea } from "@/components/ui/textarea";
import { clipAddress } from "@/utils/functions/ClipAddress";
import axios from "axios";
import { ArrowBigLeft, ArrowRight, ChevronLeft, ChevronRight, Users } from "lucide-react";
import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";

const CommunityDetails = () => {
  const { accounts } = useAccount();
  const navigate = useNavigate();
  const params = useParams();
  const [data, setData] = useState([]);
  const [participants, setParticipants] = useState([]);
  const [comment, setComment] = useState("");
  const [comments, setComments] = useState([]);

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
      fetchParticipant();
    } catch (error) {
      console.error("Error joining community:", error);
    }
  };
  const handleAddComment = async () => {
    const data = {
      user_addr: accounts[0].address,

      comment: comment,
      community_id: params.id,
    };

    try {
      const response = await axios.post(
        `${import.meta.env.VITE_BACKEND_URL}/community/comment`,
        data
      );
      console.log("Comment Response:", response.data);
      setComment("");
      fetchComments();
    } catch (error) {
      console.error("Error adding comment:", error);
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
  console.log(participants.length);
  return (
    <div className="pt-20 pb-10 items-start gap-3 justify-start min-h-screen overflow-hidden bg-slate-100  text-black px-2">
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
                    className="bg-blue-600 hover:bg-blue-500 text-white"
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
                  <p className="text-gray-900 dark:text-gray-400 mt-2 text-ellipsis overflow-hidden">
                    {clipAddress(data.owner_address || "N/A")}
                  </p>
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
              <Card className="bg-white md:w-[60%] mx-auto md:p-10 p-4 shadow-lg h-fit">
                fdasfgfdg sadf
              </Card>
              <div className="md:w-[40%] space-y-6  ">
                <Card className="bg-white md:w-[100%] mx-auto md:p-10 p-4 shadow-lg space-y-10">
                  <div className="flex items-center justify-between">
                    <div className="bg-slate-200 w-fit p-2 rounded-full">
                      <Users className=" text-blue-700" />
                    </div>
                    <div>
                      <Button className="bg-blue-600 rounded-xl">
                        Manage members
                      </Button>
                    </div>
                  </div>
                  <div className="text-3xl font-semibold">
                    {participants.length} Members
                  </div>
                </Card>
                <Card className="bg-white md:w-[100%] mx-auto md:p-4 p-4 shadow-lg space-y-2 ">
                  {participants.length > 0 &&
                    participants.slice(0,4).map((participant, index) => (
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
             <Card className="p-3 w-32 text-center flex items-center justify-center hover:text-blue-700 cursor-pointer ">
              <p>
              See all
              </p>
 <ChevronRight className="h-5 w-5"/>
             </Card>
                </div>
              </div>
            </div>

            <div className="mt-10 border-t-2">
              <section className="space-y-6 mt-5">
                <div className="flex items-center justify-between">
                  <h2 className="text-2xl font-bold">Comments</h2>
                </div>
                <div className="space-y-4">
                  {comments &&
                    comments.map((comment, index) => (
                      <div
                        key={index}
                        className="flex items-start gap-4 bg-purple-300 p-3 rounded-lg text-black"
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
                                navigate(`/userProfile/${comment.user_address}`)
                              }
                            >
                              <div className="font-medium group-hover:underline cursor-pointer">
                                {comment.user_name}
                              </div>
                              <div className="font-light group-hover:underline cursor-pointer">
                                {comment.user_address}
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
                <div className="flex flex-col items-end gap-2">
                  <Textarea
                    placeholder="Add a new comment..."
                    className="flex-1 text-black"
                    value={comment}
                    onChange={(e) => setComment(e.target.value)}
                  />
                  <Button
                    onClick={handleAddComment}
                    className="bg-purple-400 hover:bg-purple-300 text-black"
                  >
                    Submit
                  </Button>
                </div>
              </section>
            </div>
          </div>
        )}
        {/* <div className="flex flex-col gap-3 md:w-[30%]">
          <h2 className="text-xl font-semibold">DAO Participants</h2>
          <div className="grid grid-cols-1 items-start justify-start gap-2">
            {participants.length > 0 &&
              participants.map((participant, index) => (
                <Card
                  key={index}
                  onClick={() =>
                    navigate(`/userProfile/${participant.participant}`)
                  }
                  className="flex items-center gap-2 p-4 h-fit cursor-pointer hover:bg-slate-100 hover:translate-x-3 duration-300 transition-transform"
                >
                  <Avatar>
                    <AvatarImage alt="Avatar" src={participant.image_url} />
                    <AvatarFallback>JD</AvatarFallback>
                  </Avatar>
                  <div className="text-left text-ellipsis overflow-hidden">
                    <p className="font-medium">
                      {participant.name || "Unnamed Participant"}
                    </p>
                    <div className="text-gray-black dark:text-gray-400 text-sm truncate">
                      {participant.participant || ""}
                    </div>
                  </div>
                </Card>
              ))}
          </div>
        </div> */}
      </div>
    </div>
  );
};

export default CommunityDetails;
