import { useEffect, useState } from "react";
import axios from "axios";
import { BASE_URL } from "../Utils/constant";

const useJobDetails = (id) => {
  const [isLoading, setIsLoading] = useState(true);
  const [jobDetail, setJobDetail] = useState();
  const [description, setDescription] = useState("");

  const getJobDetails = async () => {
    try {
      setIsLoading(true);
      const { data } = await axios.get(BASE_URL + `/api/v1/jobs/${id}`);
      if (!!data) setJobDetail(data);
      setDescription(data?.description);
      setIsLoading(false);
    } catch (err) {
      console.log(err);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    getJobDetails();
  }, [id]);

  return { jobDetail, isLoading, description };
};

export default useJobDetails;
