import { useAccount } from "@/AccountContext";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Textarea } from "@/components/ui/textarea";
import { clipAddress } from "@/utils/functions/ClipAddress";
import axios from "axios";
import { ArrowBigLeft, ArrowRight, ChevronLeft, ChevronRight, MessageCircle, Users } from "lucide-react";
import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";

const Comments = () => {
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
        
            <div className="flex md:flex-row flex-col md:w-[90%] mx-auto gap-2">
           
              <div className="md:w-[100%] space-y-6  ">
             
                <Card className="bg-white md:w-[100%] mx-auto md:p-10 p-4  space-y-10">
                  <div className="flex items-center justify-between">
                    <div className="bg-slate-200 w-fit p-2 rounded-full">
                      <MessageCircle className=" text-blue-700" />
                    </div>
                    <div>
                      <Button className="bg-blue-600 rounded-xl">
                        Manage Comments
                      </Button>
                    </div>
                  </div>
                  <div className="text-3xl font-semibold">
                    {comments.length} Comments so far.
                  </div>
                </Card>
                <Card className="bg-white md:w-[70%] mx-auto md:p-4 p-4 space-y-2 ">
                <div className="p-2 border-b-2 -translate-x-2">
                    Comments
                </div>
                <div className="space-y-4">
                    {comments &&
                      comments.map((comment, index) => (
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
                         <div className="flex flex-col items-end gap-2">
                  <Textarea
                    placeholder="Add a new comment..."
                    className="flex-1 text-black"
                    value={comment}
                    onChange={(e) => setComment(e.target.value)}
                  />
                  <Button
                    onClick={handleAddComment}
                    className="bg-blue-600 hover:bg-blue-500 text-white"
                  >
                    Submit
                  </Button>
                </div>
                  </div>
                 
                </Card>
               
              </div>
            </div>

          
          </div>
        )}
 
      </div>
    </div>
  );
};

export default Comments;
