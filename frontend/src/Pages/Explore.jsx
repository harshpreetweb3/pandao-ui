import { Button } from "@/components/ui/button";
import { useState } from "react";
import Createyourowndao from "./Explore/CreateYouOwnDoa";
import Template from "./Explore/Template";

const Explore = () => {
    const [activeTab, setActiveTab] = useState(0);

    const tabs = [
      { label: 'Create your Own DAO', content: <Createyourowndao/> },
      { label: 'Template', content: <Template/> },
    
    ];
  return (
    <div className="min-h-screen py-10 px-5 bg-blue-50">
      <div className="w-full max-w-[1440px] mx-auto mt-10 bg-white pt-5 rounded-xl shadow-md">
      <div className="flex  gap-4 w-1/4 px-2">
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

export default Explore;