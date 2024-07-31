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
import axios from "axios";
import { MessageCircle } from "lucide-react";
import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { toast } from "sonner";

const Comments = () => {
  const { accounts } = useAccount();
  const navigate = useNavigate();
  const params = useParams();
  const [title, setTitle] = useState("");
  const [communities, setCommunities] = useState([]);
  const [loading, setLoading] = useState(true);
  const [open,setOpen]=useState(false)

  const handleAddDiscussion = async () => {
    if (title.trim() === "") {
      alert("Add Somthign");
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
      toast.success("Comment Added");
      setTitle("");
      setOpen(false)
      fetchComments();
    } catch (error) {
      console.error("Error adding comment:", error);
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
      console.error("Error fetching blueprint data:", error);
    }
  };
  useEffect(() => {
    fetchComments();
  }, [params.id]);

  if (!accounts || accounts.length === 0) {
    navigate("/");
    return null;
  }
  return (
    <div className="pt-20 pb-10 items-start gap-3 justify-start min-h-screen overflow-hidden bg-blue-50  text-black px-2">
      <div className="flex md:flex-row flex-col gap-6 px-4 md:px-6 py-8 md:py-12 max-w-[1440px] mx-auto ">
        <div className="space-y-6 md:w-[100%] ">
          <div className="flex md:flex-row flex-col md:w-[90%] mx-auto gap-2">
            <div className="md:w-[100%] space-y-6  ">
              <Card className="bg-white md:w-[100%] mx-auto md:p-10 p-4  space-y-10">
                <div className="flex items-center justify-between">
                  <div className="bg-slate-200 w-fit p-2 rounded-full">
                    <MessageCircle className=" text-blue-700" />
                  </div>
                  <div>
                    <Dialog open={open} onOpenChange={setOpen}>
                      <DialogTrigger>
                        <Button variant="radix">Start new discussion</Button>
                      </DialogTrigger>
                      <DialogContent>
                        <DialogTitle>Discussion Title</DialogTitle>
                        <Input placeholder="Enter the discussion title" value={title} onChange={(e)=>setTitle(e.target.value)} />
                        <Button variant="radix" onClick={handleAddDiscussion}>Start</Button>
                      </DialogContent>
                    </Dialog>
                  </div>
                </div>
                <div className="text-3xl font-semibold">
                  {communities.length} discussions so far.
                </div>
              </Card>
              <Card className="bg-white md:w-[80%] mx-auto md:p-4 p-4 space-y-2 ">
                <div className="p-2 border-b-2 -translate-x-2">Discussions</div>
                {!loading && (
                  <div className="space-y-4">
                    {communities.length > 0 && (
                      <div className="grid md:grid-cols-2 grid-cols-1 gap-4">
                        {communities.map((community, index) => (
                          <Card
                            key={index}
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
                  </div>
                )}
                {loading && (
                  <div className="flex h-[200px] items-center justify-center text-center  mt-5 ">
                    <div className="h-10 w-10 animate-spin rounded-full border-4 border-gray-200 border-t-blue-500" />
                  </div>
                )}
              </Card>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Comments;
