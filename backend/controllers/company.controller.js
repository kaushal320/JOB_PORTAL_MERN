import Company from "../models/company.model.js";
export const registerCompany = async (req, res) => {
  try {
    const { name } = req.body;
    if (!name) {
      return res
        .status(400)
        .json({ message: "Company name is required", success: false });
    }
    let company = await Company.findOne({ name });

    if (company) {
      return res
        .status(409)
        .json({ message: "Company already exists", success: false });
    }
    // Add logic to create and save the company here if needed
    company = await Company.create({
      name: name,
      userId: req.user.id,
    });
    return res.status(201).json({
      message: "Company registered successfully",
      success: true,
      company,
    });
  } catch (error) {
    return res
      .status(500)
      .json({ message: "Server error", error: error.message });
  }
};

export const getCompany = async (req, res) => {
  try {
    const userId = req.user.id; // logged in user id (should be req.user.id, not req.id)
    const companies = await Company.find({ userId });
    if (!companies || companies.length === 0) {
      return res
        .status(404)
        .json({ message: "No companies found for this user" });
    }
    return res.status(200).json({ companies });
  } catch (error) {
    return res
      .status(500)
      .json({ message: "Server error", error: error.message });
  }
};

export const getCompanyById = async (req, res) => {
  try {
    const companyId = req.params.id;
    if (!companyId) {
      return res.status(400).json({ message: "Company ID is required" });
    }
    const company = await Company.findById(companyId);
    if (!company) {
      return res.status(404).json({ message: "Company not found" });
    }
    return res.status(200).json({ company });
  } catch (error) {
    return res
      .status(500)
      .json({ message: "Server error", error: error.message });
  }
};
export const updateCompany = async (req, res) => {
  try {
    const { name, description, website, location } = req.body;
    const file = req.file; // cloudinary
    const updateData = { name, description, website, location };

    // Optionally handle file upload and add to updateData if needed
    // if (file) {
    //     updateData.logo = file.path; // or whatever field you use
    // }

    const companyId = req.params.id;
    if (!companyId) {
      return res.status(400).json({ message: "Company ID is required" });
    }

    const updatedCompany = await Company.findByIdAndUpdate(
      companyId,
      updateData,
      { new: true }
    );

    if (!updatedCompany) {
      return res.status(404).json({ message: "Company not found" });
    }

    return res.status(200).json({
      message: "Company updated successfully",
      company: updatedCompany,
    });
  } catch (error) {
    return res
      .status(500)
      .json({ message: "Server error", error: error.message });
  }
};
