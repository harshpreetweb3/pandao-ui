import { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { useAccount } from "@/AccountContext";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader } from "@/components/ui/card";

import { Activity, Check, ClockIcon, Copy, Globe } from "lucide-react";
import { FaLinkedinIn, FaXTwitter } from "react-icons/fa6";
import { clipAddress } from "@/utils/functions/ClipAddress";
import { formatStandardDateTime } from "@/utils/functions/convertActivityData";

const UserDashboard = () => {
  const { accounts } = useAccount();
  const navigate = useNavigate();
  const [activityData, setActivityData] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [pageSize, setPageSize] = useState(10);
  const [totalPages, setTotalPages] = useState(1);
  const [copied, setCopied] = useState(false);
  const [data, setData] = useState([]);
  const [userData, setUserData] = useState({});
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
        setSocialLinks({
          x_url: res.data.usermetadata.x_url || "",
          website_url: res.data.usermetadata.website_url || "",
          linkedin: res.data.usermetadata.linkedin || "",
        });
      } catch (error) {
        console.error("Error fetching user data:", error);
      }
    };

    if (accounts && accounts.length > 0 && accounts[0].address) {
      fetchBluePrint();
      fetchUserData();
      fetchActivity(accounts[0].address, 1, 10);
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
    <div className="pt-20 relative flex items-start gap-3 justify-start min-h-screen bg-slate-100 text-black p-7">
      {userData && (
        <div className="flex flex-col w-full">
          <Card className="w-full flex md:flex-row flex-col shadow-md items-center md:items-start max-w-[1200px] mx-auto rounded-sm p-5 text-black ">
            <CardHeader className="p-0 ">
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

          <Card className="w-full flex mt-1  flex-col shadow-md items-center md:items-start max-w-[1200px] mx-auto rounded-sm p-5 text-black  ">
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
        </div>
      )}
    </div>
  );
};

export default UserDashboard;
