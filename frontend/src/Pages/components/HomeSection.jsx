import { Button } from "../../components/ui/button";

const HomeSection = () => {
  return (
    <div className="bg-[radial-gradient(ellipse_at_left,_var(--tw-gradient-stops))] from-[#281038] from-0% via-[#181734] via-50%  to-[#0D1E3B] to-100% ">
 <div className="h-screen flex items-center  justify-between  text-white max-w-[1440px] mx-auto">
      <div className="flex flex-col  items-start  gap-5 justify-center w-full p-5">
        <div className="text-5xl font-semibold tracking-wider leading-[55px] ">
          Bringing Governance to All: Effortless, Effective, Empowering.
        </div>
        <p className="text-xl">
          Making Blockchain Accessible and DAO Governance Effortless.
        </p>
        <Button className="bg-green-700">Get Started</Button>
      </div>
      <div className="flex items-center justify-center w-full  h-full">
        <div className=" h-full bg-[url('/connected_boxes.png')] w-full  object-cover bg-no-repeat flex items-center justify-center "></div>
      </div>
    </div>
    </div>
   
  );
};

export default HomeSection;
