import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

const url="http://localhost:3000"

export const googleSignIn = createAsyncThunk(
  "signin",
  async (userData, { rejectWithValue }) => {
    try {
      const response = await axios.post(`${url}/signin`, userData);
      
      return response.data;
    } catch (error) {
        return rejectWithValue("Failed to sign in. Please try again.");
    }
  }
);



export const verifyToken = createAsyncThunk(
  "token",
  async (token, { rejectWithValue }) => {
    try {
      const response = await axios.post(
        `${url}/verifyToken`,
        {},
        {
          headers: {
            Authorization: "Bearer" + token,
            Accept: "application/json",
          },
        }
      );

      // console.log("response",response.data);

      return response.data;
    } catch (error) {
      console.error(error);
      return rejectWithValue("Token verification failed. Please log in again.");
    }
  }
);



export const uploadPdf = createAsyncThunk(
  "upload",
  async (formData, { rejectWithValue }) => {
    try {
      // console.log(Object.fromEntries(formData.entries()));
      const token = localStorage.getItem("jwt");
      const response = await axios.post(`${url}/upload`, formData, {
        headers: {
          authorization: "Bearer" + token,
          "Content-Type": "multipart/form-data",
        },
      });
      console.log(response);
      return response.data;
    } catch (error) {
      return rejectWithValue("Upload failed, please try after some time.");
    }
  }
);

// api for pdf

export const pdfhistory = createAsyncThunk(
  "history",
  async (_, { rejectWithValue }) => {
    try {
     
      const token = localStorage.getItem("jwt");
      const response = await axios.get(`${url}/history`, {
        headers: {
          Authorization: "Bearer" + token, 
          Accept: "application/json",
        },
      });
      // console.log("pdfhistory",response)
      return response.data; 
    } catch (error) {
      console.error("Error fetching user history:", error);
      return rejectWithValue("Failed to fetch pdf history, please try after some time.");
    }
  }
);


// api for extracting pages

export const pdfExtract = createAsyncThunk(
  "extract",
  async ({ selectedPages, pdfUrl }, { rejectWithValue }) => {
    try {
      // console.log("api");
      // console.log(selectedPages, pdfUrl);
      const token = localStorage.getItem("jwt");
      const response = await axios.post(
        `${url}/extract`,
        {
          selectedPages: selectedPages,
          pdfUrl: pdfUrl,
        },
        {
          headers: {
            Authorization: "Bearer" + token,
            Accept: "application/json",
          },
        }
      );
      console.log(response.data); 
      return response.data;
    } catch (error) {
      console.error(error);
      return rejectWithValue("Pdf extract is failed, please try again after some time.");
    }
  }
);