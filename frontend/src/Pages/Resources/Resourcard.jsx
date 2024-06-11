import { Card } from "@/components/ui/card";
import {  Lock } from "lucide-react";
import { useNavigate } from "react-router-dom";

const ResourceCard = ({title,link}) => {
    const navigate=useNavigate()
    return ( <Card className="rounded-3xl shadow-sm hover:shadow-2xl" onClick={()=>navigate(link)} >
        <div className="p-6 h-[120px] ">
        <div className="font-light">
            Guide
        </div>
        <p className="">
           {title}
        </p>
        </div>
      
        <div className="bg-gradient-to-r from-indigo-500 hover:from-indigo-400 to-purple-500 hover:to-purple-600 duration-300 transition-transform h-[150px] flex items-center justify-center rounded-b-3xl">

            <Lock className="text-white h-16 w-16"/>

        </div>
    </Card> );
}
 
export default ResourceCard;