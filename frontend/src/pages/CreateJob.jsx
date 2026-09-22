import React, { useState } from "react";
import api from "../api/axios";
import Navbar from "../component/Navbar";
import { toast } from "sonner";

const CreateJob = () => {
  const [jobTitle, setJobTitle] = useState("");
  const [companyName, setCompanyName] = useState("");
  const [description, setDescription] = useState("");
  const [requirements, setRequirements] = useState("");
  const [salary, setSalary] = useState("");
  const [location, setLocation] = useState("");
  const [jobType, setJobType] = useState("");
  const [experienceLevel, setExperienceLevel] = useState("");
  const [skills, setSkills] = useState(["React", "Node.js", "MongoDB"]);
  const [skillInput, setSkillInput] = useState("");

  const addSkill = () => {
    const trimmed = skillInput.trim();
    if (trimmed && !skills.includes(trimmed)) {
      setSkills([...skills, trimmed]);
    }
    setSkillInput("");
  };

  const handleSkillKeyDown = (e) => {
    if (e.key === "Enter" || e.key === ",") {
      e.preventDefault();
      addSkill();
    } else if (
      e.key === "Backspace" &&
      skillInput === "" &&
      skills.length > 0
    ) {
      setSkills(skills.slice(0, -1));
    }
  };

  const removeSkill = (indexToRemove) => {
    setSkills(skills.filter((_, i) => i !== indexToRemove));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const jobData = {
      title: jobTitle,
      companyName,
      description,
      requirements,
      salary,
      location,
      jobType,
      experienceLevel,
      skills,
    };

    try {
      const response = await api.post("/job/create", jobData);
      if (response.data.success) {
        toast.success(response.data.message || "Job Posted Successfully");
      }

      // console.log(response.data);
    } catch (error) {
      toast.error(
        error.response.data.message ||
          "Something went wrong. Please try again after sometime",
      );
      console.log("Create job error:", error);
    }
  };

  return (
    <div className="min-h-screen font-sans bg-[#f2f3f6] text-[#0d0f17] antialiased">
      {/* TOP BAR */}
      <Navbar />
      {/*  */}
      {/* PAGE CONTENT */}
      <div className="mx-auto max-w-6xl px-6 py-12 sm:px-8">
        <div className="mb-10">
          <h1 className="text-[1.9rem] font-semibold leading-tight sm:text-3xl">
            Post a new job
          </h1>
          <p className="mt-2 text-[15px] text-[#6b7186]">
            Fill in the role details below — candidates on HirePoint will see
            this exactly as you write it.
          </p>
        </div>

        <div className="grid gap-8 lg:grid-cols-[1fr_380px] lg:items-start">
          {/* FORM COLUMN */}
          <form
            onSubmit={handleSubmit}
            className="relative space-y-6 pl-14 sm:pl-16"
          >
            <div className="absolute left-[19px] top-2 bottom-2 w-px bg-[#e3e5ec] sm:left-[23px]"></div>

            {/* SECTION 1 — Role basics */}
            <div className="relative">
              <span className="absolute -left-14 top-6 flex h-9 w-9 items-center justify-center rounded-full bg-[#0d0f17] text-sm font-semibold text-white ring-4 ring-[#f2f3f6] sm:-left-16 sm:h-10 sm:w-10">
                1
              </span>
              <div className="rounded-2xl border border-[#e3e5ec] bg-white p-6 shadow-sm sm:p-8">
                <h2 className="text-lg font-semibold text-[#0d0f17]">
                  Role basics
                </h2>
                <p className="mt-1 text-sm text-[#6b7186]">
                  The title and company candidates will see first.
                </p>

                <div className="mt-6 grid gap-5 sm:grid-cols-2">
                  <div>
                    <label
                      htmlFor="jobTitle"
                      className="mb-1.5 block text-sm font-medium text-[#333a52]"
                    >
                      Job title
                    </label>
                    <input
                      id="jobTitle"
                      type="text"
                      value={jobTitle}
                      onChange={(e) => setJobTitle(e.target.value)}
                      placeholder="e.g. Senior Frontend Engineer"
                      className="w-full rounded-xl border border-[#e3e5ec] bg-white px-4 py-3 text-[15px] text-[#0d0f17] placeholder:text-[#6b7186]/70 outline-none transition focus:border-[#232939] focus:ring-4 focus:ring-[#0d0f17]/5"
                    />
                  </div>
                  <div>
                    <label
                      htmlFor="companyName"
                      className="mb-1.5 block text-sm font-medium text-[#333a52]"
                    >
                      Company name
                    </label>
                    <input
                      id="companyName"
                      type="text"
                      value={companyName}
                      onChange={(e) => setCompanyName(e.target.value)}
                      placeholder="e.g. Fernway Inc."
                      className="w-full rounded-xl border border-[#e3e5ec] bg-white px-4 py-3 text-[15px] text-[#0d0f17] placeholder:text-[#6b7186]/70 outline-none transition focus:border-[#232939] focus:ring-4 focus:ring-[#0d0f17]/5"
                    />
                  </div>
                </div>
              </div>
            </div>

            {/* SECTION 2 — Description & requirements */}
            <div className="relative">
              <span className="absolute -left-14 top-6 flex h-9 w-9 items-center justify-center rounded-full bg-[#0d0f17] text-sm font-semibold text-white ring-4 ring-[#f2f3f6] sm:-left-16 sm:h-10 sm:w-10">
                2
              </span>
              <div className="rounded-2xl border border-[#e3e5ec] bg-white p-6 shadow-sm sm:p-8">
                <h2 className="text-lg font-semibold text-[#0d0f17]">
                  Description &amp; requirements
                </h2>
                <p className="mt-1 text-sm text-[#6b7186]">
                  Set expectations clearly — it's the biggest driver of quality
                  applications.
                </p>

                <div className="mt-6 space-y-5">
                  <div>
                    <label
                      htmlFor="description"
                      className="mb-1.5 block text-sm font-medium text-[#333a52]"
                    >
                      Job description
                    </label>
                    <textarea
                      id="description"
                      rows="5"
                      value={description}
                      onChange={(e) => setDescription(e.target.value)}
                      placeholder="Describe the role, the team, and what a typical day looks like..."
                      className="w-full resize-none rounded-xl border border-[#e3e5ec] bg-white px-4 py-3 text-[15px] leading-relaxed text-[#0d0f17] placeholder:text-[#6b7186]/70 outline-none transition focus:border-[#232939] focus:ring-4 focus:ring-[#0d0f17]/5"
                    ></textarea>
                  </div>
                  <div>
                    <label
                      htmlFor="requirements"
                      className="mb-1.5 block text-sm font-medium text-[#333a52]"
                    >
                      Requirements
                    </label>
                    <textarea
                      id="requirements"
                      rows="4"
                      value={requirements}
                      onChange={(e) => setRequirements(e.target.value)}
                      placeholder="List qualifications, must-haves, and nice-to-haves..."
                      className="w-full resize-none rounded-xl border border-[#e3e5ec] bg-white px-4 py-3 text-[15px] leading-relaxed text-[#0d0f17] placeholder:text-[#6b7186]/70 outline-none transition focus:border-[#232939] focus:ring-4 focus:ring-[#0d0f17]/5"
                    ></textarea>
                  </div>
                </div>
              </div>
            </div>

            {/* SECTION 3 — Compensation & logistics */}
            <div className="relative">
              <span className="absolute -left-14 top-6 flex h-9 w-9 items-center justify-center rounded-full bg-[#0d0f17] text-sm font-semibold text-white ring-4 ring-[#f2f3f6] sm:-left-16 sm:h-10 sm:w-10">
                3
              </span>
              <div className="rounded-2xl border border-[#e3e5ec] bg-white p-6 shadow-sm sm:p-8">
                <h2 className="text-lg font-semibold text-[#0d0f17]">
                  Compensation &amp; logistics
                </h2>
                <p className="mt-1 text-sm text-[#6b7186]">
                  Where the role is based, and what it pays.
                </p>

                <div className="mt-6 grid gap-5 sm:grid-cols-2">
                  <div>
                    <label
                      htmlFor="salary"
                      className="mb-1.5 block text-sm font-medium text-[#333a52]"
                    >
                      Salary
                    </label>
                    <div className="relative">
                      <span className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3.5 text-[#6b7186]">
                        <svg
                          className="h-[18px] w-[18px]"
                          viewBox="0 0 24 24"
                          fill="none"
                          stroke="currentColor"
                          strokeWidth="1.8"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                        >
                          <path d="M12 1v22" />
                          <path d="M17 5H9.5a3.5 3.5 0 0 0 0 7h5a3.5 3.5 0 0 1 0 7H6" />
                        </svg>
                      </span>
                      <input
                        id="salary"
                        type="text"
                        value={salary}
                        onChange={(e) => setSalary(e.target.value)}
                        placeholder="₹3,00,000 –  ₹6,00,000 / yr"
                        className="w-full rounded-xl border border-[#e3e5ec] bg-white py-3 pl-11 pr-4 text-[15px] text-[#0d0f17] placeholder:text-[#6b7186]/70 outline-none transition focus:border-[#232939] focus:ring-4 focus:ring-[#0d0f17]/5"
                      />
                    </div>
                  </div>
                  <div>
                    <label
                      htmlFor="location"
                      className="mb-1.5 block text-sm font-medium text-[#333a52]"
                    >
                      Location
                    </label>
                    <div className="relative">
                      <span className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3.5 text-[#6b7186]">
                        <svg
                          className="h-[18px] w-[18px]"
                          viewBox="0 0 24 24"
                          fill="none"
                          stroke="currentColor"
                          strokeWidth="1.8"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                        >
                          <path d="M20 10c0 6-8 12-8 12s-8-6-8-12a8 8 0 0 1 16 0Z" />
                          <circle cx="12" cy="10" r="3" />
                        </svg>
                      </span>
                      <input
                        id="location"
                        type="text"
                        value={location}
                        onChange={(e) => setLocation(e.target.value)}
                        placeholder="Bengaluru, India · Remote"
                        className="w-full rounded-xl border border-[#e3e5ec] bg-white py-3 pl-11 pr-4 text-[15px] text-[#0d0f17] placeholder:text-[#6b7186]/70 outline-none transition focus:border-[#232939] focus:ring-4 focus:ring-[#0d0f17]/5"
                      />
                    </div>
                  </div>
                  <div>
                    <label
                      htmlFor="jobType"
                      className="mb-1.5 block text-sm font-medium text-[#333a52]"
                    >
                      Job type
                    </label>
                    <div className="relative">
                      <span className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3.5 text-[#6b7186]">
                        <svg
                          className="h-[18px] w-[18px]"
                          viewBox="0 0 24 24"
                          fill="none"
                          stroke="currentColor"
                          strokeWidth="1.8"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                        >
                          <rect x="2" y="7" width="20" height="14" rx="2" />
                          <path d="M16 21V5a2 2 0 0 0-2-2h-4a2 2 0 0 0-2 2v16" />
                        </svg>
                      </span>
                      <select
                        id="jobType"
                        value={jobType}
                        onChange={(e) => setJobType(e.target.value)}
                        className="w-full appearance-none rounded-xl border border-[#e3e5ec] bg-white py-3 pl-11 pr-10 text-[15px] text-[#0d0f17] outline-none transition focus:border-[#232939] focus:ring-4 focus:ring-[#0d0f17]/5"
                      >
                        <option value="" disabled>
                          Select job type
                        </option>
                        <option>Full-time</option>
                        <option>Part-time</option>
                        <option>Internship</option>
                      </select>
                      <span className="pointer-events-none absolute inset-y-0 right-0 flex items-center pr-3.5 text-[#6b7186]">
                        <svg
                          className="h-[18px] w-[18px]"
                          viewBox="0 0 24 24"
                          fill="none"
                          stroke="currentColor"
                          strokeWidth="1.8"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                        >
                          <path d="m6 9 6 6 6-6" />
                        </svg>
                      </span>
                    </div>
                  </div>
                  <div>
                    <label
                      htmlFor="experience"
                      className="mb-1.5 block text-sm font-medium text-[#333a52]"
                    >
                      Experience level
                    </label>
                    <div className="relative">
                      <span className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3.5 text-[#6b7186]">
                        <svg
                          className="h-[18px] w-[18px]"
                          viewBox="0 0 24 24"
                          fill="none"
                          stroke="currentColor"
                          strokeWidth="1.8"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                        >
                          <path d="M3 20V10" />
                          <path d="M10 20V4" />
                          <path d="M17 20v-7" />
                        </svg>
                      </span>
                      <select
                        id="experience"
                        value={experienceLevel}
                        onChange={(e) => setExperienceLevel(e.target.value)}
                        className="w-full appearance-none rounded-xl border border-[#e3e5ec] bg-white py-3 pl-11 pr-10 text-[15px] text-[#0d0f17] outline-none transition focus:border-[#232939] focus:ring-4 focus:ring-[#0d0f17]/5"
                      >
                        <option value="">Select experience level</option>
                        <option value="Fresher">Fresher</option>
                        <option value="Junior">Junior</option>
                        <option value="Mid-level">Mid-level</option>
                        <option value="Senior">Senior</option>
                      </select>
                      <span className="pointer-events-none absolute inset-y-0 right-0 flex items-center pr-3.5 text-[#6b7186]">
                        <svg
                          className="h-[18px] w-[18px]"
                          viewBox="0 0 24 24"
                          fill="none"
                          stroke="currentColor"
                          strokeWidth="1.8"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                        >
                          <path d="m6 9 6 6 6-6" />
                        </svg>
                      </span>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* SECTION 4 — Skills */}
            <div className="relative">
              <span className="absolute -left-14 top-6 flex h-9 w-9 items-center justify-center rounded-full bg-[#0d0f17] text-sm font-semibold text-white ring-4 ring-[#f2f3f6] sm:-left-16 sm:h-10 sm:w-10">
                4
              </span>
              <div className="rounded-2xl border border-[#e3e5ec] bg-white p-6 shadow-sm sm:p-8">
                <h2 className="text-lg font-semibold text-[#0d0f17]">Skills</h2>
                <p className="mt-1 text-sm text-[#6b7186]">
                  Used to match your listing with the right candidates.
                </p>

                <div
                  onClick={() => document.getElementById("skills")?.focus()}
                  className="mt-6 flex flex-wrap items-center gap-2 rounded-xl border border-[#e3e5ec] bg-white px-3 py-2.5 focus-within:border-[#232939] focus-within:ring-4 focus-within:ring-[#0d0f17]/5"
                >
                  {skills.map((skill, index) => (
                    <span
                      key={skill}
                      className="inline-flex items-center gap-1.5 rounded-lg bg-[#f2f3f6] py-1.5 pl-3 pr-2 text-sm font-medium text-[#333a52]"
                    >
                      {skill}
                      <button
                        type="button"
                        onClick={() => removeSkill(index)}
                        className="rounded p-0.5 text-[#6b7186] transition hover:bg-[#e3e5ec] hover:text-[#0d0f17]"
                      >
                        <svg
                          className="h-3.5 w-3.5"
                          viewBox="0 0 24 24"
                          fill="none"
                          stroke="currentColor"
                          strokeWidth="2"
                          strokeLinecap="round"
                        >
                          <path d="M18 6 6 18" />
                          <path d="m6 6 12 12" />
                        </svg>
                      </button>
                    </span>
                  ))}
                  <input
                    id="skills"
                    type="text"
                    value={skillInput}
                    onChange={(e) => setSkillInput(e.target.value)}
                    onKeyDown={handleSkillKeyDown}
                    onBlur={addSkill}
                    placeholder={
                      skills.length === 0
                        ? "Add a skill and press Enter..."
                        : "Add another..."
                    }
                    className="min-w-[160px] flex-1 border-none bg-transparent py-1.5 text-[15px] text-[#0d0f17] placeholder:text-[#6b7186]/70 outline-none"
                  />
                </div>
                <p className="mt-1.5 text-xs text-[#6b7186]">
                  Press Enter or comma to add a skill.
                </p>
              </div>
            </div>

            {/* ACTIONS */}
            <div className="flex flex-col-reverse gap-3 pt-2 sm:flex-row sm:justify-end">
              <button
                type="button"
                className="rounded-xl border border-[#e3e5ec] bg-white px-6 py-3 text-[15px] font-medium text-[#333a52] transition hover:bg-[#f2f3f6]"
              >
                Cancel
              </button>
              <button
                type="submit"
                className="rounded-xl bg-[#0d0f17] px-6 py-3 text-[15px] font-medium text-white transition hover:bg-[#232939] focus:outline-none focus:ring-4 focus:ring-[#0d0f17]/15"
              >
                Create Job
              </button>
            </div>
          </form>

          {/* LIVE PREVIEW COLUMN */}
          <div className="lg:sticky lg:top-8">
            <div className="mb-3 flex items-center gap-2 px-1">
              <span className="h-2 w-2 rounded-full bg-[#C8FF4D]"></span>
              <span className="text-xs font-medium uppercase tracking-wide text-[#6b7186]">
                Live preview
              </span>
            </div>

            <div className="overflow-hidden rounded-2xl border border-[#e3e5ec] bg-white shadow-sm">
              <div className="border-b border-[#e3e5ec] p-6">
                <div className="flex items-start gap-3">
                  <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-[#0d0f17] text-lg font-semibold text-white">
                    {companyName.trim()
                      ? companyName.trim().charAt(0).toUpperCase()
                      : "F"}
                  </div>
                  <div className="min-w-0">
                    <h3 className="truncate text-[17px] font-semibold text-[#0d0f17]">
                      {jobTitle.trim() || "Senior Frontend Engineer"}
                    </h3>
                    <p className="mt-0.5 text-sm text-[#6b7186]">
                      {companyName.trim() || "Fernway Inc."}
                    </p>
                  </div>
                </div>

                <div className="mt-4 flex flex-wrap gap-x-4 gap-y-2 text-sm text-[#6b7186]">
                  <span className="inline-flex items-center gap-1.5">
                    <svg
                      className="h-4 w-4"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="1.8"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    >
                      <path d="M20 10c0 6-8 12-8 12s-8-6-8-12a8 8 0 0 1 16 0Z" />
                      <circle cx="12" cy="10" r="3" />
                    </svg>
                    {location.trim() || "Bengaluru · Remote"}
                  </span>
                  <span className="inline-flex items-center gap-1.5">
                    <svg
                      className="h-4 w-4"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="1.8"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    >
                      <rect x="2" y="7" width="20" height="14" rx="2" />
                      <path d="M16 21V5a2 2 0 0 0-2-2h-4a2 2 0 0 0-2 2v16" />
                    </svg>
                    {jobType || "Full-time"}
                  </span>
                </div>

                <div className="mt-4 flex flex-wrap gap-2">
                  <span className="rounded-lg bg-[#f2f3f6] px-3 py-1.5 text-sm font-medium text-[#333a52]">
                    {salary.trim() || " ₹3,00,000 –  ₹6,00,000 / yr"}
                  </span>
                  <span className="rounded-lg bg-[#f2f3f6] px-3 py-1.5 text-sm font-medium text-[#333a52]">
                    {experienceLevel || "Senior level"}
                  </span>
                </div>
              </div>

              <div className="relative p-6">
                <p className="line-clamp-4 text-sm leading-relaxed text-[#333a52]">
                  {description.trim() ||
                    "We're looking for a frontend engineer to help shape the next chapter of our product — owning features end to end, working closely with design, and mentoring..."}
                </p>
                <div className="pointer-events-none absolute inset-x-0 bottom-0 h-10 bg-gradient-to-t from-white to-white/0"></div>

                <div className="mt-4 flex flex-wrap gap-2">
                  {(skills.length > 0
                    ? skills
                    : ["React", "Node.js", "MongoDB"]
                  ).map((skill) => (
                    <span
                      key={skill}
                      className="rounded-full border border-[#e3e5ec] px-2.5 py-1 text-xs font-medium text-[#333a52]"
                    >
                      {skill}
                    </span>
                  ))}
                </div>
              </div>

              <div className="border-t border-[#e3e5ec] bg-[#f2f3f6] px-6 py-4">
                <div className="w-full cursor-default rounded-xl bg-[#0d0f17]/40 py-2.5 text-center text-sm font-medium text-white">
                  Apply now
                </div>
              </div>
            </div>

            <p className="mt-3 px-1 text-xs leading-relaxed text-[#6b7186]">
              This preview updates as you fill in the form.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CreateJob;
