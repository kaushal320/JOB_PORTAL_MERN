import React, { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogFooter,
  DialogClose,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import axios from "axios";
import { USER_API_ENDPOINT } from "@/utils/constant";
import { setUser } from "@/redux/authSlice";

const UpdateProfileDialog = ({ open, setOpen }) => {
  const dispatch = useDispatch();
  const { user } = useSelector((store) => store.auth);

  const [formData, setFormData] = useState({
    fullname: "",
    email: "",
    phoneNumber: "",
    bio: "",
    skills: "",
    resume: null,
  });

  useEffect(() => {
    if (user) {
      setFormData({
        fullname: user.fullname || "",
        email: user.email || "",
        phoneNumber: user.phoneNumber || "",
        bio: user.profile?.bio || "",
        skills: (user.profile?.skills || []).join(", "),
        resume: null,
      });
    }
  }, [user]);

  const handleChange = (e) => {
    const { id, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [id]: value,
    }));
  };

  const handleResumeUpload = (e) => {
    const file = e.target.files[0];
    if (file) {
      setFormData((prev) => ({ ...prev, resume: file }));
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const updatedFields = new FormData();

    for (const key in formData) {
      const value = formData[key];
      if (key === "resume") {
        if (value) updatedFields.append("resume", value);
      } else {
        if (typeof value === "string" && value.trim() !== "") {
          updatedFields.append(key, value.trim());
        }
      }
    }

    try {
      const res = await axios.put(
        `${USER_API_ENDPOINT}/profile/update`,
        updatedFields,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
          withCredentials: true,
        }
      );

      // Assume updated user data is in res.data.user
      const updatedUser = res.data.user;

      if (updatedUser) {
        dispatch(setUser(updatedUser));
      }

      setOpen(false);
      console.log("✅ Profile updated:", updatedUser);
    } catch (error) {
      console.error("❌ Error updating profile:", error);
    }
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogContent className="sm:max-w-lg">
        <DialogHeader>
          <DialogTitle className="text-red-400">Update Profile</DialogTitle>
          <DialogDescription>
            Make changes to your profile. Click save when you're done.
          </DialogDescription>
        </DialogHeader>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="space-y-1">
            <Label htmlFor="fullname">Full Name</Label>
            <Input
              id="fullname"
              placeholder="Update full name"
              value={formData.fullname}
              onChange={handleChange}
            />
          </div>

          <div className="space-y-1">
            <Label htmlFor="email">Email</Label>
            <Input
              id="email"
              type="email"
              placeholder="Update email"
              value={formData.email}
              onChange={handleChange}
            />
          </div>

          <div className="space-y-1">
            <Label htmlFor="phoneNumber">Phone Number</Label>
            <Input
              id="phoneNumber"
              placeholder="Update phone number"
              value={formData.phoneNumber}
              onChange={handleChange}
            />
          </div>

          <div className="space-y-1">
            <Label htmlFor="bio">Bio</Label>
            <Textarea
              id="bio"
              placeholder="Update your bio"
              value={formData.bio}
              onChange={handleChange}
            />
          </div>

          <div className="space-y-1">
            <Label htmlFor="skills">Skills (comma separated)</Label>
            <Input
              id="skills"
              placeholder="e.g. React, Django, MongoDB"
              value={formData.skills}
              onChange={handleChange}
            />
          </div>

          <div className="space-y-1">
            <Label htmlFor="resume">Upload Resume</Label>
            <Input
              id="resume"
              type="file"
              accept=".pdf,.doc,.docx"
              onChange={handleResumeUpload}
            />
            {formData.resume && (
              <p className="text-sm text-muted-foreground mt-1">
                Selected: {formData.resume.name}
              </p>
            )}
          </div>

          <DialogFooter className="pt-2">
            <DialogClose asChild>
              <Button type="button" variant="outline">
                Cancel
              </Button>
            </DialogClose>
            <Button
              type="submit"
              className="bg-red-400 hover:bg-red-500 text-white"
            >
              Save Changes
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
};

export default UpdateProfileDialog;
