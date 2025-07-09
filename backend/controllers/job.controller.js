import { Job } from "../models/job.model.js";
//ADMIN
export const postJob = async (req, res) => {
  try {
    const {
      title,
      description,
      requirements,
      salary,
      experience,
      position,
      companyId,
      location,
      jobType,
    } = req.body;
    const userId = req.id;
    if (
      !jobType ||
      !title ||
      !description ||
      !requirements ||
      !salary ||
      !position ||
      !companyId ||
      !location ||
      !experience
    ) {
      return res.status(400).json({ message: "All fields are required." });
    }

    const job = await Job.create({
      title,
      jobType,
      description,
      requirements: requirements.split(","),
      salary: Number(salary),
      experienceLevel: experience,
      position,
      company: companyId,
      location,
      created_by: userId,
    });

    await job.save();

    return res.status(201).json({ message: "Job posted successfully.", job });
  } catch (error) {
    console.error(error);
    return res
      .status(500)
      .json({ message: "Server error. Please try again later." });
  }
};
//STUDENT
export const getAllJob = async (req, res) => {
  try {
    const keyword = req.query.keyword || "";
    const query = {
      $or: [
        { title: { $regex: keyword, $options: "i" } },
        { description: { $regex: keyword, $options: "i" } },
      ],
    };
    const jobs = await Job.find(query)
      .populate({
        path: "company",
      })
      .sort({ createdAt: -1 });
    if (!jobs || jobs.length === 0) {
      return res.status(404).json({
        message: "Jobs not found",
      });
    }
    return res.status(200).json({ jobs, success: true });
  } catch (error) {
    console.log(error);
    return res
      .status(500)
      .json({ message: "Server error. Please try again later." });
  }
};
//STUDENT
export const getJobById = async (req, res) => {
  try {
    const jobId = req.params.id;
    const job = await Job.findById(jobId).populate({
      path: "applications",
    });
    if (!job) {
      return res.status(404).json({
        message: "Job not found",
      });
    }
    return res.status(200).json({ job, success: true });
  } catch (error) {
    console.log(error);
  }
};

//TOTAL JOB CREATED BY ADMIN
export const getAdminJobs = async (req, res) => {
  try {
    const adminId = req.id;
    const jobs = await Job.find({ created_by: adminId });
    if (!jobs) {
      return res.status(404).json({
        message: "Job not found",
      });
    }
    return res.status(200).json({ jobs, success: true });
  } catch (error) {
    console.log(error);
  }
};
