import React, { useEffect, useState } from "react";

import api from "../api/axios";
import JobCard from "../component/JobCard";
import JobDetails from "../component/JobDetails";
import Navbar from "../component/Navbar";

const Jobs = () => {
  const [jobs, setJobs] = useState([]);
  console.log(jobs);
  const [selectedJob, setSelectedJob] = useState(null);
  const [loading, setLoading] = useState(true);
  const [mobileView, setMobileView] = useState("list");
  const [search, setSearch] = useState("");
  const [location, setLocation] = useState("");
  const [appliedSearch, setAppliedSearch] = useState("");
  const [appliedLocation, setAppliedLocation] = useState("");

  const getAllJobs = async () => {
    try {
      setLoading(true);
      const response = await api.get("/job/get");

      if (response.data.success) {
        setJobs(response.data.jobs); //now useState Jobs has all jobs
        if (response.data.jobs.length > 0) {
          setSelectedJob(response.data.jobs[0]);
        }
      }
    } catch (error) {
      console.log("Error fetching jobs:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    getAllJobs();
  }, []);

  //jobs search
  const filteredJobs = jobs.filter((job) => {
    const searchTerm = appliedSearch.toLowerCase();
    const locationTerm = appliedLocation.toLowerCase();

    const skillMatch = job.skills?.some((skill) =>
      skill.toLowerCase().includes(searchTerm),
    );

    return (
      (job.title?.toLowerCase().includes(searchTerm) ||
        job.companyName?.toLowerCase().includes(searchTerm) ||
        job.description?.toLowerCase().includes(searchTerm) ||
        skillMatch) &&
      job.location?.toLowerCase().includes(locationTerm)
    );
  });

  const handleSearch = () => {
    setAppliedSearch(search);
    setAppliedLocation(location);
  };

  const handleSelectJob = (job) => {
    setSelectedJob(job);
    setMobileView("details");
  };

  const handleBack = () => setMobileView("list");

  return (
    <div className="min-h-screen bg-[#f2f3f6] font-sans text-[#0d0f17] antialiased">
      {/* HERO / TOP BAR — echoes the register page's dark panel; hidden on mobile once a job is opened */}
      {/* <div
        className={`relative overflow-hidden bg-[#0d0f17] text-[#f2f3f6] ${
          mobileView === "details" ? "hidden lg:block" : "block"
        }`}
      >
        <svg
          className="pointer-events-none absolute -right-16 -top-10 w-[600px] max-w-none opacity-90"
          viewBox="0 0 500 420"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            d="M-20 380 C 80 360, 120 300, 170 290 C 220 280, 240 340, 290 300 C 340 260, 330 170, 390 140 C 430 120, 450 130, 500 70"
            stroke="#C8FF4D"
            strokeOpacity="0.18"
            strokeWidth="2"
          />
          <circle cx="170" cy="290" r="4" fill="#C8FF4D" fillOpacity="0.5" />
          <circle cx="290" cy="300" r="4" fill="#C8FF4D" fillOpacity="0.5" />
          <circle cx="390" cy="140" r="5" fill="#C8FF4D" fillOpacity="0.7" />
          <circle cx="500" cy="70" r="6" fill="#C8FF4D" />
        </svg>
        <div className="absolute inset-0 bg-gradient-to-b from-[#0d0f17]/0 via-[#0d0f17]/20 to-[#0d0f17]" />

        <div className="relative z-10 mx-auto max-w-7xl px-6 py-12 sm:px-10">
          <p className="text-xs font-semibold uppercase tracking-[0.2em] text-[#C8FF4D]">
            {jobs.length} open roles matched to you
          </p>
          <h1 className="mt-3 text-[2rem] font-semibold leading-tight sm:text-4xl">
            Jobs for you
          </h1>
          <p className="mt-3 max-w-lg text-[15px] leading-relaxed text-[#c2c6d4]">
            Curated from your profile and activity — apply in one click, no
            repeated forms.
          </p>
        </div>
      </div> */}

      <Navbar />

      <div className="mb-6 mt-6 max-w-4xl mx-auto ">
        <div className="flex flex-col overflow-hidden rounded-2xl border border-[#e3e5ec] bg-white shadow-sm sm:flex-row sm:items-center">
          {/* Job title / keyword */}
          <div className="flex flex-1 items-center gap-3 px-5 py-3.5">
            <svg
              className="h-5 w-5 flex-shrink-0 text-[#6b7186]"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="1.8"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <circle cx="11" cy="11" r="7" />
              <path d="m20 20-3.5-3.5" />
            </svg>
            <input
              type="text"
              placeholder="Job title, skill, or company"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="w-full bg-transparent text-[15px] text-[#0d0f17] placeholder:text-[#6b7186]/70 outline-none"
            />
          </div>

          {/* Divider — vertical on desktop, horizontal on mobile */}
          <div className="h-px w-full bg-[#e3e5ec] sm:h-9 sm:w-px" />

          {/* Location */}
          <div className="flex flex-1 items-center gap-3 px-5 py-3.5">
            <svg
              className="h-5 w-5 flex-shrink-0 text-[#6b7186]"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="1.8"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <path d="M12 21s7-6.1 7-11.5A7 7 0 0 0 5 9.5C5 14.9 12 21 12 21Z" />
              <circle cx="12" cy="9.5" r="2.5" />
            </svg>
            <input
              type="text"
              placeholder="City or location"
              value={location}
              onChange={(e) => setLocation(e.target.value)}
              className="w-full bg-transparent text-[15px] text-[#0d0f17] placeholder:text-[#6b7186]/70 outline-none"
            />
          </div>

          {/* Search button */}
          <button
            onClick={handleSearch}
            className="m-2 flex items-center justify-center gap-2 rounded-xl bg-[#0d0f17] px-6 py-3 text-sm font-semibold text-white transition hover:bg-[#232939] active:bg-[#0d0f17] sm:flex-shrink-0"
          >
            <svg
              className="h-4 w-4"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <circle cx="11" cy="11" r="7" />
              <path d="m20 20-3.5-3.5" />
            </svg>
            Search
          </button>
        </div>
      </div>

      <div className="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-10">
        <span className="font-semibold my-2 mx-2 text-2xl">Jobs for you</span>
        <div className="grid grid-cols-1 mt-1 items-start gap-6 lg:grid-cols-[420px_1fr]">
          {/* Left — Job List */}
          <div
            className={`custom-scrollbar space-y-3 lg:sticky lg:top-24 lg:max-h-[calc(100vh-140px)] lg:overflow-y-auto lg:pr-2 ${
              mobileView === "details" ? "hidden lg:block" : "block"
            }`}
          >
            {!loading &&
              jobs.length > 0 &&
              (appliedSearch.trim() || appliedLocation.trim()) && (
                <p className="mb-3 text-sm font-medium text-[#6b7186]">
                  {filteredJobs.length}{" "}
                  {filteredJobs.length === 1 ? "result" : "results"} found
                </p>
              )}

            {loading && (
              <div className="space-y-3">
                {[1, 2, 3].map((i) => (
                  <div
                    key={i}
                    className="h-44 animate-pulse rounded-2xl border border-[#e3e5ec] bg-white"
                  />
                ))}
              </div>
            )}

            {!loading && jobs.length === 0 && (
              <div className="rounded-2xl border border-[#e3e5ec] bg-white p-10 text-center">
                <p className="text-sm font-medium text-[#6b7186]">
                  No jobs available right now.
                </p>
              </div>
            )}

            {/* Search returned no matching jobs */}
            {!loading && jobs.length > 0 && filteredJobs.length === 0 && (
              <div className="rounded-2xl border border-[#e3e5ec] bg-white p-10 text-center">
                <p className="text-sm font-medium text-[#6b7186]">
                  No results found.
                </p>
                <p className="mt-1 text-xs text-[#9ca3af]">
                  Try searching with a different keyword or location.
                </p>
              </div>
            )}

            {!loading &&
              filteredJobs.map((job) => (
                <div key={job._id} onClick={() => handleSelectJob(job)}>
                  <JobCard
                    job={job}
                    isSelected={selectedJob?._id === job._id}
                  />
                </div>
              ))}
          </div>

          {/* Right — Job Details */}
          <div
            className={`lg:sticky lg:top-24 ${
              mobileView === "list" ? "hidden lg:block" : "block"
            }`}
          >
            <JobDetails job={selectedJob} onBack={handleBack} />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Jobs;
