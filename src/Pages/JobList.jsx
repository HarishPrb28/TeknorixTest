import { useEffect, useState } from "react";
import { GoSearch } from "react-icons/go";
import Select from "../Components/Select";
import useDropdownList from "../Hooks/useDropdownList";
import useFilteredJobs from "../Hooks/useFilteredJobs";
import JobListDetails from "../Components/JobListDetails";
import FilterChips from "../Components/FilterChips";

const JobList = () => {
  let appliedFilter = JSON.parse(localStorage.getItem("filters")) || null;
  const [searchText, setSearchText] = useState("");
  const [selectedDepartment, setSelectedDepartment] = useState(
    appliedFilter ? appliedFilter.dept : []
  );
  const [selectedLocation, setSelectedLocation] = useState(
    appliedFilter ? appliedFilter.loc : []
  );
  const [selectedFunction, setSelectedFunction] = useState(
    appliedFilter ? appliedFilter.func : []
  );

  const { department, location, getfunction } = useDropdownList();

  const { groupedJobs, isLoading } = useFilteredJobs(
    searchText,
    selectedDepartment,
    selectedLocation,
    selectedFunction
  );

  useEffect(() => {
    let filter = localStorage.getItem("filters");
    if (filter === null) {
      setFilters();
    }
  }, []);

  useEffect(() => {
    setFilters();
  }, [searchText, selectedDepartment, selectedLocation, selectedFunction]);

  function setFilters() {
    let filters = {
      searchText: searchText,
      dept: selectedDepartment,
      loc: selectedLocation,
      func: selectedFunction,
    };
    localStorage.setItem("filters", JSON.stringify(filters));
  }

  const handleSearch = (e) => {
    const debounce = setTimeout(() => {
      setSearchText(e.target.value);
    }, 1000);

    return () => {
      clearTimeout(debounce);
    };
  };

  const clearAll = () => {
    setSelectedDepartment([]);
    setSelectedLocation([]);
    setSelectedFunction([]);
    setSearchText("");
  };

  return (
    <div className="w-[90%] m-auto">
      <h1 className="text-4xl font-semibold text-[#4b96e6] m-auto text-center my-7">
        Current Openings
      </h1>
      <div className="w-[100%] p-5 m-auto bg-gray-200">
        <div className="border w-full flex justify-between bg-white h-12">
          <input
            type="search"
            name="search"
            id="search"
            placeholder="Search for Job"
            className="p-2 px-4 rounded-md outline-none  w-[95%] "
            onChange={(e) => handleSearch(e)}
          />
          <div>
            <button className="">
              <GoSearch className="w-5 h-5 mr-2 mt-3" />{" "}
            </button>
          </div>
        </div>
        <br />
        <div className="md:flex  md:gap-[30px] w-full">
          <Select
            multiple
            options={department}
            value={selectedDepartment}
            optionType={`Department`}
            onChange={(o) => setSelectedDepartment(o)}
          />
          <Select
            multiple
            options={location}
            value={selectedLocation}
            optionType={`Location`}
            onChange={(o) => setSelectedLocation(o)}
          />
          <Select
            multiple
            options={getfunction}
            value={selectedFunction}
            optionType={`Function`}
            onChange={(o) => setSelectedFunction(o)}
          />
        </div>
      </div>
      {(selectedDepartment.length !== 0 ||
        selectedLocation.length !== 0 ||
        selectedFunction.length !== 0) && (
        <FilterChips
          dept={selectedDepartment}
          loc={selectedLocation}
          fun={selectedFunction}
          detpChange={setSelectedDepartment}
          locChange={setSelectedLocation}
          funChange={setSelectedFunction}
          clearAll={clearAll}
        />
      )}

      <div>
        {groupedJobs && groupedJobs.length > 0
          ? groupedJobs.map((job, i) => (
              <JobListDetails jobList={job} key={i} />
            ))
          : !isLoading && (
              <div className="text-3xl text-center my-10">No data Found</div>
            )}
      </div>
    </div>
  );
};

export default JobList;

// import { GoSearch } from "react-icons/go";
// import Select from "../Components/Select";
// import useDropdownList from "../Hooks/useDropdownList";
// import useFilteredJobs from "../Hooks/useFilteredJobs";
// import JobListDetails from "../Components/JobListDetails";
// import FilterChips from "../Components/FilterChips";

