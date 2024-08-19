import { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { useAccount } from "@/AccountContext";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader } from "@/components/ui/card";

import {
  Activity,
  Check,
  ChevronLeft,
  ClockIcon,
  Copy,
  Globe,
  SquareArrowOutDownLeft,
  SquareArrowOutUpRight,
} from "lucide-react";
import { FaLinkedinIn, FaXTwitter } from "react-icons/fa6";
import { clipAddress } from "@/utils/functions/ClipAddress";
import { formatStandardDateTime } from "@/utils/functions/convertActivityData";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

const UserDashboard = () => {
  const { accounts } = useAccount();
  const navigate = useNavigate();
  const [coverUrl, setCoverUrl] = useState("");
  const [loading, setLoading] = useState(true);

  const [activityData, setActivityData] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [pageSize, setPageSize] = useState(10);
  const [totalPages, setTotalPages] = useState(1);
  const [copied, setCopied] = useState(false);
  const [data, setData] = useState([]);
  const [dataAll, setDataAll] = useState([]);

  const [userData, setUserData] = useState({});
  const [createdComminities, setCreatedCommunities] = useState([]);
  const [participatedComminities, setParticipatedCommunities] = useState([]);

  // const [edit, setEdit] = useState(false);
  // const [fileUrl, setFileUrl] = useState("");
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
    const fetchActivity = async (user_address, page, page_size) => {
      try {
        const res = await axios.get(
          `${import.meta.env.VITE_BACKEND_URL}/user/activity`,
          {
            params: {
              user_address,
              page,
              page_size,
            },
          }
        );
        setActivityData(res.data.data);
        setTotalPages(res.data.page);
        console.log(res.data, "data");
      } catch (error) {
        console.error("Error fetching activity data:", error);
      }
    };
    const fetchAll = async () => {
      try {
        const res = await axios.get(
          `${import.meta.env.VITE_BACKEND_URL}/community/all`
        );
        setDataAll(res.data);
        console.log(res.data)
      } catch (error) {
        console.error("Error fetching blueprint data:", error);
      } finally {
        setLoading(false);
      }
    };
    const fetchUserData = async () => {
      try {
        const res = await axios.get(
          `${import.meta.env.VITE_BACKEND_URL}/user/details/${
            accounts[0].address
          }`
        );
        console.log(res.data);
        setUserData(res.data);
        setAbout(res.data.about);
        setCoverUrl(res.data.usermetadata.cover_url);
        setSocialLinks({
          x_url: res.data.usermetadata.x_url || "",
          website_url: res.data.usermetadata.website_url || "",
          linkedin: res.data.usermetadata.linkedin || "",
        });
      } catch (error) {
        console.error("Error fetching user data:", error);
      }
    };
    const fetchCreatedCommunity = async (user_address) => {
      try {
        const res = await axios.get(
          `${
            import.meta.env.VITE_BACKEND_URL
          }/user/community/${user_address}?owner=true`
        );
        setCreatedCommunities(res.data);
      } catch (error) {
        console.error("Error fetching activity data:", error);
      }
    };
    const fetchCreatedParticipated = async (user_address) => {
      try {
        const res = await axios.get(
          `${
            import.meta.env.VITE_BACKEND_URL
          }/user/community/${user_address}?owner=false`
        );
        setParticipatedCommunities(res.data);
      } catch (error) {
        console.error("Error fetching activity data:", error);
      }
    };
    if (accounts && accounts.length > 0 && accounts[0].address) {
      fetchBluePrint();
      fetchUserData();
      fetchActivity(accounts[0].address, 1, 10);
      fetchCreatedCommunity(accounts[0].address);
      fetchCreatedParticipated(accounts[0].address);
      fetchAll()
    }
  }, [accounts, currentPage, pageSize]);

  if (!accounts || accounts.length === 0) {
    navigate("/");
    return null;
  }
  // const handlePageChange = (newPage) => {
  //   if (newPage > 0 && newPage <= totalPages) {
  //     setCurrentPage(newPage);
  //   }
  // };

  return (
    <div className=" relative flex items-start gap-3 justify-start min-h-screen bg-slate-100 text-black pb-7 pt-2 px-7">
      <Tabs defaultValue="overview" className="w-full  t ">
        <TabsList className=" w-full flex  items-center justify-start  max-w-[1400px] mx-auto  ">
          <div
            onClick={() => navigate(-1)}
            className="bg-white rounded-md p-1 flex items-center justify-center mr-2"
          >
            <ChevronLeft />
          </div>
          <TabsTrigger value="overview">Overview</TabsTrigger>
          <TabsTrigger value="activity">User Activity</TabsTrigger>
        </TabsList>
        <TabsContent value="overview">
          {userData && (
            <div className="flex flex-col w-full">
              <Card className="w-full flex md:flex-row flex-col shadow-md items-center md:items-start max-w-[1400px] mx-auto rounded-sm  text-black border-b-0 h-48">
                {userData.usermetadata?.cover_url ? (
                  <img
                    src={coverUrl || "/Pandao.png"}
                    alt="Cover"
                    className="aspect-video h-48 w-full object-cover"
                  />
                ):(
                  <img
                    src= "/Pandao.png"
                    alt="Cover"
                    className="aspect-video h-48 w-full object-cover"
                  />
                )}
              </Card>
              <Card className="w-full rounded-t-none border-t-0 flex md:flex-row flex-col shadow-md items-center md:items-start max-w-[1400px] mx-auto rounded-sm p-5 text-black ">
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
                      {clipAddress(accounts[0].address)}
                      <button
                        onClick={() => handleCopy(accounts[0].address)}
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

                  <Button
                    onClick={() => navigate("/userDashboard/edit")}
                    className="bg-slate-700 border-2 absolute right-0 top-2"
                  >
                    Edit Profile
                  </Button>
                </CardContent>
              </Card>
              <div className="grid md:grid-cols-3 grid-cols-1 w-full max-w-[1400px] mx-auto">
                <Card className="md:col-span-2 flex mt-1  flex-col shadow-md items-center md:items-start w-full mx-auto rounded-sm p-5 text-black  ">
                  <div className="text-xl font-bold">Created Communities</div>
                  <div className="w-full mt-4 flex flex-col gap-2 h-full ">
                    {createdComminities.length === 0 && (
                      <div className="flex items-center justify-center text-center h-full ">
                        No comminities created
                      </div>
                    )}
                    {createdComminities.length > 0 &&
                      createdComminities.map((activity, index) => (
                        <div
                          key={index}
                          className="p-4 border-2 rounded-lg group hover:shadow-md "
                        >
                          <div className="flex items-center justify-between">
                            <div className="flex items-center gap-2">
                              <Avatar className="h-12 w-12 mt-1">
                                <AvatarImage
                                  src={activity.community_image}
                                  className="h-12 w-12 object-cover"
                                />

                                <AvatarFallback>CN</AvatarFallback>
                              </Avatar>
                              <div>
                                <div className="flex items-center gap-2">
                                  <span>{activity.community_name}</span>
                                </div>
                              </div>
                            </div>
                            <div
                              onClick={() =>
                                navigate(
                                  `/community/detail/${activity.community_id}`
                                )
                              }
                              className="border-2 rounded-full p-2 group-hover:text-purple-600 group-hover:border-purple-600 cursor-pointer"
                            >
                              <SquareArrowOutUpRight className="h-4 w-4" />
                            </div>
                          </div>
                        </div>
                      ))}
                  </div>
                </Card>
                <Card className="w-full flex mt-1  flex-col shadow-md items-center md:items-start max-w-[1400px] mx-auto rounded-sm p-5 text-black  ">
                  <div className="text-xl font-bold"> Communities Participated</div>
                  <div className="w-full mt-4 flex flex-col gap-2 h-full">
                    {participatedComminities.length === 0 && (
                      <div className="flex items-center justify-center text-center h-full">
                        No participated comminities.
                      </div>
                    )}
                    {participatedComminities.length > 0 &&
                      participatedComminities.map((activity, index) => (
                        <div
                          key={index}
                          className="p-4 border-2 rounded-lg group hover:shadow-md "
                        >
                          <div className="flex items-center justify-between">
                            <div className="flex items-center gap-2">
                              <Avatar className="h-12 w-12 mt-1">
                                <AvatarImage
                                  src={activity.community_image}
                                  className="h-12 w-12 object-cover"
                                />

                                <AvatarFallback>CN</AvatarFallback>
                              </Avatar>
                              <div>
                                <div className="flex items-center gap-2">
                                  <span>{activity.community_name}</span>
                                </div>
                              </div>
                            </div>
                            <div
                              onClick={() =>
                                navigate(
                                  `/community/detail/${activity.community_id}`
                                )
                              }
                              className="border-2 rounded-full p-2 group-hover:text-purple-600 group-hover:border-purple-600 cursor-pointer"
                            >
                              <SquareArrowOutUpRight className="h-4 w-4" />
                            </div>
                          </div>
                        </div>
                      ))}
                  </div>
                </Card>
               
                <Card className="w-full md:col-span-3 flex mt-1  flex-col shadow-md items-center md:items-start max-w-[1400px] mx-auto rounded-sm p-5 text-black  ">
                  <div className="text-xl font-bold"> Communities you might be interested In</div>
                  <div className="w-full mt-4 flex flex-col gap-2 h-full">
                    {dataAll.length === 0 && (
                      <div className="flex items-center justify-center text-center h-full">
                        No active comminities.
                      </div>
                    )}
                    {dataAll.length > 0 &&
                      dataAll.map((activity, index) => (
                        <div
                          key={index}
                          className="p-4 border-2 rounded-lg group hover:shadow-md "
                        >
                          <div className="flex items-center justify-between">
                            <div className="flex items-center gap-2">
                              <Avatar className="h-12 w-12 mt-1">
                                <AvatarImage
                                  src={activity.image}
                                  className="h-12 w-12 object-cover"
                                />

                                <AvatarFallback>CN</AvatarFallback>
                              </Avatar>
                              <div>
                                <div className="flex items-center gap-2 text-xl px-4">
                                  <span>{activity.name}</span>
                                </div>
                                <div className="flex items-center gap-2 px-4">
                                  <span className="line-clamp-2">{activity.description}</span>
                                </div>
                              </div>
                            </div>
                            <div
                              onClick={() =>
                                navigate(
                                  `/community/detail/${activity.id}`
                                )
                              }
                              className="border-2 rounded-full p-2 group-hover:text-purple-600 group-hover:border-purple-600 cursor-pointer"
                            >
                              <SquareArrowOutUpRight className="h-4 w-4" />
                            </div>
                          </div>
                        </div>
                      ))}
                  </div>
                </Card>
              </div>
            </div>
          )}
        </TabsContent>
        <TabsContent value="activity">
          <Card className="w-full flex mt-1  flex-col shadow-md items-center md:items-start max-w-[1400px] mx-auto rounded-sm p-5 text-black  ">
            <div className="text-xl font-bold">User Activity</div>
            <div className="w-full mt-4 flex flex-col gap-2 ">
              {activityData.map((activity, index) => (
                <div key={index} className="p-4 border-2 rounded-lg group ">
                  <div className="flex items-center justify-between">
                    <div className="flex items-start gap-2">
                      <Avatar className="h-8 w-8 mt-1">
                        <AvatarImage
                          src={activity.user_image_url}
                          className="h-8 w-8 object-cover"
                        />

                        <AvatarFallback>CN</AvatarFallback>
                      </Avatar>
                      <div>
                        <div className="flex items-center gap-2">
                          <span>{activity.info}</span>
                        </div>
                        <div className="text-sm flex items-center gap-1 font-light">
                          <ClockIcon className="h-3 w-3" />{" "}
                          <span>
                            {formatStandardDateTime(activity.created_at)}
                          </span>{" "}
                        </div>
                      </div>
                    </div>

                    <div className="border-2 rounded-full p-2 group-hover:text-purple-600 group-hover:border-purple-600">
                      <Activity className="h-4 w-4" />
                    </div>
                  </div>
                </div>
              ))}
            </div>
            {/* <div className="flex justify-between mt-4">
              <Button onClick={() => handlePageChange(currentPage - 1)} disabled={currentPage === 1}>
                Previous
              </Button>
              <span>Page {currentPage} of {totalPages}</span>
              <Button onClick={() => handlePageChange(currentPage + 1)} disabled={currentPage === totalPages}>
                Next
              </Button>
            </div> */}
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default UserDashboard;
