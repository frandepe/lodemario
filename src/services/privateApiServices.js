import axios from "axios";

// const BASE_URL = process.env.DB_URL;
const BASE_URL = "http://localhost:3100/api";
// const BASE_URL = "https://ndcapacitaciones.herokuapp.com/api";

const tokenn = window.localStorage.getItem("token");
const config = {
  headers: {
    Authorization: `Bearer ${tokenn}`,
    "Access-Control-Expose-Headers": "Access-Control-*",
    "Access-Control-Allow-Headers":
      "Access-Control-*, Origin, X-Requested-With, Content-Type, Accept",
    "Access-Control-Allow-Methods": "GET,PUT,POST,DELETE,PATCH,OPTIONS",
    "Access-Control-Allow-Origin": "*",
    "Access-Control-Allow-Credentials": "true",
  },
};

/**
 * Function to generate a POST request
 * @param {string} route  Endpoint's route. Example: "cursos"
 * @param {Object} postData Object with the post data
 * @returns {Promise}
 */

export const privatePostRequest = async (route, postData) => {
  try {
    const { data } = await axios.post(`${BASE_URL}/${route}`, postData, config);
    return data;
  } catch (error) {
    console.log(error);
  }
};

/**
 * Function to generate a PUT request
 * @param {string} url  Endpoint's url. Example: cursos/${id}
 * @param {Object} putData Object with the post data
 * @returns {Promise}
 */

export const privatePutRequest = async ({ url, putData }) => {
  try {
    const res = await axios.put(`${BASE_URL}/${url}`, putData, config);
    return res;
  } catch (err) {
    console.log(err);
  }
};

/**
 * Function to generate a DELETE request
 * @param {string} url  Endpoint's url. Example: cursos/${id}
 * @param {Object} deleteData Object with the post data
 * @returns {Promise}
 */

export const privateDeleteRequest = async (route) => {
  try {
    const { res } = await axios.delete(`${BASE_URL}/${route}`, {}, config);
    return res;
  } catch (err) {
    console.log(err);
  }
};

/**
 * Function to generate a GET request
 * @param {string} sector  Endpoint's sector.
 * @returns {Promise}
 */

export const getDataMethodPrivate = async (route) => {
  try {
    const result = await axios.get(`${BASE_URL}/${route}`, config);
    console.log(result);
    return result;
  } catch (error) {
    console.error(error);
  }
};
