import { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate, useParams } from "react-router-dom";
import { useAccount } from "@/AccountContext";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";

import { Card, CardContent, CardHeader } from "@/components/ui/card";

import { Check, ChevronLeft, Copy, Globe } from "lucide-react";

import { FaLinkedinIn, FaTiktok, FaXTwitter } from "react-icons/fa6";
import { clipAddress } from "@/utils/functions/ClipAddress";
import { Button } from "@/components/ui/button";

const UserPublicProfile = () => {
  const { accounts } = useAccount();
  const navigate = useNavigate();
  const params = useParams();
  const [coverUrl, setCoverUrl] = useState("");

  const [copied, setCopied] = useState(false);
  const [data, setData] = useState([]);
  const [userData, setUserData] = useState({});
  const [edit, setEdit] = useState(false);
  const [fileUrl, setFileUrl] = useState("");
  const [about, setAbout] = useState("");
  const [socialLinks, setSocialLinks] = useState({
    x_url: "",
    website_url: "",
    linkedin: "",
    tiktok: "",
  });

  const handleCopy = (address) => {
    navigator.clipboard.writeText(address);
    setCopied(true);
    setTimeout(() => {
      setCopied(false);
    }, 1000);
  };

  //   const handleFileId = (id) => {
  //     const url = `https://ucarecdn.com/${id}/-/preview/1000x562/`;
  //     setFileUrl(url);
  //     console.log("Received file URL:", url);
  //   };

  useEffect(() => {
    const fetchBluePrint = async () => {
      try {
        const res = await axios.get(
          `${import.meta.env.VITE_BACKEND_URL}/community`
        );
        setData(res.data);
      } catch (error) {
        console.error("Error fetching blueprint data:", error);
      }
    };

    const fetchUserData = async () => {
      try {
        const res = await axios.get(
          `${import.meta.env.VITE_BACKEND_URL}/user/details/${params.id}`
        );
        setUserData(res.data);
        setAbout(res.data.about);
        setSocialLinks({
          x_url: res.data.x_url || "",
          website_url: res.data.website_url || "",
          linkedin: res.data.linkedin || "",
          tiktok: res.data.tiktok || "",
        });
      } catch (error) {
        console.error("Error fetching user data:", error);
      }
    };

    fetchBluePrint();
    fetchUserData();
  }, [accounts, params.id]);

  //   const handleUpdateUser = async () => {
  //     try {
  //       const updatedData = {
  //         ...userData,
  //         about,
  //         image_url: fileUrl || userData.image_url,
  //         ...socialLinks,
  //       };
  //       await axios.patch(
  //         `${import.meta.env.VITE_BACKEND_URL}/user/update-user`,
  //         updatedData
  //       );
  //       setUserData(updatedData);
  //       setEdit(false);
  //     } catch (error) {
  //       console.error("Error updating user data:", error);
  //     }
  //   };

  if (!accounts || accounts.length === 0) {
    navigate("/");
    return null;
  }

  if (params.id === accounts[0].address) {
    navigate("/userDashboard");
    return null;
  }

  return (
    <div className="pt-20 relative flex items-start gap-3 justify-start min-h-screen bg-blue-50 p-7">
      {userData && (
        <div className="flex flex-col w-full">
          <div className="w-full flex items-start justify-between mx-auto max-w-[1200px] ">
          <div onClick={()=>navigate(-1)} className="w-fit cursor-pointer  flex items-center h-10 group"><ChevronLeft className="group-hover:-translate-x-2 duration-300 transition-transform"/> <span>Back </span> </div>

          </div>
          <Card className="w-full flex md:flex-row flex-col shadow-md items-center md:items-start max-w-[1200px] mx-auto rounded-sm  text-black border-b-0 h-48">
          <img
  src={userData.usermetadata?.cover_url || "/Pandao.png"}
  alt="Cover"
  className="aspect-video h-48 w-full object-cover"
/>
          </Card>
          <Card className="w-full rounded-t-none border-t-0 flex md:flex-row flex-col shadow-md items-center md:items-start max-w-[1200px] mx-auto rounded-sm p-5 text-black ">
            <CardHeader className="p-0 -translate-y-32 ">
              <Avatar className="h-72 w-72 border-[5px] border-purple-400">
                {userData.usermetadata?.image_url && (
                  <AvatarImage
                    src={userData.usermetadata.image_url}
                    className="h-72 w-72 object-cover"
                  />
                )}
                <AvatarFallback>CN</AvatarFallback>
              </Avatar>
            </CardHeader>
            <CardContent className="text-xl  relative font-bold flex flex-col gap-2 w-full p-5 justify-between">
              <div className="flex flex-col gap-1">
                <div className="text-black font-semibold text-3xl">
                  {userData.name}
                </div>
                <div className="text-black font-light text-base text-left px-0">
                  {userData.usermetadata?.about}
                </div>
                <div className="py-1 w-[300px]  rounded-sm flex flex-wrap text-ellipsis overflow-hidden relative group">
                  {clipAddress(userData.public_address)}
                  <button
                    onClick={() => handleCopy(userData.public_address)}
                    disabled={copied}
                    className="py-0  text-black rounded-md px-2 h-6 text-xs absolute top-2 -right-2 group-hover:block "
                  >
                    {copied ? (
                      <Check className="h-4 w-4" />
                    ) : (
                      <Copy className="h-4 w-4" />
                    )}
                  </button>
                </div>
                {socialLinks.x_url && (
                  <div className="flex items-center w-full gap-2">
                    <FaXTwitter className="text-black" />
                    <div className="px-3 py-1 text-sm w-full bg-transparent  text-black">
                      {socialLinks.x_url}
                    </div>
                  </div>
                )}
                {socialLinks.website_url && (
                  <div className="flex items-center w-full gap-2">
                    <Globe className="text-black" />
                    <div className="px-3 py-1 text-sm w-full bg-transparent  text-black">
                      {socialLinks.website_url}
                    </div>
                  </div>
                )}
                {socialLinks.linkedin && (
                  <div className="flex items-center w-full gap-2">
                    <FaLinkedinIn className="text-black" />
                    <div className="px-3 py-1 text-sm w-full bg-transparent  text-black">
                      {socialLinks.linkedin}
                    </div>
                  </div>
                )}{" "}
                {/* {socialLinks.tiktok && (
                  <div className="flex items-center w-full gap-2">
                    <FaTiktok className="text-black" />
                    <div className="px-3 py-1 text-sm w-full bg-transparent  text-black">
                      {socialLinks.tiktok}
                    </div>
                  </div>
                )} */}
              </div>
            </CardContent>
          </Card>
        </div>
      )}
    </div>
  );
};

export default UserPublicProfile;
