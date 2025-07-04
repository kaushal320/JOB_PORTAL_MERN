import React, { useState } from "react";
import Navbar from "../shared/Navbar";

import { Input } from "../ui/input";
import { Label } from "@/components/ui/label";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Button } from "../ui/button";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import { USER_API_ENDPOINT } from "@/utils/constant";
import { toast } from "sonner";
import { useDispatch, useSelector } from "react-redux";
import { setloading } from "@/redux/authSlice";
import { Loader2 } from "lucide-react";
const Signup = () => {
  const [input, setInput] = useState({
    fullname: "",
    email: "",
    phoneNumber: "",
    password: "",
    role: "",
    file: "",
  });
  const navigate = useNavigate();
  const { loading } = useSelector((store) => store.auth);
  const dispatch = useDispatch();
  const changeEventHandler = (e) => {
    const { name, value } = e.target;
    setInput({ ...input, [name]: value });
  };
  const changeFileHandler = (e) => {
    setInput({ ...input, file: e.target.files?.[0] });
  };

  const handlesubmit = async (e) => {
    e.preventDefault();
    const formdata = new FormData();
    formdata.append("fullname", input.fullname);
    formdata.append("email", input.email);
    formdata.append("phoneNumber", input.phoneNumber);
    formdata.append("password", input.password);
    formdata.append("role", input.role);
    if (input.file) formdata.append("file", input.file);

    try {
      dispatch(setloading(true));
      const res = await axios.post(`${USER_API_ENDPOINT}/register`, formdata, {
        headers: { "Content-Type": "multipart/form-data" },
        withCredentials: true,
      });

      console.log(res.data); // debug

      if (res.data.success) {
        toast.success(res.data.message);
        navigate("/login"); // or use setTimeout if you want delay
      } else {
        toast.error(res.data.message || "Signup failed.");
      }
    } catch (error) {
      if (error.response) {
        toast.error(error.response.data.message || "Signup failed.");
      } else {
        toast.error("Something went wrong. Please try again.");
      }
    } finally {
      dispatch(setloading(false));
    }
  };

  return (
    <div>
      <Navbar />
      <div className="flex items-center justify-center mt-2">
        <form
          onSubmit={handlesubmit}
          className="w-1/2 border border-gray-500 rounded-md p-4 my-10"
        >
          <h1 className="font-bold text-xl mb-5">SignUp</h1>
          <div className="my-2">
            <Label>Full Name</Label>
            <Input
              name="fullname"
              onChange={changeEventHandler}
              value={input.fullname}
              type="text"
              placeholder="Enter your full name"
            />
          </div>
          <div className="my-2">
            <Label>Email</Label>
            <Input
              name="email"
              onChange={changeEventHandler}
              value={input.email}
              type="email"
              placeholder="Enter your email"
            />
          </div>
          <div className="my-2">
            <Label>Phone Number</Label>
            <Input
              name="phoneNumber"
              onChange={changeEventHandler}
              value={input.phoneNumber}
              type="number"
              placeholder="Enter your phoneNumber"
            />
          </div>
          <div className="my-2">
            <Label>Password</Label>
            <Input
              name="password"
              onChange={changeEventHandler}
              value={input.password}
              type="password"
              placeholder="Enter your password"
            />
          </div>
          <RadioGroup defaultValue="option-one">
            <div className="flex items-center gap-4 mt-2">
              <div className="flex items-center space-x-2">
                <Input
                  checked={input.role === "student"}
                  className="cursor-pointer"
                  type="radio"
                  onChange={changeEventHandler}
                  name="role"
                  value="student"
                />
                <Label htmlFor="option-one">Student</Label>
              </div>
              <div className="flex items-center space-x-2">
                <Input
                  checked={input.role === "recruiter"}
                  className="cursor-pointer"
                  onChange={changeEventHandler}
                  type="radio"
                  name="role"
                  value="recruiter"
                />
                <Label htmlFor="option-one">Recruiter</Label>
              </div>
            </div>
          </RadioGroup>
          <div className="flex items-center gap-5 mt-2">
            <Label>Profile Pic</Label>

            <Input
              onChange={changeFileHandler}
              className=" cursor-pointer"
              accept="image/*"
              type="file"
            />
          </div>
          <div className=" mt-3 items-center">
            {loading ? (
              <Button
                className="w-full my-4 flex items-center justify-center gap-2"
                disabled
              >
                <Loader2 className="h-4 w-4 animate-spin" />
                Please wait
              </Button>
            ) : (
              <Button className="w-full my-4">Signup</Button>
            )}
            <span className=" text-gray-600">
              Already have an Account?
              <Link
                to="/login"
                className="underline  text-blue-600 text-sm p-2"
              >
                Login
              </Link>
            </span>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Signup;
