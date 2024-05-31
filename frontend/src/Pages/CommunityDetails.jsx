import { useAccount } from "@/AccountContext";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import axios from "axios";
import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";

const CommunityDetails = () => {
  const { accounts } = useAccount();
  const navigate = useNavigate();
  const params = useParams();
  const [data, setData] = useState([]);
  const [participants, setParticipants] = useState([]);

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
    } catch (error) {
      console.error("Error joining community:", error);
    }
  };

  useEffect(() => {
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
          `${import.meta.env.VITE_BACKEND_URL}/community/participant/${
            params.id
          }`
        );
        setParticipants(res.data);
      } catch (error) {
        console.error("Error fetching blueprint data:", error);
      }
    };
    fetchDetails();
    fetchParticipant();
  }, [params.id]);

  if (!accounts || accounts.length === 0) {
    navigate("/");
    return null;
  }

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
          </div>
        )}
        <div className="flex flex-col gap-3 md:w-[30%]">
          <h2 className="text-xl font-semibold">DAO Participants</h2>
          <div className="grid grid-cols-1 items-start justify-start gap-2">
            {participants.length > 0 &&
              participants.map((participant, index) => (
                <Card key={index} className="flex items-center gap-2 p-4 h-fit">
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
