import { Card } from "@/components/ui/card";
import { useEffect, useState } from "react";
import {
  VerticalTimeline,
  VerticalTimelineElement,
} from "react-vertical-timeline-component";
import axios from 'axios';
import { clipAddress } from "@/utils/functions/ClipAddress";

const Activity = () => {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchBluePrint = async () => {
      try {
        const res = await axios.get(`${import.meta.env.VITE_BACKEND_URL}/activity`);
        setData(res.data);
      } catch (error) {
        console.error("Error fetching blueprint data:", error);
      } finally {
        setLoading(false);
      }
    };
    fetchBluePrint();
  }, []);

  if (loading) {
    return <div className="h-36 flex items-center justify-center">Loading...</div>;
  }

  return (
    <div className="w-full">


        <div className="flex flex-col gap-2">
          {data.map((item, index) => (
            <Card
              key={index}
           className="p-2"
            >
                <div className="flex items-center gap-3 ">
                {item.user_image_url && <img src={item.user_image_url} alt={item.user_name} className="rounded-full object-cover h-[50px] w-[50px] " />}
                <div>
                <h3 className="font-semibold">{item.user_name}</h3>
                <h4 className="vertical-timeline-element-subtitle"> { clipAddress( item.user_address)}</h4>

                </div>

                </div>
              <p className="p-2">
                {item.info}
              </p>
            </Card>
          ))}
        </div>
      
    </div>
  );
};

export default Activity;
