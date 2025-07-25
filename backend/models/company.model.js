import mongoose from "mongoose";

const companySchema = new mongoose.Schema({
  // define your schema fields here, for example:
  name: {
    type: String,
    required: true,
  },
  description: {
    type: String,
  },
  website: {
    type: String,
  },
  location: {
    type: String,
  },
  logo: {
    type: String,
  },
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true,
  },
},{timestamps:true});

const Company = mongoose.model("Company", companySchema);

export default Company;
