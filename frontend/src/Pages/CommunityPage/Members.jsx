import { useAccount } from "@/AccountContext";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import AvatarCircles from "@/components/ui/myComponents/avatarCircle";
import { Textarea } from "@/components/ui/textarea";
import { clipAddress } from "@/utils/functions/ClipAddress";
import axios from "axios";
import { ArrowBigLeft, ArrowRight, ChevronLeft, ChevronRight, Users } from "lucide-react";
import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";

const Members = () => {
  const { accounts } = useAccount();
  const navigate = useNavigate();
  const params = useParams();

  const [participants, setParticipants] = useState([]);
  const [loading, setLoading] = useState(true);

 




  const fetchParticipant = async () => {
    try {
      const res = await axios.get(
        `${import.meta.env.VITE_BACKEND_URL}/community/participant/${params.id}`
      );
      setParticipants(res.data);
      setLoading(false)
    } catch (error) {
      console.error("Error fetching blueprint data:", error);
    }
  };

  useEffect(() => {
  
    fetchParticipant();
  
  }, [params.id]);

  if (!accounts || accounts.length === 0) {
    navigate("/");
    return null;
  }
  console.log(participants.length);
  return (
    <div className="pt-20 pb-10 items-start gap-3 justify-start min-h-screen overflow-hidden bg-blue-50  text-black px-2">
      <div className="flex md:flex-row flex-col gap-6 px-4 md:px-6 py-8 md:py-12 max-w-[1440px] mx-auto ">
     
          <div className="space-y-6 md:w-[100%] ">
        
            <div className="flex md:flex-row flex-col md:w-[90%] mx-auto gap-2">
           
              <div className="md:w-[100%] space-y-6  ">
             
                <Card className="bg-white md:w-[100%] mx-auto md:p-10 p-4  space-y-10">
                  <div className="flex items-center justify-between">
                    <div className="bg-slate-200 w-fit p-2 rounded-full">
                      <Users className=" text-blue-700" />
                    </div>
                    <div>
                      <Button variant="radix" >
                        Manage members
                      </Button>
                    </div>
                  </div>
                  <div className="flex items-center justify-between">
                      <div className="text-3xl font-semibold">
                        {participants.length} Members
                      </div>
                      {
                        participants.length > 4 &&
                        <AvatarCircles numPeople={participants.length - 3} src1={participants[0].image_url} />

                      }
                    </div>
                </Card>
                {!loading && <Card className="bg-white md:w-[70%] mx-auto md:p-4 p-4 space-y-2 ">
                <div className="p-2 border-b-2 -translate-x-2">
                    Members
                </div>
                  {participants.length > 0 &&
                    participants.map((participant, index) => (

                      <Card
                        key={index}
                     
                        className="bg-white flex items-center justify-between gap-2 md:w-[100%] mx-auto  p-2 border-none shadow-none"
                      >
                        <div className="flex items-center gap-3">
                        <Avatar>
                          <AvatarImage
                            alt="Avatar"
                            src={participant.image_url}
                          />
                          <AvatarFallback>JD</AvatarFallback>
                        </Avatar>
                        <div className="text-left  cursor-pointer text-ellipsis overflow-hidden">
                          <p className="font-medium">
                            {participant.name || "Unnamed Participant"}
                          </p>
                          <div className="text-gray-black dark:text-gray-400 text-sm truncate">
                       {clipAddress(participant.participant || "")}  
                          </div>
                        </div>
                        </div>
                      
                        <div    onClick={() =>
                          navigate(`/userDashboard/userProfile/${participant.participant}`)
                        } className="text-left group border-2 px-2 py-2 rounded-md hover:text-blue-600 cursor-pointer hover:shadow-sm text-ellipsis overflow-hidden">
                        <ChevronRight className="h-5 w-5 group-hover:translate-x-1 duration-300 transition-transform"/>
                        </div>
                      </Card>
                    ))}
                </Card> }
                {loading && (
                   <div className="flex h-[200px] items-center justify-center text-center  mt-5 ">
                   <div className="h-10 w-10 animate-spin rounded-full border-4 border-gray-200 border-t-blue-500" />
                </div>
                )}
               
              </div>
            </div>

          
          </div>
      
 
      </div>
    </div>
  );
};

export default Members;