// const JobList = () => {
//   let appliedFilter = JSON.parse(localStorage.getItem("filters")) || null;

//   const [searchText, setSearchText] = useState("");
//   const [selectedDepartment, setSelectedDepartment] = useState(
//     appliedFilter ? appliedFilter.dept : []
//   );
//   const [selectedLocation, setSelectedLocation] = useState(
//     appliedFilter ? appliedFilter.loc : []
//   );
//   const [selectedFunction, setSelectedFunction] = useState(
//     appliedFilter ? appliedFilter.func : []
//   );

//   const { department, location, getfunction } = useDropdownList();

//   const { groupedJobs, isLoading } = useFilteredJobs(
//     searchText,
//     selectedDepartment,
//     selectedLocation,
//     selectedFunction
//   );

//   useEffect(() => {
//     let filter = localStorage.getItem("filters");
//     if (filter === null) {
//       setFilters();
//     }
//   }, []);

//   useEffect(() => {
//     setFilters();
//   }, [searchText, selectedDepartment, selectedLocation, selectedFunction]);

//   function setFilters() {
//     let filters = {
//       searchText,
//       dept: selectedDepartment,
//       loc: selectedLocation,
//       func: selectedFunction,
//     };
//     localStorage.setItem("filters", JSON.stringify(filters));
//   }

//   const handleSearch = (e) => {
//     const debounce = setTimeout(() => {
//       setSearchText(e.target.value);
//     }, 1000);

//     return () => clearTimeout(debounce);
//   };

//   const clearAll = () => {
//     setSelectedDepartment([]);
//     setSelectedLocation([]);
//     setSelectedFunction([]);
//     setSearchText("");
//   };

//   return (
//     <div className="w-full px-4 md:px-10 max-w-screen-xl mx-auto">
//       {/* Heading */}
//       <h1 className="text-3xl md:text-4xl font-semibold text-[#4b96e6] text-center my-6 md:my-10">
//         Current Openings
//       </h1>

//       {/* Search and Filters */}
//       <div className="bg-gray-100 rounded-md p-4 sm:p-6 shadow-sm">
//         {/* Search Bar */}
//         <div className="flex items-center gap-2 border rounded-md bg-white px-3 h-12">
//           <input
//             type="search"
//             name="search"
//             id="search"
//             placeholder="Search for Job"
//             className="flex-grow text-sm md:text-base outline-none"
//             onChange={(e) => handleSearch(e)}
//           />
//           <button className="text-gray-600">
//             <GoSearch className="w-5 h-5" />
//           </button>
//         </div>

//         {/* Dropdown Filters */}
//         <div className="flex flex-col gap-4 md:flex-row md:items-center mt-4">
//           <Select
//             multiple
//             options={department}
//             value={selectedDepartment}
//             optionType={`Department`}
//             onChange={(o) => setSelectedDepartment(o)}
//           />
//           <Select
//             multiple
//             options={location}
//             value={selectedLocation}
//             optionType={`Location`}
//             onChange={(o) => setSelectedLocation(o)}
//           />
//           <Select
//             multiple
//             options={getfunction}
//             value={selectedFunction}
//             optionType={`Function`}
//             onChange={(o) => setSelectedFunction(o)}
//           />
//         </div>
//       </div>

//       {/* Filter Chips */}
//       {(selectedDepartment.length !== 0 ||
//         selectedLocation.length !== 0 ||
//         selectedFunction.length !== 0) && (
//         <div className="mt-4">
//           <FilterChips
//             dept={selectedDepartment}
//             loc={selectedLocation}
//             fun={selectedFunction}
//             detpChange={setSelectedDepartment}
//             locChange={setSelectedLocation}
//             funChange={setSelectedFunction}
//             clearAll={clearAll}
//           />
//         </div>
//       )}

//       {/* Job List */}
//       <div className="mt-6 space-y-6">
//         {groupedJobs && groupedJobs.length > 0 ? (
//           groupedJobs.map((job, i) => <JobListDetails jobList={job} key={i} />)
//         ) : !isLoading ? (
//           <div className="text-center text-gray-500 text-lg md:text-2xl my-12">
//             No data Found
//           </div>
//         ) : null}
//       </div>
//     </div>
//   );
// };

// export default JobList;
