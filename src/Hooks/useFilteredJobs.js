import axios from "axios";
import { useState, useEffect } from "react";
import { BASE_URL } from "../Utils/constant";

const useFilteredJobs = (searchText, dep, loc, fun) => {
  const [data, setData] = useState([]);
  const [groupedJobs, setGroupedJobs] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        setIsLoading(true);
        const depIds = dep ? dep.map((item) => item.id) : null;
        const locIds = loc ? loc.map((item) => item.id) : null;
        const funIds = fun ? fun.map((item) => item.id) : null;

        const encodedSearchText = searchText
          ? encodeURIComponent(searchText)
          : null;

        const queryParams = {};
        if (searchText) queryParams["q"] = encodedSearchText;
        if (depIds.length) queryParams["dept"] = depIds.join(",");
        if (locIds.length) queryParams["loc"] = locIds.join(",");
        if (funIds.length) queryParams["fun"] = funIds.join(",");

        const response = await axios.get(BASE_URL + "/api/v1/jobs", {
          params: queryParams,
        });

        setData(response.data);
        setIsLoading(false);
      } catch (error) {
        console.error("Error fetching job details:", error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchData();
  }, [searchText, loc, dep, fun]);

  useEffect(() => {
    const groupJobs = () => {
      const groupedJobs = {};
      data.forEach((job) => {
        const department = job.department?.title.trim();
        if (!groupedJobs[department]) {
          groupedJobs[department] = [];
        }
        groupedJobs[department].push(job);
      });

      const resultArray = Object.keys(groupedJobs).map((department) => ({
        department,
        jobs: groupedJobs[department],
      }));

      setGroupedJobs(resultArray);
    };

    groupJobs();
  }, [data]);

  return { groupedJobs, isLoading };
};

export default useFilteredJobs;
