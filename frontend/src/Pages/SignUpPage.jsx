import { useEffect, useState } from "react";
import { useAccount } from "@/AccountContext";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { useNavigate } from "react-router-dom";
// import axios from 'axios';
import ImageUpload from "./components/ImageUpload";
import axios from "axios";
import GridPattern from "@/components/ui/myComponents/grid-bg";
import { Checkbox } from "@/components/ui/checkbox";
import Select from "react-select";
const options = [
  { value: "chocolate", label: "Chocolate" },
  { value: "strawberry", label: "Strawberry" },
  { value: "vanilla", label: "Vanilla" },
];
const SignupPage = () => {
  const { accounts } = useAccount();
  const [viewSignUp, setSignUpView] = useState(1);
  const [tags, setTags] = useState([]);
  const [selectedTags, setSelectedTags] = useState([]);

  const navigate = useNavigate();
  const [isFormValid, setIsFormValid] = useState(false);
  const [formData, setFormData] = useState({
    public_address: accounts?.[0]?.address || "",
    username: accounts[0].label || "",
    bio: "",
    display_image: null,
    work_history: [
      {
        company_name: "",
        start_date: "",
        end_date: "",
        designation: "",
        description: "",
        current: false,
      },
    ],
  });

  const handleFileId = (id) => {
    const fileUrl = `https://ucarecdn.com/${id}/-/preview/1000x562/`;
    setFormData((prevState) => ({
      ...prevState,
      display_image: fileUrl,
    }));
    console.log("Received file URL:", fileUrl);
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };
  const handleWorkHistoryChange = (index, field, value) => {
    const newHistory = [...formData.work_history];
    newHistory[index] = { ...newHistory[index], [field]: value };
    setFormData((prevState) => ({
      ...prevState,
      work_history: newHistory,
    }));
  };

  const handleCurrentChange = (index, checked) => {
    console.log("Current checkbox for index", index, "is", checked); // Log for debugging
    const newHistory = formData.work_history.map((item, i) => {
      if (i === index) {
        return {
          ...item,
          current: checked,
          end_date: checked ? "" : item.end_date,
        }; // Clear end_date if currently working
      }
      return item;
    });
    setFormData((prevState) => ({
      ...prevState,
      work_history: newHistory,
    }));
  };
  const addWorkHistory = () => {
    setFormData((prevState) => ({
      ...prevState,
      work_history: [
        ...prevState.work_history,
        {
          company_name: "",
          start_date: "",
          end_date: "",
          designation: "",
          description: "",
          current: false,
        },
      ],
    }));
  };

  const removeWorkHistory = (index) => {
    const filteredHistory = formData.work_history.filter((_, i) => i !== index);
    setFormData((prevState) => ({
      ...prevState,
      work_history: filteredHistory,
    }));
  };
  const handleSubmit = async (e) => {
    e.preventDefault();

    const submitData = {
      ...formData,
      tags: selectedTags.map((tag) => tag.label), // assuming the backend needs tag IDs
    };

    try {
      const response = await axios.post(
        `${import.meta.env.VITE_BACKEND_URL}/user/signup`,
        submitData,
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      );
      console.log("API Response:", response.data);
      navigate("/userDashboard");
    } catch (error) {
      console.error("Error in API call:", error);
    }
  };

  const handleSelectChange = (selectedOptions) => {
 
      setSelectedTags(selectedOptions);
    
  };

  useEffect(() => {
    const checkFormValidity = () => {
      const isValid =
        formData.username &&
        formData.bio &&
        formData.display_image &&
        selectedTags.length >= 3 &&
        selectedTags.length <= 5;
  
      setIsFormValid(isValid);
    };
  
    checkFormValidity();
  }, [formData, selectedTags]);
  
  useEffect(() => {
    const fetchTags = async () => {
      try {
        const response = await axios.get(
          `${import.meta.env.VITE_BACKEND_URL}/tags`
        );
        const tagOptions = response.data.map((tag) => ({
          value: tag.id,
          label: tag.name,
        }));
        setTags(tagOptions);
      } catch (error) {
        console.error("Failed to fetch tags:", error);
      }
    };

    fetchTags();
  }, []);

  if (!accounts || accounts.length === 0) {
    navigate("/");
    return null;
  }
  return (
    <div className="pt-10 pb-10 items-center  gap-3 justify-center min-h-screen bg-purple-50 text-black px-2 ">
      <GridPattern
        squares={[
          [4, 4],
          [5, 1],
          [8, 2],
          [5, 3],
          [5, 5],
          [10, 10],
          [12, 15],
          [15, 10],
          [10, 15],
          [15, 10],
          [10, 15],
          [15, 10],
        ]}
      />

      {accounts && (
        <div className="max-w-[1440px] flex items-center justify-center mx-auto p-3 gap-3">
          {viewSignUp === 1 && (
            <Card className=" w-[500px] shadow-xl bg-white z-30 ">
              <CardHeader>
                <CardTitle className="text-4xl font-semibold w-full text-center">
                  Basic Info
                </CardTitle>
              </CardHeader>
              <CardContent className="">
                <form onSubmit={handleSubmit} className="grid gap-4">
                  <div className="grid grid-cols-1 gap-4">
                    <div className="grid gap-2">
                      <Label htmlFor="public_address">Public Address</Label>
                      <Input
                        id="public_address"
                        placeholder="account_tdx_2 d"
                        required
                        disabled
                        value={accounts[0].address}
                      />
                    </div>
                    <div className="grid gap-2">
                      <Label htmlFor="username">User Name</Label>
                      <Input
                        id="username"
                        name="username"
                        placeholder="Robinson"
                        required
                        disabled
                        value={accounts[0].label}
                      />
                    </div>
                  </div>
                  <div className="grid gap-2">
                    <Label htmlFor="bio">bio</Label>
                    <Textarea
                      id="bio"
                      name="bio"
                      placeholder="Tell us about yourself"
                      required
                      value={formData.bio}
                      onChange={handleChange}
                      maxlength="150"
                    />
                  </div>
                  <div className="grid gap-2">
                    {/* {imagePreview && (
                  <img src={imagePreview} alt="Preview" className="mt-2 aspect-square h-32 w-32  rounded-full" />
                )}
                <Label htmlFor="display_image">Display Image</Label>
                <Input
                  type="file"
                  id="display_image"
                  name="display_image"
                  required
                  onChange={handleFileChange}
                /> */}
                    <ImageUpload onUploadSuccess={handleFileId} />
                  </div>
                </form>
                <Button
                  className="w-full"
                  onClick={() => setSignUpView(2)}
                  disabled={!formData.bio || !formData.display_image}
                >
                  Next
                </Button>
              </CardContent>
            </Card>
          )}
          {viewSignUp === 2 && (
            <Card className="w-[500px] shadow-xl bg-white z-30">
              <CardHeader>
                <CardTitle className="text-4xl font-semibold w-full text-center">
                  Work History
                </CardTitle>
              </CardHeader>
              <CardContent>
                <form onSubmit={handleSubmit} className="grid gap-4">
                  {formData.work_history.map((entry, index) => (
                    <div key={index} className="grid grid-cols-1 gap-4">
                      <Input
                        name="company_name"
                        placeholder="Company Name"
                        value={entry.company_name}
                        onChange={(e) =>
                          handleWorkHistoryChange(
                            index,
                            "company_name",
                            e.target.value
                          )
                        }
                      />
                      <Input
                        name="start_date"
                        type="date"
                        value={entry.start_date}
                        onChange={(e) =>
                          handleWorkHistoryChange(
                            index,
                            "start_date",
                            e.target.value
                          )
                        }
                      />
                      <Label className="flex items-center justify-end gap-2">
                        <Checkbox
                          checked={entry.current}
                          onCheckedChange={(checked) =>
                            handleCurrentChange(index, checked)
                          }
                        />
                        Currently working here
                      </Label>

                      <Input
                        name="end_date"
                        type="date"
                        disabled={entry.current}
                        value={entry.end_date}
                        className=""
                        onChange={(e) =>
                          handleWorkHistoryChange(
                            index,
                            "end_date",
                            e.target.value
                          )
                        }
                      />

                      <Input
                        name="designation"
                        placeholder="Designation"
                        value={entry.designation}
                        onChange={(e) =>
                          handleWorkHistoryChange(
                            index,
                            "designation",
                            e.target.value
                          )
                        }
                      />
                      <Textarea
                        name="description"
                        placeholder="Description"
                        value={entry.description}
                        onChange={(e) =>
                          handleWorkHistoryChange(
                            index,
                            "description",
                            e.target.value
                          )
                        }
                      />
                      <Button onClick={() => removeWorkHistory(index)}>
                        Remove
                      </Button>
                      <Button onClick={addWorkHistory}>
                    Add 
                  </Button>
                    </div>
                  ))}
                </form>
                <div className="flex items-center justify-between mt-2">
              
                  <Button onClick={() => setSignUpView(3)}>Skip</Button>
                  <Button onClick={() => setSignUpView(3)}>Next</Button>
                </div>
              </CardContent>
            </Card>
          )}
          {viewSignUp === 3 && (
            <Card className="w-[500px] shadow-xl bg-white z-30">
              <CardHeader className="flex flex-col items-center gap-1">
                <CardTitle className="text-4xl font-semibold w-full text-center">
                  Select Tags
                </CardTitle>
                <div>Max tags upto 5</div>
              </CardHeader>
              <CardContent>
                <Select
                  options={tags}
                  isMulti
                  value={selectedTags}
                  onChange={handleSelectChange}
                  className="basic-multi-select"
                  classNamePrefix="select"
                />
                 <Button
          onClick={handleSubmit}
          disabled={!isFormValid}
          className="mt-4"
        >
          Submit
        </Button>
              </CardContent>
            </Card>
          )}
        </div>
      )}
    </div>
  );
};

export default SignupPage;
