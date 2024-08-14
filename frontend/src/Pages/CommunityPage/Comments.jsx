import { useAccount } from "@/AccountContext";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import {
  Dialog,
  DialogContent,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { clipAddress } from "@/utils/functions/ClipAddress";
import { formatStandardDateTime } from "@/utils/functions/convertActivityData";
import axios from "axios";
import { MessageCircle } from "lucide-react";
import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { toast } from "sonner";
import ImageUpdater from "../components/ImageUpdater";
import CommnetImageUpdater from "../components/CommentImageUpdater";

const Comments = () => {
  const { accounts } = useAccount();
  const navigate = useNavigate();
  const params = useParams();
  const [title, setTitle] = useState("");
  const [communities, setCommunities] = useState([]);
  const [loading, setLoading] = useState(true);
  const [open, setOpen] = useState(false);
  const [selectedComments, setSelectedComments] = useState([]);
  const [selectedDiscussion, setSelectedDiscussion] = useState(null);
  const [selectedDiscussionTitle, setSelectedDiscussionTitle] = useState(""); 
  const [newComment, setNewComment] = useState(""); 
  const [commentUrl,setCommentUrl]=useState("")

  const handleAddDiscussion = async () => {
    if (title.trim() === "") {
      alert("Add something");
      return;
    }
    const data = {
      user_addr: accounts[0].address,
      discussion_title: title,
      community_id: params.id,
    };

    try {
      const response = await axios.post(
        `${import.meta.env.VITE_BACKEND_URL}/community/discussion`,
        data
      );
      console.log("Comment Response:", response.data);
      toast.success("Discussion Added");
      setTitle("");
      setOpen(false);
      fetchComments();
    } catch (error) {
      if(error.response.status===401){
        toast.warning("Non member cannot add discussion");
        setTitle("");
        setOpen(false);
      }
      console.error("Error adding discussion:", error.response.status);

    }
  };

  const fetchComments = async () => {
    try {
      const res = await axios.get(
        `${import.meta.env.VITE_BACKEND_URL}/community/discussion/${params.id}`
      );
      setCommunities(res.data);
      setLoading(false);
    } catch (error) {
      console.error("Error fetching discussions:", error);
    }
  };

  const fetchDiscussionComments = async (discussionId, discussionTitle) => {
    try {
      const res = await axios.get(
        `${
          import.meta.env.VITE_BACKEND_URL
        }/community/discussion/comments/${discussionId}`
      );
      setSelectedComments(res.data);
      setSelectedDiscussion(discussionId);
      setSelectedDiscussionTitle(discussionTitle); // Set the discussion title
    } catch (error) {
      console.error("Error fetching discussion comments:", error);
    }
  };

  const handleAddComment = async () => {
    if (newComment.trim() === "") {
      toast.error("Comment cannot be empty");
      return;
    }
    const data = {
      user_addr: accounts[0].address,
      discussion_id: selectedDiscussion,
      comment: newComment,
      image: commentUrl ||  "string",
    };

    try {
      const response = await axios.post(
        `${import.meta.env.VITE_BACKEND_URL}/community/discussion/comments`,
        data
      );
      console.log("Add Comment Response:", response.data);
      if(response.data.status_code===401){
        toast.warning("Not a community member");
        setNewComment("")
        return
      }
      toast.success("Comment Added");
      setNewComment("");
      setCommentUrl("")
      fetchDiscussionComments(selectedDiscussion, selectedDiscussionTitle);
    } catch (error) {
      console.error("Error adding comment:", error);
    }
  };
  const handleCommentId = (id) => {
    const url = `https://ucarecdn.com/${id}/-/preview/1000x562/`;
    console.log("Received file URL:", url);
    setCommentUrl(url)
  };
  useEffect(() => {
    fetchComments();
  }, [params.id]);

  if (!accounts || accounts.length === 0) {
    navigate("/");
    return null;
  }

  return (
    <div className="pt-20 pb-10 items-start gap-3 justify-start min-h-screen overflow-hidden bg-blue-50 text-black px-2">
      <div className="flex md:flex-row flex-col gap-6 px-4 md:px-6 py-8 md:py-12 max-w-[1440px] mx-auto">
        <div className="space-y-6 md:w-[100%]">
          <div className="flex md:flex-row flex-col md:w-[95%] mx-auto gap-2">
            <div className="md:w-[100%] space-y-6">
              <Card className="bg-white md:w-[100%] mx-auto md:p-10 p-4 space-y-10">
                <div className="flex items-center justify-between">
                  <div className="bg-slate-200 w-fit p-2 rounded-full">
                    <MessageCircle className="text-blue-700" />
                  </div>
                  <div>
                    <Dialog open={open} onOpenChange={setOpen}>
                      {!selectedDiscussion && (
                        <DialogTrigger>
                          <Button variant="radix">Start new discussion</Button>
                        </DialogTrigger>
                      )}
                      <DialogContent>
                        <DialogTitle>Discussion Title</DialogTitle>
                        <Input
                          placeholder="Enter the discussion title"
                          value={title}
                          onChange={(e) => setTitle(e.target.value)}
                        />
                        <Button variant="radix" onClick={handleAddDiscussion}>
                          Start
                        </Button>
                      </DialogContent>
                    </Dialog>
                  </div>
                </div>
                <div className="text-3xl font-semibold">
                  {selectedDiscussion
                    ? selectedDiscussionTitle
                    : `${communities.length} discussions so far.`}
                </div>
              </Card>
              {!selectedDiscussion && (
                <Card className="bg-white md:w-[80%] mx-auto md:p-4 p-4 space-y-2">
                  <div className="p-2 border-b-2 -translate-x-2">
                    Discussions
                  </div>
                  {!loading && (
                    <div className="space-y-4">
                      {communities.length === 0 && <div className="flex items-center justify-center h-20">
                        No Active Discussion
                      </div> }
                      {communities.length > 0 && (
                        <div className="grid md:grid-cols-2 grid-cols-1 gap-4">
                          {communities.map((community, index) => (
                            <Card
                              key={index}
                              className="p-4 flex flex-col gap-2 hover:shadow-lg shadow-md cursor-pointer"
                              onClick={() =>
                                fetchDiscussionComments(
                                  community.id,
                                  community.title
                                )
                              }
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
                              <div className="w-full border-t-2 pt-2">
                                {formatStandardDateTime(community.created_at)}
                              </div>
                            </Card>
                          ))}
                        </div>
                      )}
                    </div>
                  )}
                  {loading && (
                    <div className="flex h-[200px] items-center justify-center text-center mt-5">
                      <div className="h-10 w-10 animate-spin rounded-full border-4 border-gray-200 border-t-blue-500" />
                    </div>
                  )}
                </Card>
              )}
              {selectedDiscussion && (
                <Card className="bg-white md:w-[80%] mx-auto md:p-4 p-4 space-y-2 mt-4">
                  <div className="flex items-center justify-between border-b-2">
                    <div className="p-2 -translate-x-2">Comments</div>
                    <Button
                      size="sm"
                      variant="link"
                      onClick={() => setSelectedDiscussion(null)}
                    >
                      Back
                    </Button>
                  </div>
                  {selectedComments.length > 0 ? (
                    <div className="space-y-4">
                      {selectedComments.map((comment, index) => (
                        <Card
                          key={index}
                          className="p-2 flex flex-col gap-2 shadow-md "
                        >
                          <div className="bg-purple-50 p-2 font-semibold rounded-sm">{comment.comment}</div>
                          <div>
                            {comment.image && comment.image!=="string" &&
                            <img
                            src={comment.image}
                            className="h-[320px] w-[320px] aspect-square object-cover"
                            />

                            }
                          </div>
                          <div className="text-sm flex items-center gap-2">
                            <div>Posted By - </div>
                            <div className="flex items-center gap-1">
                              <div>
                                <Avatar className="h-6 w-6">
                                  <AvatarImage src={comment.user_image} />
                                  <AvatarFallback>CN</AvatarFallback>
                                </Avatar>
                              </div>
                              <div>{comment.user_name}</div>
                            </div>
                          </div>
                          <div className="text-sm font-light border-t-2 pt-1">
                            {formatStandardDateTime(comment.created_at)}
                          </div>
                        </Card>
                      ))}
                    </div>
                  ) : (
                    <div className="text-center py-5">No comments yet.</div>
                  )}
                  <div className="w-full flex flex-col items-end justify-end gap-y-2 py-6">
                    <Textarea
                      placeholder="Become part of this discussion"
                      value={newComment}
                      onChange={(e) => setNewComment(e.target.value)}
                    />
                
                    <div className="flex items-center w-fit">
                    <Button variant="radix" className="rounded-r-none" onClick={handleAddComment}>
                      Add Comment
                    </Button>
                    <CommnetImageUpdater  onUploadSuccess={handleCommentId} />
                    </div>
                    {commentUrl !=="" && <img
                    src={commentUrl}
                    className="h-40 w-60 object-cover"
                    />}
       

                  </div>
                </Card>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Comments;
