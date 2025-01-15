import react from "react";
import axios from "axios";

const backendURL = 'http://localhost:2016';

export const userRegister = async (formData, token) => {
    const headers = {
      Authorization: `Bearer asdfgh`,
    };
    const result = await axios.post(
      `${backendURL}/Register`,
      formData,
      { headers }
    );
    return result;
  };

  export const userLogin = async (formData) => {
    const result = await axios.post(`${backendURL}/Login`, formData);
    return result.data;
  };

  export const checkExistApi = async (formData) => {
    const result = await axios.post(`${backendURL}/CheckEmail`, formData);
    return result.data;
  }; 

  export const getDocumentsApi = async (userId) => {
    const headers = {
      authorization: `Bearer asdf`,
    };
    try {
      const result = await axios.get(`${backendURL}/Documnets?id=${userId}`,{ headers });
      return result;
    } catch (error) {
      throw error;
    }
  };

  export const getDocumentIdApi = async (documentsId,userId) => {
    const headers = {
      authorization: `Bearer asdf`,
    };
    try {
      const result = await axios.get(`${backendURL}/DocumnetId?id=${documentsId}`,{ headers });
      return result;
    } catch (error) {
      throw error;
    }
  };

  export const updateDocumentIdApi = async (data, userId) => {
    const headers = {
      authorization: `Bearer asdf`,
    };
    const result = await axios.put(`${backendURL}/DocumnetUpdate`,data,{ headers });
    return result;
  };

  export const addDocumentIdApi = async (data, userId) => {
    const headers = {
      authorization: `Bearer asdf`,
    };
    const result = await axios.post(`${backendURL}/DocumnetAdd`,data,{ headers });
    return result;
  };

  export const getFoldersApi = async (userId) => {
    const headers = {
      authorization: `Bearer asdf`,
    };
    try {
      const result = await axios.get(`${backendURL}/Folders?id=${userId}`,{ headers });
      return result;
    } catch (error) {
      throw error;
    }
  };

  export const getShareApi = async (userId) => {
    const headers = {
      authorization: `Bearer asdf`,
    };
    try {
      const result = await axios.get(`${backendURL}/Share`,{ headers });
      return result;
    } catch (error) {
      throw error;
    }
  };
