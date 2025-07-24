import React from "react";
import { HiOutlineBuildingOffice } from "react-icons/hi2";
import { ImLocation } from "react-icons/im";
import { Link, useLocation } from "react-router-dom";
import { FaFacebookSquare } from "react-icons/fa";
import { FaSquareXTwitter } from "react-icons/fa6";
import { FaLinkedin } from "react-icons/fa";

const OtherJobs = ({ otherJobs, hostedURL }) => {
  const currentURL = useLocation();
  const shareOnFacebook = () => {
    const shareURL = `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(
      hostedURL
    )}`;
    window.open(shareURL, "Share on Facebook", "width=600,height=600");
  };

  const shareOnLinkedIn = () => {
    const shareURL = `https://www.linkedin.com/shareArticle?url=${encodeURIComponent(
      hostedURL
    )}`;
    window.open(shareURL, "Share on linkedIn", "width=600,height=600");
  };

  const shareOnTwitter = () => {
    const shareURL = `https://twitter.com/intent/tweet?url=${encodeURIComponent(
      hostedURL
    )}&text=${encodeURIComponent("Check out this job opening")}`;
    window.open(shareURL, "share on x", "width=600,height=600");
  };
  return (
    <>
      <div className="w-full border p-5 bg-[#f0f3fb]">
        <div className="relative">
          <span className="relative inline-block text-[20px] py-3 ml-4 font-bold text-[#49494d]">
            OTHER JOB OPENINGS
            <span className="absolute bottom-0 left-0 w-[70px] h-[6px] bg-blue-500 inline-block" />
          </span>
        </div>
        <ul>
          {otherJobs &&
            otherJobs.map((item) => (
              <li
                key={item.id}
                className="items-center justify-between py-4 md:flex"
              >
                <div>
                  <Link
                    to={`/jobs/${item.id}`}
                    className="text-xl font-bold text-[#2B2D38] mb-2 hover:text-[#4b96e6]"
                  >
                    {item?.title}
                  </Link>
                  <div className="flex  text-[14px] ">
                    <span className="flex mr-4 ">
                      <HiOutlineBuildingOffice className="text-[#656C8A] w-[14px] h-[14px] mt-[5px]" />
                      {item?.department?.title}
                    </span>
                    <span className="flex mr-4">
                      <ImLocation className=" text-[#656C8A] w-[14px] h-[14px] mt-[5px]" />{" "}
                      {item?.location?.title}
                    </span>
                  </div>
                </div>
              </li>
            ))}
        </ul>
      </div>
      <div className="relative p-5">
        <div className="relative inline-block text-[20px] py-3 ml-4 font-bold text-[#2B2D38]">
          SHARE JOB OPENINGS
          <div className="absolute bottom-0 left-0 w-[70px] h-[5px] bg-blue-500 inline-block" />
        </div>

        <div className="flex gap-3 ml-4 mt-4">
          <button
            onClick={shareOnFacebook}
            className="rounded-full border-2 border-black  p-3"
          >
            <FaFacebookSquare className="h-7 w-7 hover:text-blue-600 cursor-pointer" />
          </button>

          <button
            onClick={shareOnLinkedIn}
            className="rounded-full  border-2 border-black p-3"
          >
            <FaLinkedin className="h-7 w-7  hover:text-blue-600 cursor-pointer" />
          </button>
          <button
            onClick={shareOnTwitter}
            className="rounded-full border-2 border-black  p-3"
          >
            <FaSquareXTwitter className="h-7 w-7  hover:text-blue-600 cursor-pointer" />
          </button>
        </div>
      </div>
    </>
  );
};

export default OtherJobs;
