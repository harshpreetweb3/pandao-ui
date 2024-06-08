import { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate, useParams } from "react-router-dom";
import { useAccount } from "@/AccountContext";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { Check, Copy, Globe } from "lucide-react";
import ImageUpdater from "./components/ImageUpdater";
import { Textarea } from "@/components/ui/textarea";
import { FaLinkedinIn, FaTiktok, FaXTwitter } from "react-icons/fa6";

const UserPublicProfile = () => {
  const { accounts } = useAccount();
  const navigate = useNavigate();
  const params=useParams()

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
        console.log(res.data);
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
  }, [accounts,params.id]);

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
    navigate('/userDashboard');
    return null;
  }

  return (
    <div className="pt-20 relative flex items-start gap-3 justify-start min-h-screen bg-blue-50 p-7">
      {userData && (
        <div className="max-w-[1440px] flex md:flex-row flex-col w-full mx-auto gap-2">
{/*        
            <Card className="border-0 md:w-[25%] md:sticky md:top-20 flex flex-col items-center h-full mt-1 bg-transparent max-w-[1440px] gap-3">
              <CardHeader className="p-0 mt-4 flex flex-col items-center">
                <Avatar className="h-72 w-72 border-[5px] border-pink-500">
                  <AvatarImage
                    src={fileUrl || userData.image_url}
                    className="h-72 w-72 object-cover"
                  />
                  <AvatarFallback>CN</AvatarFallback>
                </Avatar>
                <ImageUpdater onUploadSuccess={handleFileId} />
              </CardHeader>
              <CardContent className="text-xl font-bold flex flex-col gap-2 w-full px-2">
                <div className="text-white font-semibold text-4xl">
                  {userData.name}
                </div>
                <Textarea
                  value={about}
                  onChange={(e) => setAbout(e.target.value)}
                  className="w-full bg-transparent text-white"
                  maxLength="150"
                />
                <div
                  className="bg-purple-400 py-1 px-2 rounded-sm flex flex-wrap text-ellipsis overflow-hidden relative group"
                  style={{ maxWidth: "100%" }}
                >
                  <TooltipProvider>
                    <Tooltip>
                      <TooltipTrigger> {accounts[0].address}</TooltipTrigger>
                      <TooltipContent>{accounts[0].address}</TooltipContent>
                    </Tooltip>
                  </TooltipProvider>
                  <button
                    onClick={() => handleCopy(accounts[0].address)}
                    disabled={copied}
                    className="py-0 bg-purple-500 text-white rounded-md px-2 h-6 text-xs absolute top-2 right-2 group-hover:block hidden"
                  >
                    {copied ? (
                      <Check className="h-4 w-4" />
                    ) : (
                      <Copy className="h-4 w-4" />
                    )}
                  </button>
                </div>
                <div className="text-white text-sm">Social Accounts</div>
                <div className="flex items-center w-full gap-2">
                  <FaXTwitter className="text-white" />
                  <input
                    value={socialLinks.x_url}
                    onChange={(e) =>
                      setSocialLinks({ ...socialLinks, x_url: e.target.value })
                    }
                    placeholder="Your X url"
                    className="px-3 py-1 text-sm w-full bg-transparent border-2 rounded-lg outline-none text-white"
                  />
                </div>
                <div className="flex items-center w-full gap-2">
                  <Globe className="text-white" />
                  <input
                    value={socialLinks.website_url}
                    onChange={(e) =>
                      setSocialLinks({
                        ...socialLinks,
                        website_url: e.target.value,
                      })
                    }
                    placeholder="Your website URL"
                    className="px-3 py-1 text-sm w-full bg-transparent border-2 rounded-lg outline-none text-white"
                  />
                </div>
                <div className="flex items-center w-full gap-2">
                  <FaLinkedinIn className="text-white" />
                  <input
                    value={socialLinks.linkedin}
                    onChange={(e) =>
                      setSocialLinks({
                        ...socialLinks,
                        linkedin: e.target.value,
                      })
                    }
                    placeholder="Your LinkedIn"
                    className="px-3 py-1 text-sm w-full bg-transparent border-2 rounded-lg outline-none text-white"
                  />
                </div>{" "}
                <div className="flex items-center w-full gap-2">
                  <FaTiktok className="text-white" />
                  <input
                    value={socialLinks.tiktok}
                    onChange={(e) =>
                      setSocialLinks({ ...socialLinks, tiktok: e.target.value })
                    }
                    placeholder="Your Placeholder"
                    className="px-3 py-1 text-sm w-full bg-transparent border-2 rounded-lg outline-none text-white"
                  />
                </div>
                <div className="flex gap-2 items-center">
                  <Button
                    onClick={handleUpdateUser}
                    className="bg-green-600 hover:bg-green-700 border-2"
                  >
                    Save
                  </Button>
                  <Button
                    onClick={() => setEdit(false)}
                    className="bg-slate-700 border-2 "
                  >
                    Cancel
                  </Button>
                </div>
              </CardContent>
            </Card> */}
       
            <Card className="border-0 md:w-[25%] md:sticky md:top-20 flex flex-col items-center h-full mt-1 bg-transparent max-w-[1440px]">
              <CardHeader className="p-0 mt-4">
                <Avatar className="h-72 w-72 border-[5px] border-pink-500">
                  <AvatarImage
                    src={userData.image_url}
                    className="h-72 w-72 object-cover"
                  />
                  <AvatarFallback>CN</AvatarFallback>
                </Avatar>
              </CardHeader>
              <CardContent className="text-xl font-bold flex flex-col gap-2 w-full px-2">
                <div className="text-white font-semibold text-4xl">
                  {userData.name}
                </div>
                <div className="text-white font-light text-lg text-left px-0">
                  {userData.about}
                </div>
                <div
                  className="bg-purple-400 py-1 px-2 rounded-sm flex flex-wrap text-ellipsis overflow-hidden relative group"
                  style={{ maxWidth: "100%" }}
                >
                  <TooltipProvider>
                    <Tooltip>
                      <TooltipTrigger> {userData.public_address}</TooltipTrigger>
                      <TooltipContent>{userData.public_address}</TooltipContent>
                    </Tooltip>
                  </TooltipProvider>
                  <button
                    onClick={() => handleCopy(userData.public_address)}
                    disabled={copied}
                    className="py-0 bg-purple-500 text-white rounded-md px-2 h-6 text-xs absolute top-2 right-2 group-hover:block hidden"
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
                    <FaXTwitter className="text-white" />
                    <div className="px-3 py-1 text-sm w-full bg-transparent  text-white">
                      {socialLinks.x_url}
                    </div>
                  </div>
                )}
                {socialLinks.website_url && (
                  <div className="flex items-center w-full gap-2">
                    <Globe className="text-white" />
                    <div className="px-3 py-1 text-sm w-full bg-transparent  text-white">
                      {socialLinks.website_url}
                    </div>
                  </div>
                )}
                {socialLinks.linkedin && (
                  <div className="flex items-center w-full gap-2">
                    <FaLinkedinIn className="text-white" />
                    <div className="px-3 py-1 text-sm w-full bg-transparent  text-white">
                      {socialLinks.linkedin}
                    </div>
                  </div>
                )}{" "}
                {socialLinks.tiktok && (
                  <div className="flex items-center w-full gap-2">
                    <FaTiktok className="text-white" />
                    <div className="px-3 py-1 text-sm w-full bg-transparent  text-white">
                      {socialLinks.tiktok}
                    </div>
                  </div>
                )}
        
              </CardContent>
            </Card>
       

          <div className="md:w-[75%] mt-10 flex flex-col items-center justify-start">
            <div className="flex gap-2 items-center justify-end w-full border-b-2 border-gray-500 pb-3">
              <Button
                onClick={() => {
                  navigate("/exploreDao");
                }}
                variant="outline"
                className="text-white bg-purple-600"
              >
                Explore DAO
              </Button>
            </div>
            <div className="w-full">
              {data.length === 0 && (
                <Card className="w-full flex flex-col items-center p-5 text-xl font-bold mt-2 bg-gray-200 rounded-md bg-clip-padding backdrop-filter backdrop-blur-sm bg-opacity-30 max-w-[1440px]">
                  Currently there is no Activity by User
                </Card>
              )}
              <div className="grid grid-cols-1 gap-2 mt-5">
                {data.map((item) => (
                  <Card
                    key={item.id}
                    className="rounded-sm bg-[radial-gradient(ellipse_at_left,_var(--tw-gradient-stops))] from-purple-400 to-purple-300 hover:to-purple-400 hover:from-purple-400 cursor-pointer"
                 
                  >
                    <CardHeader>
                      <div className="flex items-center justify-between">
                        <div>
                          <CardTitle>{item.name}</CardTitle>
                          <CardDescription className="mt-1 text-black">
                            {item.description}
                          </CardDescription>
                        </div>
                        <Badge variant="">Deployed</Badge>
                      </div>
                    </CardHeader>
                    <CardContent>
                      <div className="flex flex-col gap-4">
                        <div>
                          <p className="text-sm text-gray-900 dark:text-gray-400">
                            Owner Name:
                          </p>
                          <p className="font-medium">{item.owner.name}</p>
                        </div>
                        <div>
                          <p className="text-sm text-gray-900 dark:text-gray-400">
                            Owner Address
                          </p>
                          <p className="font-medium">{item.owner_address}</p>
                        </div>
                      </div>
                    </CardContent>
                    <CardFooter>
                      <div className="flex items-center justify-end gap-2">
                        <Button  onClick={()=>{
                    navigate(`/community/detail/${item.id}`)
                  }} size="sm" variant="outline">
                          Interact
                        </Button>
                      </div>
                    </CardFooter>
                  </Card>
                ))}
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default UserPublicProfile;
