import { useAccount } from "@/AccountContext";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Textarea } from "@/components/ui/textarea";
import { Globe } from "lucide-react";
import { useEffect, useState } from "react";
import { FaLinkedinIn, FaTiktok, FaXTwitter } from "react-icons/fa6";
import { useNavigate } from "react-router-dom";
import ImageUpdater from "../components/ImageUpdater";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import axios from "axios";
import { toast } from "sonner";

const EditPage = () => {
  const { accounts } = useAccount();
  const navigate = useNavigate();
  const [userData, setUserData] = useState({});
  const [fileUrl, setFileUrl] = useState("");
  const [coverUrl, setCoverUrl] = useState("");
  const [about, setAbout] = useState("");
  const [socialLinks, setSocialLinks] = useState({
    x_url: "",
    website_url: "",
    linkedin: "",
    tiktok: "",
  });

  // Fetch user data when the component mounts or when accounts change
  useEffect(() => {
    const fetchUserData = async () => {
      if (!accounts || accounts.length === 0) {
        navigate("/");
        return;
      }
      try {
        const res = await axios.get(
          `${import.meta.env.VITE_BACKEND_URL}/user/details/${accounts[0].address}`
        );
        const data = res.data;
        setUserData(data);
        setAbout(data.usermetadata.about);
        setCoverUrl(data.usermetadata.cover_url);
        setSocialLinks({
          x_url: data.usermetadata.x_url || "",
          website_url: data.usermetadata.website_url || "",
          linkedin: data.usermetadata.linkedin || "",
       
        });
      } catch (error) {
        console.error("Error fetching user data:", error);
      }
    };

    fetchUserData();
  }, [accounts, navigate]);

  const handleFileId = (id) => {
    const url = `https://ucarecdn.com/${id}/-/preview/1000x562/`;
    setFileUrl(url);
    console.log("Received file URL:", url);
  };
  const handleCoverId = (id) => {
    const url = `https://ucarecdn.com/${id}/-/preview/1000x562/`;
    setCoverUrl(url);
    console.log("Received file URL:", url);
  };

  const handleUpdateUser = async () => {
    try {
      const updatedData = {
        ...userData,
        about,
        image_url: fileUrl || userData.image_url,
        cocover_url: coverUrl,
        ...socialLinks,
      };
      await axios.patch(
        `${import.meta.env.VITE_BACKEND_URL}/user/update-user`,
        updatedData
      );
      setUserData(updatedData);
      navigate("/userDashboard")
      toast.success("Details Updated Successfully")
    } catch (error) {
      console.error("Error updating user data:", error);
    }
  };

  return (
    <div className="pt-20 px-4 min-h-screen bg-blue-50 overflow-hidden">
         <Card className="w-full relative flex md:flex-row flex-col shadow-md items-center md:items-start max-w-[1200px] mx-auto rounded-sm  text-black border-b-0 h-48">
            <img
               src={coverUrl || "/Pandao.png"}
              alt="Cover"
              className="aspect-video h-48 w-full object-cover"
            />
            <div className="absolute bottom-0  right-0  flex items-end justify-end -mr-20">
            <ImageUpdater onUploadSuccess={handleCoverId}  />

            </div>
          </Card>
      <Card className="border-0 rounded-t-none border-t-0   bg-white  md:top-20 flex md:flex-row flex-col md:items-start items-center h-full mt-1  max-w-[1200px] mx-auto gap-3 p-5">
        <CardHeader className="p-0 mt-4 flex flex-col items-center -translate-y-32">
          <Avatar className="h-72 w-72 border-[5px] border-purple-500">
            <AvatarImage
              src={fileUrl || userData.usermetadata?.image_url}
              className="h-72 w-72 object-cover"
            />
            <AvatarFallback>CN</AvatarFallback>
          </Avatar>
          <ImageUpdater onUploadSuccess={handleFileId} />
        </CardHeader>
        <CardContent className="text-xl font-bold flex flex-col gap-2 w-full px-2">
          <div className="text-black font-semibold text-4xl">
            {userData.name}
          </div>
          <Textarea
            value={about}
            onChange={(e) => setAbout(e.target.value)}
            className="w-full bg-transparent text-black"
            maxLength="150"
          />
          <div className="text-black text-sm mt-5" >Social Accounts</div>
          <div className="flex items-center w-full gap-2">
            <FaXTwitter className="text-black" />
            <input
              value={socialLinks.x_url}
              onChange={(e) =>
                setSocialLinks({ ...socialLinks, x_url: e.target.value })
              }
              placeholder="Your X url"
              className="px-3 py-1 text-sm w-full bg-transparent border-2 rounded-lg outline-none text-black"
            />
          </div>
          <div className="flex items-center w-full gap-2">
            <Globe className="text-black" />
            <input
              value={socialLinks.website_url}
              onChange={(e) =>
                setSocialLinks({
                  ...socialLinks,
                  website_url: e.target.value,
                })
              }
              placeholder="Your website URL"
              className="px-3 py-1 text-sm w-full bg-transparent border-2 rounded-lg outline-none text-black"
            />
          </div>
          <div className="flex items-center w-full gap-2">
            <FaLinkedinIn className="text-black" />
            <input
              value={socialLinks.linkedin}
              onChange={(e) =>
                setSocialLinks({
                  ...socialLinks,
                  linkedin: e.target.value,
                })
              }
              placeholder="Your LinkedIn"
              className="px-3 py-1 text-sm w-full bg-transparent border-2 rounded-lg outline-none text-black"
            />
          </div>
          {/* <div className="flex items-center w-full gap-2">
            <FaTiktok className="text-black" />
            <input
              value={socialLinks.tiktok}
              onChange={(e) =>
                setSocialLinks({ ...socialLinks, tiktok: e.target.value })
              }
              placeholder="Your Tiktok"
              className="px-3 py-1 text-sm w-full bg-transparent border-2 rounded-lg outline-none text-black"
            />
          </div> */}
          <div className="flex gap-2 items-center w-full">
            <Button
              onClick={handleUpdateUser}
              className="bg-green-600 hover:bg-green-700 border-2 w-full"
            >
              Save
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default EditPage;
