
import InstructionView from "./Create/components/InstructionView";
import useViewStore from "@/store/view";
import TemplateView from "./Create/components/TemplateView";
import DescribeView from "./Create/components/DescribeDao";
import DeployView from "./Create/components/DeployView";
import GridPattern from "@/components/ui/myComponents/grid-bg";

const Create = () => {
  const {view} = useViewStore();
  return (
    <div className="min-h-screen py-10 px-5 bg-purple-50 relative">
       <GridPattern
        squares={[
          [4, 4],
          [5, 1],
          [8, 2],
          [5, 3],
          [5, 5],
          [10, 10],
          [12, 15],
          [15, 10],
          [10, 15],
          [15, 10],
          [10, 15],
          [15, 10],
        ]}/>
      {view === "1" && (
       <InstructionView/>
      )}
         {view === "2" && (
       <TemplateView/>
      )}
            {view === "3" && (
       <DescribeView/>
      )}
              {view === "4" && (
       <DeployView/>
      )}
    </div>
  );
};

export default Create;
