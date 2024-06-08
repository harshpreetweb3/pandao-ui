import { Card } from "@/components/ui/card";
import { BookKey, Lock } from "lucide-react";

const ResourceCard = () => {
    return ( <Card className="rounded-3xl shadow-xl " >
        <div className="p-6 h-[120px] ">
        <div className="font-light">
            Guide
        </div>
        <p className="">
            Optimistic Dual Governance Plugin
        </p>
        </div>
      
        <div className="bg-gradient-to-r from-indigo-500 hover:from-indigo-400 to-purple-500 hover:to-purple-600 duration-300 transition-transform h-[150px] flex items-center justify-center rounded-b-3xl">

            <Lock className="text-white h-16 w-16"/>

        </div>
    </Card> );
}
 
export default ResourceCard;