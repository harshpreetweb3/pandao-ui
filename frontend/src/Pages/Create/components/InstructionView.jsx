import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { ChevronRight, CirclePlus, Pen, ShieldCheck } from "lucide-react";
import { StepsCard } from "./StepsCard";
import useViewStore from "@/store/view";

const InstructionView = () => {
  const { setView } = useViewStore();

  return (
    <div className="max-w-[1300px] mx-auto mt-20">
      <Card className="bg-white text-black mt-10 p-12 flex flex-col gap-3 rounded-xl shadow-sm">
        <div className="text-4xl font-semibold">Build your DAO</div>
        <div className="flex md:flex-row flex-col items-center justify-between gap-3">
          <span className="w-full">
            Start simple and learn as you go. You can always evolve your DAO in
            the future.
          </span>
          <Button
            onClick={() => setView("2")}
            className="w-full md:w-1/4 group"
            variant="radix"
          >
            <span>Build you DAO</span>
            <ChevronRight className="h-4 w-5 group-hover:translate-x-2 duration-200 transition-transform" />
          </Button>
        </div>
      </Card>
      <div className="flex md:flex-row flex-col items-center justify-center  gap-5 mt-2 mb-5">
        <StepsCard title="Select Template" step="Step 1" icon={CirclePlus} />
        <StepsCard title="Describe your DAO" step="Step 2" icon={Pen} />
        <StepsCard title="Deploy" step="Step 3" icon={ShieldCheck} />
       
      </div>
    </div>
  );
};

export default InstructionView;
