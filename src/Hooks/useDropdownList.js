import { useEffect, useState } from "react";
import axios from "axios";
import { BASE_URL } from "../Utils/constant";

const fetchData = async (url, setData) => {
  try {
    const { data } = await axios.get(BASE_URL + url);
    setData(data);
    return data;
  } catch (err) {
    console.error(`Error fetching data from ${url}:`, err);
    throw err;
  }
};

const useDropdownList = () => {
  const [department, setDepartment] = useState();
  const [location, setLocation] = useState();
  const [getfunction, setGetFunction] = useState();

  const getDepartment = () => fetchData("/api/v1/departments", setDepartment);
  const getLocation = () => fetchData("/api/v1/locations", setLocation);
  const getFunction = () => fetchData("/api/v1/functions", setGetFunction);

  useEffect(() => {
    getDepartment();
    getLocation();
    getFunction();
  }, []);

  return {
    department,
    location,
    getfunction,
  };
};

export default useDropdownList;
