import { useState } from 'react';
import { useAccount } from "@/AccountContext";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { useNavigate } from "react-router-dom";
import axios from 'axios';

const SignupPage = () => {
  const { accounts } = useAccount();
  const navigate = useNavigate();
  const [imagePreview, setImagePreview] = useState(null);
  const [formData, setFormData] = useState({
    public_address:accounts[0].address,
    username: '',
    about: '',
    display_image: null
  });

  if (!accounts || accounts.length === 0) {
    navigate("/");
    return null;
  }

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value
    });
  };

  const handleFileChange = (e) => {
    setFormData({
      ...formData,
      display_image: e.target.files[0]
    });
    console.log(formData)
    setImagePreview(URL.createObjectURL(e.target.files[0]));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    console.log(formData)
    // try {
    //   const response = await axios.post(`${import.meta.env.VITE_BACKEND_URL}/user/submit`, data, {
    //     headers: {
    //       'Content-Type': 'multipart/form-data'
    //     }
    //   });
    //   console.log('API Response:', response.data);
    //   // Navigate to another page if needed
    // } catch (error) {
    //   console.error('Error in API call:', error);
    // }
  };

  return (
    <div className="pt-20 pb-10 items-center gap-3 justify-center min-h-screen bg-[radial-gradient(ellipse_at_left,_var(--tw-gradient-stops))] from-[#281038] from-0% via-[#181734] via-50% to-[#0D1E3B] to-100% text-black px-2">
      <div className="max-w-[1440px] flex items-center justify-center mx-auto p-3 gap-3">
        <Card className=" w-[500px]">
          <CardHeader>
            <CardTitle className="text-xl">Sign Up</CardTitle>
            <CardDescription>
              Enter your information to create an account
            </CardDescription>
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
                    value={formData.username}
                    onChange={handleChange}
                  />
                </div>
              </div>
              <div className="grid gap-2">
                <Label htmlFor="about">About</Label>
                <Textarea
                  id="about"
                  name="about"
                  placeholder="Tell us about yourself"
                  required
                  value={formData.about}
                  onChange={handleChange}
                />
              </div>
              <div className="grid gap-2">
              {imagePreview && (
                  <img src={imagePreview} alt="Preview" className="mt-2 aspect-square h-32 w-32  rounded-full" />
                )}
                <Label htmlFor="display_image">Display Image</Label>
                <Input
                  type="file"
                  id="display_image"
                  name="display_image"
                  required
                  onChange={handleFileChange}
                />
              </div>
              <Button type="submit" className="w-full">
                Sign up
              </Button>
            </form>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default SignupPage;
