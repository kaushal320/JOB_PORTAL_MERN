import { createSlice } from "@reduxjs/toolkit";
const jobSLice = createSlice({
  name: "job",
  initialState: {
    allJobs: [],
    singleJob: [],
  },
  reducers: {
    //actions
    setAllJobs: (state, action) => {
      state.allJobs = action.payload;
    },
    setSingleJob: (state, action) => {
      state.singleJob = action.payload;
    },
  },
});

export const { setAllJobs, setSingleJob } = jobSLice.actions;
export default jobSLice.reducer;
