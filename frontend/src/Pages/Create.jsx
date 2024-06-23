import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { ChevronRight, CirclePlus, Pen, ShieldCheck } from "lucide-react";

const StepsCard = ({step,title,icon:Icon}) => {
  return (
  <Card className="bg-white w-full text-black mt-10 p-5 flex flex-col gap-3 rounded-xl shadow-sm h-64">
    <div className="bg-purple-50 rounded-md text-center flex items-center justify-center h-36">
      <Icon className="h-16 w-16 text-purple-400" />
    </div>
    <div>
      <div className="font-light">{step}</div>
      <div className="font-semibold">{title}</div>
    </div>
  </Card> );
};

const Create = () => {
  return (
    <div className="min-h-screen py-10 px-5 bg-purple-50">
      <div className="max-w-[1000px] mx-auto mt-20">
        <Card className="bg-white text-black mt-10 p-12 flex flex-col gap-3 rounded-xl shadow-sm">
          <div className="text-4xl font-semibold">Build your DAO</div>
          <div className="flex md:flex-row flex-col items-center justify-between gap-3">
            <span className="w-full">
              Start simple and learn as you go. You can always evolve your DAO
              in the future.
            </span>
            <Button className="w-full md:w-1/3 group" variant="radix">
              <span>Build you DAO</span>
              <ChevronRight className="h-4 w-5 group-hover:translate-x-2 duration-200 transition-transform" />
            </Button>
          </div>
        </Card>
        <div className="grid grid-cols-4 w-full gap-5 ">
          <StepsCard title="Select Template" step="Step 1" icon={CirclePlus}/>
          <StepsCard title="Describe your DAO" step="Step 2" icon={Pen}/>
          <StepsCard title="Deploy" step="Step 3" icon={ShieldCheck}/>
        </div>
      </div>
    </div>
  );
};

export default Create;
