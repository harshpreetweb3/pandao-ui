import { useAccount } from "@/AccountContext";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Textarea } from "@/components/ui/textarea";
import { clipAddress } from "@/utils/functions/ClipAddress";
import axios from "axios";
import { MessageCircle, Vote } from "lucide-react";
import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { toast } from "sonner";

const TokenDistribution = () => {
  const { accounts } = useAccount();
  const navigate = useNavigate();
  const params = useParams();
  const [comment, setComment] = useState("");
  const [tokens, setTokens] = useState([]);
  const [loading, setLoading] = useState(true);

  // const handleAddComment = async () => {
  //   if (comment.trim() === "") {
  //     alert("Add Somthign");
  //     return;
  //   }
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
  //     toast.success("Comment Added");
  //     setComment("");
  //     fetchComments();
  //   } catch (error) {
  //     console.error("Error adding comment:", error);
  //   }
  // };

  const fetchComments = async () => {
    try {
      const res = await axios.get(
        `${import.meta.env.VITE_BACKEND_URL}/community/token/${params.id}`
      );
      console.log(res, "hi");
      setTokens(res.data);
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
  console.log(tokens);
  return (
    <div className="pt-20 pb-10 items-start gap-3 justify-start min-h-screen overflow-hidden bg-blue-50  text-black px-2">
      <div className="flex md:flex-row flex-col gap-6 px-4 md:px-6 py-8 md:py-12 max-w-[1440px] mx-auto ">
        <div className="space-y-6 md:w-[100%] ">
          <div className="flex md:flex-row flex-col md:w-[90%] mx-auto gap-2">
            <div className="md:w-[100%] space-y-6  ">
              <Card className="bg-white md:w-[100%] mx-auto md:p-10 p-4  space-y-10">
                <div className="flex items-center justify-between">
                  <div className="bg-slate-200 w-fit p-2 rounded-full">
                    <Vote className=" text-blue-700" />
                  </div>
                  {/* <div>
                    <Button variant="radix">
                      Manage Vote
                    </Button>
                  </div> */}
                </div>
                <div className="text-3xl font-semibold">Vote Power</div>
              </Card>
              <Card className="bg-white md:w-[70%] mx-auto md:p-4 p-4 space-y-2 ">
                
                <Table>
                  {/* <TableCaption>A list of your recent .</TableCaption> */}
                  <TableHeader>
                    <TableRow>
                      <TableHead className="w-[150px]">User Name</TableHead>
                      <TableHead>Token Owned</TableHead>
                      <TableHead>Address</TableHead>
                      {/* <TableHead className="text-right">Amount</TableHead> */}
                    </TableRow>
                  </TableHeader>
                
                  <TableBody>
                    {tokens.map((token, index) => (
                      <TableRow key={index}>
                        <TableCell className="font-medium">
                          {" "}
                          {token.user_name}
                        </TableCell>
                        <TableCell>{token.token_owned}</TableCell>
                        <TableCell  onClick={() =>
                                  navigate(
                                    `/userDashboard/userProfile/${token.public_address}`
                                  )
                                }  >
                          {clipAddress(token.public_address)}
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
                {tokens.length===0 && <div className="flex items-center justify-center h-20">
                    No trade happend yet.
                  </div>}
              </Card>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TokenDistribution;
