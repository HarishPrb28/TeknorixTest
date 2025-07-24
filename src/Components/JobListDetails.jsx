import React from "react";
import { HiOutlineBuildingOffice } from "react-icons/hi2";
import { ImLocation } from "react-icons/im";
import { Link } from "react-router-dom";

const JobListDetails = ({ jobList }) => {
  const { department, jobs } = jobList;

  return (
    <div className="w-full md:w-[95%] mx-auto pt-4">
      {/* Department Heading */}
      <div className="relative my-5">
        <h2 className="relative inline-block text-2xl sm:text-3xl md:text-4xl font-bold text-[#2B2D38] py-2">
          {department}
          <span className="absolute bottom-0 left-0 w-16 h-1 bg-blue-500" />
        </h2>
      </div>

      {/* Jobs List */}
      <ul>
        {jobs &&
          jobs.map((item) => (
            <li
              key={item.id}
              className="flex flex-col md:flex-row md:items-center md:justify-between gap-4  rounded-md my-4 p-4 hover:bg-gray-50 transition-all duration-150"
            >
              {/* Job Info */}
              <div className="flex-1">
                {/* Title */}
                <Link
                  to={`/jobs/${item.id}`}
                  className="text-xl sm:text-2xl font-bold text-[#2B2D38] hover:text-[#4b96e6] block mb-2"
                >
                  {item?.title}
                </Link>

                {/* Meta Info */}
                <div className="flex flex-wrap items-center gap-4 text-gray-700 text-sm sm:text-base">
                  {/* Department */}
                  <span className="flex items-center gap-2">
                    <HiOutlineBuildingOffice className="text-[#656C8A] w-5 h-5" />
                    {item?.department?.title}
                  </span>

                  {/* Location */}
                  <span className="flex items-center gap-2">
                    <ImLocation className="text-[#656C8A] w-4 h-4" />
                    {item?.location?.title}
                  </span>

                  {/* Job Type */}
                  <span className="hidden md:inline-block bg-gray-300 text-[#555C6A] text-xs font-semibold px-3 py-1 rounded-sm">
                    {(item?.type || "").toUpperCase()}
                  </span>
                </div>
              </div>

              {/* Action Buttons */}
              <div className="flex gap-3 flex-wrap mt-2 md:mt-0">
                <Link
                  to={item?.applyUrl}
                  target="_blank"
                  className="text-sm sm:text-base border border-[#4b96e6] text-[#4b96e6] px-6 py-2 rounded-3xl hover:bg-[#4b96e6] hover:text-white transition-all"
                >
                  Apply
                </Link>
                <Link
                  to={`/jobs/${item.id}`}
                  className="text-sm sm:text-base px-6 py-2 rounded-3xl border border-gray-300 hover:bg-gray-100 transition-all"
                >
                  View
                </Link>
              </div>
            </li>
          ))}
      </ul>
    </div>
  );
};

export default JobListDetails;
