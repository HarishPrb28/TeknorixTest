import axios from "axios";
import { useEffect, useState } from "react";
import { BASE_URL } from "../Utils/constant";

const useRandomJobs = () => {
  const [otherJobs, setOtherJobs] = useState();

  const getRandomJobs = async () => {
    try {
      const { data } = await axios.get(
        BASE_URL + "/api/v2/jobs?random=true&showInternal=false"
      );
      if (!!data) setOtherJobs(data);
    } catch (err) {
      console.log(err);
    }
  };
  useEffect(() => {
    getRandomJobs();
  }, []);
  return otherJobs;
};

export default useRandomJobs;
