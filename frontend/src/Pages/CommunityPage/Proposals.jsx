import { useAccount } from "@/AccountContext";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { clipAddress } from "@/utils/functions/ClipAddress";
import axios from "axios";
import { ChevronLeft, HandHelping } from "lucide-react";
import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import CustomDatePicker from "./components/CustomDatePicker";
import { Input } from "@/components/ui/input";
import { useSendTransaction } from "@/hooks/useSendTransaction";
import { toast } from "sonner";
import { convertUnixTimestamp } from "@/utils/functions/ConvertDate";
import { formatStandardDateTime } from "@/utils/functions/convertActivityData";

const Proposals = () => {
  const { accounts } = useAccount();
  const [vote, setVote] = useState(Boolean);
  const navigate = useNavigate();
  const params = useParams();
  const [proposal, setProposal] = useState("");
  const [comment, setComment] = useState("");

  const [loading, setLoading] = useState(true);
  const [loadingCommnets, setLoadingComments] = useState(true);
  const [loadingAgainst, setLoadingAgainst] = useState(true);
  const [loadingFor, setLoadingFor] = useState(true);
  const [loadingButtonAgainst, setLoadingButtonAgainst] = useState(false);
  const [loadingButtonFor, setLoadingButtonFor] = useState(false);
  const [loadingButton, setLoadingButton] = useState(false);
  const [form, setShowForm] = useState(true);
  const [startDate, setStartDate] = useState(new Date());
  const [endDate, setEndDate] = useState(new Date());
  const [comments, setComments] = useState([]);
  const [minimumQuorum, setMinimumQuorum] = useState("");
  const [proposalText, setProposalText] = useState("");
  const [manifest, setManifest] = useState("");
  const [manifestForVoteAgainst, setManifestForVoteAgainst] = useState("");
  const [manifestForVoteFor, setManifestForVoteFor] = useState("");
  const sendTransaction = useSendTransaction();
  const handleAddComment = async () => {
    if (!proposal || !proposal.id) {
      toast.error("Proposal not loaded");
      return;
    }
    if (comment.trim() === "") {
      toast.error("Add Something");
      return;
    }
    const data = {
      user_addr: accounts[0].address,

      comment: comment,
      proposal_id: proposal.id,
    };

    try {
      const response = await axios.post(
        `${import.meta.env.VITE_BACKEND_URL}/community/proposal/comments`,
        data
      );
      console.log("Comment Response:", response.data);
      toast.success("Comment Added");
      setComment("");
      fetchProposalsComments();
    } catch (error) {
      console.error("Error adding comment:", error);
    }
  };
  const fetchProposals = async () => {
    try {
      const res = await axios.get(
        `${import.meta.env.VITE_BACKEND_URL}/community/proposal/active/${
          params.id
        }`
      );
      setProposal(res.data);
      setLoading(false);
    } catch (error) {
      console.error("Error fetching blueprint data:", error);
    }
  };
  const fetchProposalsComments = async () => {
    if (!proposal || !proposal.id) {
      console.error("Proposal not available for fetching comments.");
      return;
    }
    try {
      const res = await axios.get(
        `${import.meta.env.VITE_BACKEND_URL}/community/proposal/comments/${
          proposal.id
        }`
      );
      setComments(res.data);
      setLoadingComments(false);
    } catch (error) {
      console.error("Error fetching blueprint data:", error);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Validate form inputs
    if (!proposalText || !startDate || !endDate || !minimumQuorum) {
      alert("Please fill out all fields.");
      return;
    }

    try {
      setLoadingButton(true);
      const res = await axios.post(
        `${import.meta.env.VITE_BACKEND_URL}/manifest/build/praposal`,

        {
          userAddress: accounts[0].address,
          community_id: params.id,
          minimumquorum: parseInt(minimumQuorum),
          start_time: JSON.stringify(Math.floor(startDate.getTime() / 1000)),
          end_time: JSON.stringify(Math.floor(endDate.getTime() / 1000)),
          proposal: proposalText,
        }
      );

      // Handle successful submission (e.g., navigate to success page, show confirmation)
      console.log("Proposal submitted successfully:", res.data);
      setManifest(res.data);
      // Optionally update UI or navigate to another page after successful submission
    } catch (error) {
      console.error("Error submitting proposal:", error);
      // Handle error (e.g., show error message to user)
    }
    const { receipt } = await sendTransaction(manifest).finally(() => {
      setLoading(false);
      setLoadingButton(false);
    });
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
        toast.success("Proposal Submitted");
        setLoadingButton(false);
      } catch (error) {
        toast.error("Something went wrong");
        setLoadingButton(false);
      }
    }
  };
  const handleAgainst = async () => {
    setVote(true);
    try {
      setLoadingButtonAgainst(true);
      const res = await axios.post(
        `${import.meta.env.VITE_BACKEND_URL}/manifest/proposal/vote`,

        {
          proposal_address: proposal.proposal_address,
          userAddress: accounts[0].address,
          vote_against: vote,
        }
      );

      // Handle successful submission (e.g., navigate to success page, show confirmation)
      console.log("Vote submitted successfully:", res.data);
      setManifestForVoteAgainst(res.data);
    } catch (error) {
      console.log(error);
    }
    const { receipt } = await sendTransaction(manifestForVoteAgainst).finally(
      () => {
        setLoadingAgainst(false);
        setLoadingButtonAgainst(false);
      }
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
        toast.success("Vote Submitted");
        setLoadingButtonAgainst(false);
      } catch (error) {
        toast.error("Something went wrong");
        setLoadingButtonAgainst(false);
      }
    }
  };
  const handleFor = async () => {
    setVote(false);
    try {
      setLoadingButtonFor(true);
      const res = await axios.post(
        `${import.meta.env.VITE_BACKEND_URL}/manifest/proposal/vote`,

        {
          proposal_address: proposal.proposal_address,
          userAddress: accounts[0].address,
          vote_against: vote,
        }
      );

      // Handle successful submission (e.g., navigate to success page, show confirmation)
      console.log("Vote submitted successfully:", res.data);
      setManifestForVoteFor(res.data);
    } catch (error) {
      console.log(error);
    }
    const { receipt } = await sendTransaction(manifestForVoteFor).finally(
      () => {
        setLoadingFor(false);
        setLoadingButtonFor(false);
      }
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
        toast.success("Vote Submitted");
        setLoadingButtonFor(false);
      } catch (error) {
        toast.error("Something went wrong");
        setLoadingButtonFor(false);
      }
    }
  };
  useEffect(() => {
    fetchProposals();
  }, [params.id]);
  useEffect(() => {
    fetchProposalsComments();
  }, [proposal]);
  if (!accounts || accounts.length === 0) {
    navigate("/");
    return null;
  }
  return (
    <div className="pt-20 pb-10 items-start gap-3 justify-start min-h-screen overflow-hidden bg-blue-50  text-black px-2">
      {form ? (
        <div className="flex md:flex-row flex-col gap-6 px-4 md:px-6 py-8 md:py-12 max-w-[1440px] mx-auto ">
          <div className="space-y-6 md:w-[100%] ">
            <div className="flex md:flex-row flex-col md:w-[100%] mx-auto gap-2">
              <div className="md:w-[100%] space-y-2  ">
                <div className="w-full  flex items-end justify-end">
                  <Button onClick={() => setShowForm(!form)} variant="radix">
                    Create Proposal
                  </Button>
                </div>

                <Card className="bg-white md:w-[100%] mx-auto md:p-4 p-4 space-y-2 ">
                  <div className="p-2 border-b-2 -translate-x-2">
                    Active Proposal
                  </div>
                  {!loading && (
                    <div className="space-y-4">
                      {!proposal && (
                        <div className="flex items-center justify-center h-10">
                          No Active Proposal
                        </div>
                      )}
                    </div>
                  )}
                  {!loading && proposal && (
                    <div className="space-y-4">
                      {proposal && (
                        <div className="flex  flex-col items-start gap-4 bg-white border-b-2 rounded-none p-3  text-black">
                          <div>{proposal.proposal}</div>

                          <div className="flex flex-col items-center gap-3 ">
                            <div className="flex items-center gap-2 bg-slate-100 shadow-md p-2">
                              <span>Start Time :</span>
                              <span className="font-semibold">
                                {convertUnixTimestamp(proposal.start_time)}
                              </span>
                            </div>
                            <div className="flex items-center gap-2 bg-slate-100 shadow-md p-2">
                              <span>End Time :</span>
                              <span className="font-semibold">
                                {" "}
                                {convertUnixTimestamp(proposal.ends_time)}{" "}
                              </span>
                            </div>
                          </div>
                          <div className="flex  items-center gap-3 ">
                            {loadingButtonFor ? (
                              <Button
                                size="sm"
                                disabled
                                className="flex items-center gap-1 bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-green-500 to-green-700 hover:to-green-800 "
                              >
                                Voting...
                              </Button>
                            ) : (
                              <Button
                                size="sm"
                                onClick={handleFor}
                                className="flex items-center gap-1 bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-green-500 to-green-700 hover:to-green-800 "
                              >
                                <span>Voted For :</span>
                                <span>{proposal.voted_for}</span>
                              </Button>
                            )}

                            {loadingButtonAgainst ? (
                              <Button
                                size="sm"
                                disabled
                                className="flex items-center gap-1 bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-red-500 to-red-700 hover:to-red-800"
                              >
                                Voting..
                              </Button>
                            ) : (
                              <Button
                                size="sm"
                                onClick={handleAgainst}
                                className="flex items-center gap-1 bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-red-500 to-red-700 hover:to-red-800"
                              >
                                <span>Voted Against : </span>
                                <span> {proposal.voted_against} </span>
                              </Button>
                            )}
                          </div>
                          <div className="text-xs">
                            Published by{" "}
                            <span className="text-purple-700">
                              {" "}
                              {clipAddress(proposal.id)}{" "}
                            </span>
                          </div>
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
                <div className="grid  md:grid-cols-3 grid-cols-1 gap-3 px-1">
                  <div className="bg-white col-span-2 rounded-md p-2">
               
                    <div>
                      {loadingCommnets ? (
                        <div className="flex h-[200px] items-center justify-center text-center  mt-5 ">
                          <div className="h-10 w-10 animate-spin rounded-full border-4 border-gray-200 border-t-blue-500" />
                        </div>
                      ) : (
                        <>
                          {comments &&
                            comments.map((comment, index) => (
                              <div
                                key={index}
                                className="flex items-start gap-4 bg-white border-b-2 rounded-none p-3  text-black"
                              >
                                <Avatar className="shrink-0 object-cover">
                                  <img src={comment.image_url} alt="Avatar" />
                                  <AvatarFallback>JD</AvatarFallback>
                                </Avatar>
                                <div className="flex-1 space-y-2">
                                  <div className="flex items-center justify-between">
                                    <div
                                      className="group"
                                      onClick={() =>
                                        navigate(
                                          `/userDashboard/userProfile/${comment.public_address}`
                                        )
                                      }
                                    >
                                      <div className="font-medium group-hover:underline cursor-pointer">
                                        {comment.user_name}
                                      </div>
                                      <div className="font-light group-hover:underline cursor-pointer">
                                        {clipAddress(comment.public_address)}
                                      </div>
                                    </div>
                                    {/* <div className="text-xs text-gray-700 dark:text-gray-700">2 days ago</div> */}
                                  </div>
                                  <p className="text-gray-800 dark:text-gray-400 font-medium">
                                    {comment.comment}
                                  </p>
                                  <div>
                                    {formatStandardDateTime(comment.timestamp)}
                                  </div>
                                </div>
                              </div>
                            ))}
                        </>
                      )}

                      <div className="flex flex-col items-end gap-2 mt-1">
                        <Textarea
                          placeholder="Add a new comment..."
                          className="flex-1 text-black"
                          value={comment}
                          required
                          onChange={(e) => setComment(e.target.value)}
                        />
                        <Button onClick={handleAddComment} variant="radix">
                          Submit
                        </Button>
                      </div>
                    </div>
                  </div>
                  <div className="col-span-1 bg-white shadow-sm flex items-center justify-center p-2 rounded-md">
                    Previous
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      ) : (
        <div className="flex flex-col items-center justify-center max-w-[1440px] mx-auto my-6 p-2">
          <div
            onClick={() => setShowForm(!form)}
            className="w-full cursor-pointer flex items-start m-2"
          >
            <ChevronLeft /> <span>Back</span>
          </div>
          <div className="text-4xl font-semibold p-4  bg-white w-full text-center">
            Proposal Form
          </div>
          <div className="flex items-center justify-center p-2 w-full mx-auto">
            <form className="w-1/2 flex flex-col gap-2" onSubmit={handleSubmit}>
              <div className="flex flex-col gap-2">
                <Label className="text-2xl p-1">Proposal</Label>
                <Textarea
                  placeholder="Type your proposal here ..."
                  value={proposalText}
                  onChange={(e) => setProposalText(e.target.value)}
                />
              </div>
              <div className="flex flex-col mt-3 gap-3 w-full ">
                <div className="text-xl p-1">Proposal Timing</div>
                <div className="flex items-center justify-between">
                  <div>To:</div>
                  <label className="">
                    <DatePicker
                      selected={startDate}
                      onChange={(date) => setStartDate(date)}
                      customInput={<CustomDatePicker />}
                    />
                  </label>
                  <div>From:</div>
                  <label>
                    <DatePicker
                      selected={endDate}
                      onChange={(date) => setEndDate(date)}
                      customInput={<CustomDatePicker />}
                    />
                  </label>
                </div>

                <div className="flex flex-col gap-2">
                  <Label className="text-2xl p-1">Minimum Quorum</Label>
                  <Input
                    placeholder="Enter Minimum quorum"
                    type="number"
                    value={minimumQuorum}
                    onChange={(e) => setMinimumQuorum(e.target.value)}
                  />
                </div>
              </div>
              {loadingButton ? (
                <Button variant="radix" disabled className="w-full mt-2">
                  Submitting....
                </Button>
              ) : (
                <Button variant="radix" className="w-full mt-2">
                  Submit Proposal
                </Button>
              )}
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default Proposals;
