import { useAccount } from "@/AccountContext";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Textarea } from "@/components/ui/textarea";
import axios from "axios";
import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { useStore } from "zustand";

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
      fetchParticipant()
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
  console.log(comments);

  return (
    <div className="pt-20 pb-10 items-start gap-3 justify-start min-h-screen overflow-hidden bg-[radial-gradient(ellipse_at_left,_var(--tw-gradient-stops))] from-[#281038] from-0% via-[#181734] via-50% to-[#0D1E3B] to-100% text-black px-2">
      <div className="flex md:flex-row flex-col gap-6 px-4 md:px-6 py-8 md:py-12 max-w-[1440px] mx-auto text-white">
        {data && (
          <div className="space-y-6 md:w-[70%]">
            <div className="flex items-center justify-between">
              <h1 className="text-3xl font-bold">{data.name}</h1>
              <Button
                onClick={handleJoinCommunity}
                className="bg-purple-400 hover:bg-purple-300 text-black"
              >
                Join Community
              </Button>
            </div>
            <div className="grid gap-4">
              <div>
                <h2 className="text-xl font-semibold">Community Overview</h2>
                <p className="text-gray-100 dark:text-gray-400 mt-2">
                  {data.description}
                </p>
              </div>
              <div>
                <h2 className="text-md font-semibold">Owner Name</h2>
                <p className="text-gray-100 dark:text-gray-400 mt-2">
                  {data.owner?.name || "N/A"}
                </p>
              </div>
              <div>
                <h2 className="text-md font-semibold">Owner Address</h2>
                <p className="text-gray-100 dark:text-gray-400 mt-2 text-ellipsis overflow-hidden">
                  {data.owner_address || "N/A"}
                </p>
              </div>
              <div>
                <h2 className="text-md font-semibold">Component Address</h2>
                <p className="text-gray-100 dark:text-gray-400 mt-2">
                  {data.component_address || "N/A"}
                </p>
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
        <div className="flex flex-col gap-3 md:w-[30%]">
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
        </div>
      </div>
    </div>
  );
};

export default CommunityDetails;
