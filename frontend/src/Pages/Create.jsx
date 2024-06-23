
import InstructionView from "./Create/components/InstructionView";
import useViewStore from "@/store/view";
import TemplateView from "./Create/components/TemplateView";
import DescribeView from "./Create/components/DescribeDao";

const Create = () => {
  const {view} = useViewStore();
  return (
    <div className="min-h-screen py-10 px-5 bg-purple-50">
      {view === "1" && (
       <InstructionView/>
      )}
         {view === "2" && (
       <TemplateView/>
      )}
            {view === "3" && (
       <DescribeView/>
      )}
    </div>
  );
};

export default Create;
