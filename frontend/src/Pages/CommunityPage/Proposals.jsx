import { useAccount } from '@/AccountContext'
import { Avatar, AvatarFallback } from '@/components/ui/avatar'
import { Button } from '@/components/ui/button'
import { Card } from '@/components/ui/card'
import { Label } from '@/components/ui/label'
import { Textarea } from '@/components/ui/textarea'
import { clipAddress } from '@/utils/functions/ClipAddress'
import axios from 'axios'
import { ChevronLeft, HandHelping } from 'lucide-react'
import { useEffect, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import DatePicker from 'react-datepicker'
import 'react-datepicker/dist/react-datepicker.css'
import CustomDatePicker from './components/CustomDatePicker'
import { Input } from '@/components/ui/input'
import { useSendTransaction } from '@/hooks/useSendTransaction'
import { toast } from 'sonner'
import { convertUnixTimestamp } from '@/utils/functions/ConvertDate'
import { formatStandardDateTime } from '@/utils/functions/convertActivityData'

const Proposals = () => {
  const { accounts } = useAccount()
  const [activeProposal, setActiveProposal] = useState(null)
  const [vote, setVote] = useState(Boolean)
  const navigate = useNavigate()
  const params = useParams()
  const [proposal, setProposal] = useState('')
  const [comment, setComment] = useState('')
  const [loadingCom, setLoadingCom] = useState(false)
  const [loading, setLoading] = useState(true)
  const [loadingCommnets, setLoadingComments] = useState(true)
  const [loadingAgainst, setLoadingAgainst] = useState(true)
  const [loadingFor, setLoadingFor] = useState(true)
  const [loadingButtonAgainst, setLoadingButtonAgainst] = useState(false)
  const [loadingButtonFor, setLoadingButtonFor] = useState(false)
  const [loadingButton, setLoadingButton] = useState(false)
  const [form, setShowForm] = useState(true)
  const [bondIssuerAddress, setBondIssuerAddress] = useState('')
  const [targetXrdAmount, setTargetXrdAmount] = useState('')

  const [startDate, setStartDate] = useState(new Date())
  const [endDate, setEndDate] = useState(new Date())
  const [startTime, setStartTime] = useState('00:00')
  const [endTime, setEndTime] = useState('23:59')
  const [comments, setComments] = useState([])
  const [minimumQuorum, setMinimumQuorum] = useState('')
  const [proposalText, setProposalText] = useState('')
  const [proposalDescription, setProposalDescription] = useState('')
  const [manifest, setManifest] = useState('')
  const [manifestForVoteAgainst, setManifestForVoteAgainst] = useState('')
  const [manifestForVoteFor, setManifestForVoteFor] = useState('')
  const sendTransaction = useSendTransaction()
  const handleAddComment = async () => {
    if (!activeProposal || !activeProposal.id) {
      toast.error('Proposal not loaded')
      return
    }
    if (comment.trim() === '') {
      toast.error('Add Something')
      return
    }
    const data = {
      user_addr: accounts[0].address,

      comment: comment,
      proposal_id: activeProposal.id,
    }
    setLoadingCom(true)
    try {
      const response = await axios.post(
        `${import.meta.env.VITE_BACKEND_URL}/community/proposal/comments`,
        data,
      )
      console.log('Comment Response:', response.data)
      toast.success('Comment Added')
      setComment('')
      fetchProposalsComments()
      setLoadingCom(false)
    } catch (error) {
      console.error('Error adding comment:', error)
    } finally {
      setLoadingCom(false)
      setComment('')
    }
  }
  const fetchProposals = async () => {
    try {
      const res = await axios.get(
        `${import.meta.env.VITE_BACKEND_URL}/community/proposal/active/${
          params.id
        }`,
      )
      console.log(res.data, 'res.data')
      setProposal(res.data)
      setLoading(false)
    } catch (error) {
      console.error('Error fetching blueprint data:', error)
    } finally {
      setLoading(false)
    }
  }
  const fetchProposalsComments = async () => {
    if (!activeProposal || !activeProposal.id) {
      console.error('Proposal not available for fetching comments.')
      return
    }
    try {
      const res = await axios.get(
        `${import.meta.env.VITE_BACKEND_URL}/community/proposal/comments/${
          activeProposal.id
        }`,
      )
      setComments(res.data)
      console.log(res.data)
      setLoadingComments(false)
    } catch (error) {
      console.error('Error fetching blueprint data:', error)
    }
  }

  const handleSubmit = async (e) => {
    e.preventDefault()

    // Validate form inputs
    if (
      !proposalText ||
      !startDate ||
      !endDate ||
      !minimumQuorum ||
      !proposalDescription ||
      !bondIssuerAddress ||
      !targetXrdAmount ||
      !startTime ||
      !endTime
    ) {
      alert('Please fill out all fields.')
      return
    }
    const startDateTime = new Date(startDate)
    const [startHours, startMinutes] = startTime.split(':')
    startDateTime.setHours(parseInt(startHours), parseInt(startMinutes), 0, 0)

    const endDateTime = new Date(endDate)
    const [endHours, endMinutes] = endTime.split(':')
    endDateTime.setHours(parseInt(endHours), parseInt(endMinutes), 59, 0)
    try {
      setLoadingButton(true)
      const res = await axios.post(
        `${import.meta.env.VITE_BACKEND_URL}/manifest/build/praposal`,

        {
          userAddress: accounts[0].address,
          community_id: params.id,
          minimumquorum: parseInt(minimumQuorum),
          start_time: JSON.stringify(
            Math.floor(startDateTime.getTime() / 1000),
          ),
          end_time: JSON.stringify(Math.floor(endDateTime.getTime() / 1000)),
          proposal: proposalText,
          description: proposalDescription,
          bond_issuer_address: bondIssuerAddress,
          target_xrd_amount: targetXrdAmount,
        },
      )

      // Handle successful submission (e.g., navigate to success page, show confirmation)
      console.log('Proposal submitted successfully:', res.data)
      setManifest(res.data)

      // Optionally update UI or navigate to another page after successful submission
    } catch (error) {
      console.error('Error submitting proposal:', error)
      // Handle error (e.g., show error message to user)
    }
    const { receipt } = await sendTransaction(manifest).finally(() => {
      setLoading(false)
      setLoadingButton(false)
    })
    let txId = receipt.transaction.intent_hash
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
              'Content-Type': 'application/json',
            },
          },
        )
        console.log(response.data)
        toast.success('Proposal Submitted')
        setLoadingButton(false)
      } catch (error) {
        toast.error('Something went wrong')
        setLoadingButton(false)
      }
    }
  }
  const handleAgainst = async () => {
    setVote(true)
    setLoadingButtonAgainst(true)

    try {
      // First, post the vote
      const res = await axios.post(
        `${import.meta.env.VITE_BACKEND_URL}/manifest/proposal/vote`,
        {
          proposal_address: activeProposal.proposal_address,
          userAddress: accounts[0].address,
          vote_against: vote,
        },
      )

      console.log('Vote submitted successfully:', res.data)
      setManifestForVoteAgainst(res.data) // Store vote data for further use

      // Send the transaction
      const { receipt } = await sendTransaction(res.data) // Use the response data for the transaction
      let txId = receipt.transaction.intent_hash

      if (txId) {
        try {
          // Post transaction ID to backend
          const response = await axios.post(
            `${import.meta.env.VITE_BACKEND_URL}/submit-tx`,
            {
              tx_id: txId,
              user_address: accounts[0].address,
            },
            {
              headers: {
                'Content-Type': 'application/json',
              },
            },
          )

          console.log(response.data)
          toast.success('Vote Submitted')
          fetchProposals()
        } catch (error) {
          toast.error('Something went wrong while submitting the transaction')
          console.error(error)
        }
      }
    } catch (error) {
      if (error.response.data.detail.error === 'does not hold any token') {
        toast.error('Please buy some token first before voting')
        return
      }
      toast.error('Something Went wrong')
      console.error('Error submitting vote:', error)
    } finally {
      setLoadingAgainst(false)
      setLoadingButtonAgainst(false)
    }
  }

  const handleFor = async () => {
    setVote(false)
    setLoadingButtonFor(true)

    try {
      // First, post the vote
      const res = await axios.post(
        `${import.meta.env.VITE_BACKEND_URL}/manifest/proposal/vote`,
        {
          proposal_address: activeProposal.proposal_address,
          userAddress: accounts[0].address,
          vote_against: vote,
        },
      )

      console.log('Vote submitted successfully:', res.data)
      setManifestForVoteFor(res.data) // Store vote data for further use

      // Send the transaction
      const { receipt } = await sendTransaction(res.data) // Use the response data for the transaction
      let txId = receipt.transaction.intent_hash

      if (txId) {
        try {
          // Post transaction ID to backend
          const response = await axios.post(
            `${import.meta.env.VITE_BACKEND_URL}/submit-tx`,
            {
              tx_id: txId,
              user_address: accounts[0].address,
            },
            {
              headers: {
                'Content-Type': 'application/json',
              },
            },
          )

          console.log(response.data)
          toast.success('Vote Submitted')
          fetchProposals()
        } catch (error) {
          toast.error('Something went wrong while submitting the transaction')
          console.error(error)
        }
      }
    } catch (error) {
      if (error.response.data.detail.error === 'does not hold any token') {
        toast.error('Please buy some token first before voting')
        return
      }
      toast.error('Something Went wrong')
      console.error('Error submitting vote:', error)
    } finally {
      setLoadingFor(false)
      setLoadingButtonFor(false)
    }
  }

  useEffect(() => {
    fetchProposals()
  }, [params.id])
  useEffect(() => {
    fetchProposalsComments()
  }, [activeProposal])
  if (!accounts || accounts.length === 0) {
    navigate('/')
    return null
  }
  return (
    <div className="pt-20 pb-10 items-start gap-3 justify-start min-h-screen overflow-hidden bg-blue-50  text-black px-2">
      {form && !activeProposal ? (
        <div className="flex md:flex-row flex-col gap-6 px-4 md:px-6 py-8 md:py-12 max-w-[1440px] mx-auto ">
          <div className="space-y-6 md:w-[100%] ">
            <div className="flex md:flex-row flex-col md:w-[100%] mx-auto gap-2">
              <div className="md:w-[100%] space-y-2  ">
                <div className="w-full  flex items-end justify-end">
                  <Button
                    onClick={() => {
                      setActiveProposal(null)
                      setShowForm(!form)
                    }}
                    variant="radix"
                  >
                    Create Proposal
                  </Button>
                </div>

                <Card className="bg-white md:w-[100%] mx-auto md:p-4 p-4 space-y-2 ">
                  <div className="p-2 border-b-2 -translate-x-2">
                    All Proposals.
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
                    <div className=" grid md:grid-cols-3 grid-cols-1 gap-5 mt-3">
                      {proposal.map((proposalItem, index) => (
                        <Card
                          key={index}
                          onClick={() => {
                            setActiveProposal(proposalItem)
                            setShowForm(null)
                          }}
                          className="flex flex-col hover:shadow-lg cursor-pointer items-start gap-4 bg-white border-b-2 rounded-none p-3 text-black"
                        >
                          <div className="capitalize font-semibold text-xl">
                            {proposalItem.proposal}
                          </div>

                          <div className="flex flex-col items-center gap-3">
                            <div className="flex items-center gap-2 bg-slate-100 shadow-md p-2">
                              <span>Start Time :</span>
                              <span className="font-semibold">
                                {convertUnixTimestamp(proposalItem.start_time)}
                              </span>
                            </div>
                            <div className="flex items-center gap-2 bg-slate-100 shadow-md p-2">
                              <span>End Time :</span>
                              <span className="font-semibold">
                                {convertUnixTimestamp(proposalItem.ends_time)}
                              </span>
                            </div>
                          </div>

                          {/* Voting buttons (commented out) */}
                          {/* <div className="flex items-center gap-3 ">
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
              <span>{proposalItem.voted_for}</span>
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
              <span> {proposalItem.voted_against} </span>
            </Button>
          )}
        </div> */}

                          <div className="text-xs">
                            Published by{' '}
                            <span className="text-purple-700">
                              {clipAddress(proposalItem.id)}
                            </span>
                          </div>
                        </Card>
                      ))}
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
      ) : activeProposal && !form ? (
        <div className="flex  flex-col  px-4 md:px-6 py-8 md:py-12 max-w-[1440px] mx-auto ">
          <div
            onClick={() => {
              setActiveProposal(null) // Reset active proposal
              setShowForm(false) // Ensure the form is hidden
            }}
            className="w-full cursor-pointer flex items-start m-2"
          >
            <ChevronLeft /> <span>Back</span>
          </div>
          <Card className="bg-white md:w-[100%] mx-auto md:p-4 p-4 space-y-2 ">
            <div className="p-2 border-b-2 -translate-x-2 font-bold capitalize text-4xl">
              {activeProposal.proposal}
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
            {!loading && activeProposal && (
              <div className="  gap-5 mt-3">
                {activeProposal && (
                  <div className="flex flex-col  items-start gap-4 bg-white  rounded-none p-3 text-black">
                    {/* <div className="capitalize font-semibold text-xl">
                      {activeProposal.proposal}
                    </div> */}

                    <div className="flex items-center gap-3">
                      <div className="flex items-center gap-2 bg-slate-100 shadow-md p-2">
                        <span>Start Time :</span>
                        <span className="font-semibold">
                          {convertUnixTimestamp(activeProposal.start_time)}
                        </span>
                      </div>
                      <div className="flex items-center gap-2 bg-slate-100 shadow-md p-2">
                        <span>End Time :</span>
                        <span className="font-semibold">
                          {convertUnixTimestamp(activeProposal.ends_time)}
                        </span>
                      </div>
                    </div>

                    {/* Voting buttons (commented out) */}
                    <div className="flex items-center gap-3 ">
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
              <span>{activeProposal.voted_for}</span>
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
              <span> {activeProposal.voted_against} </span>
            </Button>
          )}
        </div>

                    <div className="text-xs">
                      Published by{' '}
                      <span className="text-purple-700">
                        {clipAddress(activeProposal.id)}
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
            <div className="grid mt-3  md:grid-cols-3 grid-cols-1 gap-3 px-1">
                  <div className="bg-white col-span-2 rounded-md p-2">
                    <div>
                      {loadingCommnets && proposal ? (
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
                                          `/userDashboard/userProfile/${comment.public_address}`,
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
                                    <div className="text-xs text-gray-700 dark:text-gray-700">2 days ago</div>
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
                        <Button
                          onClick={handleAddComment}
                          variant="radix"
                          disabled={loadingCom}
                        >
                          {loadingCom ? 'Submiting...' : ' Submit'}
                        </Button>
                      </div>
                    </div>
                  </div>
                  <div className="col-span-1 bg-white shadow-sm flex items-center justify-center p-2 rounded-md">
                    Previous
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
              <div className="flex flex-col gap-2">
                <Label className="text-lg p-1">Proposal Description</Label>
                <Textarea
                  placeholder="Type your proposal description ..."
                  value={proposalDescription}
                  onChange={(e) => setProposalDescription(e.target.value)}
                />
              </div>
              <div className="flex flex-col mt-3 gap-3 w-full ">
                <div className="text-xl p-1">Proposal Timing</div>
                <div className="flex items-center justify-between space-x-2">
                  <div>To:</div>
                  <label className=" flex items-center">
                    <DatePicker
                      selected={startDate}
                      onChange={(date) => setStartDate(date)}
                      customInput={<CustomDatePicker />}
                    />
                    <Input
                      type="time"
                      value={startTime}
                      onChange={(e) => setStartTime(e.target.value)}
                      className="ml-2 w-fit"
                    />
                  </label>
                  <div>From:</div>
                  <label className="flex items-center ">
                    <DatePicker
                      selected={endDate}
                      onChange={(date) => setEndDate(date)}
                      customInput={<CustomDatePicker />}
                    />
                    <Input
                      type="time"
                      value={endTime}
                      onChange={(e) => setEndTime(e.target.value)}
                      className="ml-2 w-fit"
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
                <div className="flex flex-col gap-2">
                  <Label className="text-2xl p-1">Bond Issuer Address</Label>
                  <Input
                    placeholder="Enter Bond Issuer Address"
                    value={bondIssuerAddress}
                    onChange={(e) => setBondIssuerAddress(e.target.value)}
                  />
                </div>

                <div className="flex flex-col gap-2">
                  <Label className="text-2xl p-1">Target XRD Amount</Label>
                  <Input
                    placeholder="Enter Target XRD Amount"
                    type="number"
                    value={targetXrdAmount}
                    onChange={(e) => setTargetXrdAmount(e.target.value)}
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
  )
}

export default Proposals
