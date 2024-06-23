
import InstructionView from "./Create/components/InstructionView";
import useViewStore from "@/store/view";

const Create = () => {
  const {view} = useViewStore();
  return (
    <div className="min-h-screen py-10 px-5 bg-purple-50">
      {view === "1" && (
       <InstructionView/>
      )}
    </div>
  );
};

export default Create;
