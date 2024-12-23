import react from "react";
import axios from "axios";

const backendURL = 'http://localhost:2016';

export const userRegister = async (formData, token) => {
    const headers = {
      Authorization: `Bearer asdfgh`,
    };
    const response = await axios.post(
      `${backendURL}/Register`,
      formData,
      { headers }
    );
    return response;
  };

  export const userLogin = async (formData) => {
    const response = await axios.post(`${backendURL}/login`, formData);
    return response.data;
  };

  export const checkExistApi = async (formData) => {
    const response = await axios.post(`${backendURL}/CheckEmail`, formData);
    return response.data;
  }; 