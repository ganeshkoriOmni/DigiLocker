import react from "react";
import axios from "axios";

const backendURL = 'http://localhost:2016';

export const userRegister = async (requestData, token) => {
    const headers = {
      Authorization: `Bearer asdfgh`,
    };
    const response = await axios.post(
      `${backendURL}/`,
      requestData,
      { headers }
    );
    return response;
  };

  export const userLogin = async (formData) => {
    const response = await axios.post(`${backendURL}/login?${formData}`, formData);
    return response.data;
  };