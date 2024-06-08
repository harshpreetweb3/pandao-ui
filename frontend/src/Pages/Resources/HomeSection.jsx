import { ResourcesAnimation } from "./ResourcesAnimation";

const HomeSection = () => {
  // const some= "bg-gradient-to-r from-[#0097b2] from-20%  to-[#7ed957]"
  // const some2="bg-gradient-to-r from-[#375e91] from-0%  to-[#68237b]"
  return (
    <>
      <div className="bg-gradient-to-r from-[#375e91] from-0%  to-[#68237b]">
        <div className="h-[600px] flex md:flex-row flex-col items-center  justify-center  text-white max-w-[1440px] mx-auto">
          <div className="flex flex-col  items-start  gap-5 justify-center  p-5 w-full h-full object-cover bg-no-repeat md:bg-none">
            <div className="md:text-7xl text-3xl font-semibold tracking-wider md:leading-[55px] leading-[40px] ">
              Resource Library{" "}
            </div>
            <p className="text-xl">
              Making Blockchain Accessible and DAO Governance Effortless.
            </p>
          </div>

          <ResourcesAnimation />
        </div>
      </div>
    </>
  );
};

export default HomeSection;
