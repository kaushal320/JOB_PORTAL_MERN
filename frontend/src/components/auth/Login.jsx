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
import { setloading, setUser } from "../../redux/authSlice";

import { Loader, Loader2 } from "lucide-react";
const Login = () => {
  const [input, setInput] = useState({
    email: "",
    password: "",
    role: "",
  });
  const { loading } = useSelector((store) => store.auth);
  const navigate = useNavigate();
  const changeEventHandler = (e) => {
    const { value, name } = e.target;
    setInput({ ...input, [name]: value });
  };

  const dispatch = useDispatch();
  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      dispatch(setloading(true));
      const res = await axios.post(`${USER_API_ENDPOINT}/login`, input, {
        headers: {
          "content-Type": "application/json",
        },
        withCredentials: true,
      });
      if (res.data.success) {
        dispatch(setUser(res.data.user));
        toast.success(res.data.message);
        setInput({
          email: "",
          password: "",
          role: "",
        });
        navigate("/");
      } else {
        toast.error(res.data.message || "login failed.");
      }
    } catch (error) {
      if (error.response) {
        toast.error(error.response.data.message || "login failed.");
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
          onSubmit={handleSubmit}
          className="w-1/2 border border-gray-500 rounded-md p-4 my-10"
        >
          <h1 className="font-bold text-xl mb-5">Login</h1>

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
                  onChange={changeEventHandler}
                  checked={input.role === "student"}
                  className="cursor-pointer"
                  type="radio"
                  name="role"
                  value="student"
                />
                <Label htmlFor="option-one">Student</Label>
              </div>
              <div className="flex items-center space-x-2">
                <Input
                  onChange={changeEventHandler}
                  checked={input.role === "recruiter"}
                  className="cursor-pointer"
                  type="radio"
                  name="role"
                  value="recruiter"
                />
                <Label htmlFor="option-one">Recruiter</Label>
              </div>
            </div>
          </RadioGroup>

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
              <Button className="w-full my-4">Login</Button>
            )}

            <span className=" text-gray-600">
              Don't have an Account?
              <Link
                to="/signup"
                className="underline  text-blue-600 text-sm p-2"
              >
                Signup
              </Link>
            </span>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Login;
