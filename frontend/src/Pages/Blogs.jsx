import { useNavigate } from "react-router-dom";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { useEffect, useState } from "react";
import axios from "axios";
import { SkeletonCard } from "./GlobalComponents/Skeleton";
import { Card } from "@/components/ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Banknote, Users } from "lucide-react";
import { useAccount } from "@/AccountContext";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Skeleton } from "@/components/ui/skeleton";
const Blog = () => {
  const navigate = useNavigate();
  const { accounts } = useAccount();
  const [open, setOpen] = useState(false);
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);
  useEffect(() => {
    const fetchBluePrint = async () => {
      try {
        const res = await axios.get(
          `${import.meta.env.VITE_BACKEND_URL}/blogs`
        );
        setData(res.data);
      } catch (error) {
        console.error("Error fetching blueprint data:", error);
      } finally {
        setLoading(false);
      }
    };
    fetchBluePrint();
  }, []);

  return (
    <div className="bg-blue-50">
      <div className="min-h-screen pt-20 max-w-[1200px] mx-auto ">
        <div className="px-2 mt-2 text-3xl font-semibold">Blogs</div>
        {!loading && data.length === 0 && (
          <div className="flex items-center justify-center bg-white mt-3 h-32 rounded-lg shadow-xl">
            No Blog
          </div>
        )}
        {loading ? (
          <div className="mt-5 grid md:grid-cols-3 grid-cols-1 gap-3 pb-20">
            <Skeleton className="h-[300px] bg-purple-200" />
            <Skeleton className="h-[300px] bg-purple-200" />
            <Skeleton className="h-[300px] bg-purple-200" />
            <Skeleton className="h-[300px] bg-purple-200" />
            <Skeleton className="h-[300px] bg-purple-200" />
            <Skeleton className="h-[300px] bg-purple-200" />
          </div>
        ) : (
          <div className="mt-5 grid md:grid-cols-3 grid-cols-1 gap-4 px-2 pb-10">
            {data.length > 0 &&
              data.map((dao, index) => (
                <Card
                  key={index}
                  onClick={() => {
                    navigate(`${dao.link}`);
                  }}
                  className="flex overflow-hidden flex-col items-start justify-start  h-[350px] cursor-pointer hover:shadow-md  "
                >
                  <img
                    src={dao.thumbnail_image}
                    alt="alt"
                    className="w-full h-40 object-cover aspect-video"
                  />

                  <div className="text-xl font-semibold p-5 ">{dao.title}</div>
                  {/* <div className="text-sm font-semibold">{dao.owner.name}</div> */}

                  <div className="line-clamp-4 text-sm px-5 ">
                    {dao.description}
                  </div>
                </Card>
              ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default Blog;
