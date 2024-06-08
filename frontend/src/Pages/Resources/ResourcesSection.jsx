import ResourceCard from "./Resourcard";

const ResourceSection = () => {
  return (
    <div className="min-h-screen flex flex-col items-start   text-black max-w-[1000px] mx-auto ">
      <div className="flex flex-col  items-start  gap-5 justify-center w-full p-5">
        <div className="text-4xl font-semibold">
            Get Inspiration
        </div>
        <p className="md:w-2/3 font-thin">
        Don&apos;t know where to start? Learn from projects that govern onchain with Aragon&apos;s DAO frameworks, and discover plugins that unlock powerful possibilities.   
        </p>
      </div>
      <div className="p-5 grid md:grid-cols-3 grid-cols-1 w-full max-w-[1000px] mx-auto gap-7">
        <ResourceCard/>
        <ResourceCard/>

        <ResourceCard/>

      </div>
    </div>
  );
};

export default ResourceSection;
