import { Button } from "@/components/ui/button";
import { useState } from "react";
import Createyourowndao from "./Explore/CreateYouOwnDoa";
import Template from "./Explore/Template";
import Activity from "./Explore/Activity";

const Create = () => {
    const [activeTab, setActiveTab] = useState(0);

    const tabs = [
      { label: 'Create your Own DAO', content: <Createyourowndao/> },
      { label: 'Template', content: <Template/> },
      { label: 'Platform Activity', content: <Activity/> },
    
    ];
  return (
    <div className="min-h-screen py-10 px-5 bg-blue-50">
      <div className="w-full max-w-[1440px] mx-auto mt-10 bg-white pt-5 rounded-xl shadow-md">
      <div className="flex  gap-4 md:w-full px-2 flex-wrap">
        {tabs.map((tab, index) => (
          <Button
            key={index}
            variant={activeTab===index?"radix":"link"}
            className={`flex-1 py-2 px-4 text-center focus:outline-none ${
              activeTab === index ? '' : 'text-gray-600'
            }`}
            onClick={() => setActiveTab(index)}
          >
            {tab.label}
          </Button>
        ))}
      </div>
      <div className="p-4">
        {tabs[activeTab].content}
      </div>
    </div>
    </div>
  );
};

export default Create;
