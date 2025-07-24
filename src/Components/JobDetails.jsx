import { useParams } from "react-router";
import useJobDetails from "../Hooks/useJobDetails";
import { Link } from "react-router-dom";
import { HiOutlineBuildingOffice } from "react-icons/hi2";
import { ImLocation } from "react-icons/im";
import parse from "html-react-parser";
import OtherJobs from "../Components/OtherJobs";
import useRandomJobs from "../Hooks/useRandomJobs";
import { FaAngleLeft } from "react-icons/fa6";

const JobDetails = () => {
  const { id } = useParams();
  const { jobDetail, isLoading, description } = useJobDetails(id);
  const randomJobs = useRandomJobs();

  const styleOptions = {
    replace: (domNode) => {
      const renderChildren = (children) => {
        return children.map((child, index) => {
          if (child.type === "tag") {
            const Tag = child.name;
            return (
              <Tag key={index}>
                {child.children && renderChildren(child.children)}
              </Tag>
            );
          } else if (child.type === "text") {
            return child.data;
          }
          return null;
        });
      };
      switch (domNode.name) {
        case "h2":
          return (
            <h2 className="text-2xl md:text-3xl font-semibold mb-2">
              {domNode.children[0]?.data}
            </h2>
          );
        case "h3":
          return (
            <h3 className="text-xl md:text-2xl font-semibold mb-2">
              {domNode.children[0]?.data}
            </h3>
          );
        case "h4":
          return (
            <h4 className="text-lg md:text-xl font-semibold mb-2">
              {domNode.children[0]?.data}
            </h4>
          );
        case "p":
          return (
            <p className="text-base md:text-lg mb-3">
              {domNode.children[0]?.data}
            </p>
          );
        case "ul":
          return (
            <ul className="list-disc pl-6 text-base md:text-lg mb-4">
              {renderChildren(domNode.children)}
            </ul>
          );
        default:
          return undefined;
      }
    },
  };

  return (
    <div className="w-[95%] max-w-screen-xl mx-auto mt-6">
      {/* Back Button */}
      <Link
        to="/"
        className="inline-flex items-center gap-2 py-2 px-4 border rounded-3xl text-sm font-medium hover:bg-gray-200 transition"
      >
        <FaAngleLeft className="w-4 h-4" /> Back
      </Link>

      {/* Header */}
      <div className="mt-10">
        <p className="text-xl md:text-2xl text-gray-700 mb-2">
          {jobDetail?.department?.title} Department at Teknorix
        </p>
        <h1 className="text-3xl md:text-4xl font-bold text-[#2B2D38]">
          {jobDetail?.title}
        </h1>

        {/* Job Meta */}
        <div className="flex flex-wrap items-center gap-4 text-gray-700 mt-2 text-base md:text-lg">
          <span className="flex items-center gap-2">
            <HiOutlineBuildingOffice className="text-[#656C8A] w-5 h-5" />
            {jobDetail?.department?.title}
          </span>
          <span className="flex items-center gap-2">
            <ImLocation className="text-[#656C8A] w-4 h-4" />
            {jobDetail?.location?.title}
          </span>
          <span className="bg-gray-300 text-[#555C6A] text-xs font-bold px-3 py-1 rounded-sm">
            {jobDetail?.type?.toUpperCase()}
          </span>
        </div>

        {/* Apply Button */}
        <div className="mt-6">
          <Link
            to={jobDetail?.applyUrl}
            target="_blank"
            className="inline-block border border-[#4b96e6] bg-[#4b96e6] text-white text-sm md:text-base px-8 py-2 rounded-3xl hover:bg-blue-600 transition"
          >
            Apply
          </Link>
        </div>
      </div>

      <hr className="my-8" />

      {/* Description + OtherJobs */}
      {!isLoading && description && (
        <div className="flex flex-col md:flex-row gap-6">
          {/* Description */}
          <div className="w-full md:w-[70%] description">
            {parse(description, styleOptions)}
          </div>

          {/* Sidebar */}
          <div className="w-full md:w-[30%]">
            <OtherJobs
              otherJobs={randomJobs}
              hostedURL={jobDetail?.hostedUrl}
            />
          </div>
        </div>
      )}
    </div>
  );
};

export default JobDetails;
