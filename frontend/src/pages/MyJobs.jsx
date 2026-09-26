import React, { useState, useRef, useEffect, useMemo } from "react";
import { toast, Toaster } from "sonner";
import api from "../api/axios";
import Navbar from "../component/Navbar";
import EditJobOverlay from "../component/EditJobOverlay";

/* ----------------------------- Icons ----------------------------- */

const SearchIcon = () => (
  <svg
    className="h-[18px] w-[18px]"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="1.8"
    strokeLinecap="round"
    strokeLinejoin="round"
  >
    <circle cx="11" cy="11" r="7" />
    <path d="m21 21-4.3-4.3" />
  </svg>
);

const PlusIcon = () => (
  <svg
    className="h-[18px] w-[18px]"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
  >
    <path d="M12 5v14M5 12h14" />
  </svg>
);

const PinIcon = () => (
  <svg
    className="h-[14px] w-[14px]"
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
);

const WalletIcon = () => (
  <svg
    className="h-[14px] w-[14px]"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="1.8"
    strokeLinecap="round"
    strokeLinejoin="round"
  >
    <path d="M20 7H4a1 1 0 0 0-1 1v9a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2V9a2 2 0 0 0-2-2Z" />
    <path d="M16 7V5a2 2 0 0 0-2-2H6a2 2 0 0 0-2 2v3" />
    <circle cx="16.5" cy="13.5" r="1.2" fill="currentColor" stroke="none" />
  </svg>
);

const DotsIcon = () => (
  <svg className="h-[18px] w-[18px]" viewBox="0 0 24 24" fill="currentColor">
    <circle cx="12" cy="5" r="1.6" />
    <circle cx="12" cy="12" r="1.6" />
    <circle cx="12" cy="19" r="1.6" />
  </svg>
);

const PencilIcon = () => (
  <svg
    className="h-[14px] w-[14px]"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="1.8"
    strokeLinecap="round"
    strokeLinejoin="round"
  >
    <path d="M12 20h9" />
    <path d="M16.5 3.5a2.12 2.12 0 0 1 3 3L7 19l-4 1 1-4Z" />
  </svg>
);

const TrashIcon = () => (
  <svg
    className="h-[14px] w-[14px]"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="1.8"
    strokeLinecap="round"
    strokeLinejoin="round"
  >
    <path d="M3 6h18" />
    <path d="M8 6V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2" />
    <path d="M19 6l-1 14a2 2 0 0 1-2 2H8a2 2 0 0 1-2-2L5 6" />
  </svg>
);

/* ----------------------------- Job card ------------------------------ */

const JobCard = ({ job, index, onEdit, onRequestDelete }) => {
  const [menuOpen, setMenuOpen] = useState(false);
  const menuRef = useRef(null);

  useEffect(() => {
    const closeOnOutsideClick = (e) => {
      if (menuRef.current && !menuRef.current.contains(e.target)) {
        setMenuOpen(false);
      }
    };

    document.addEventListener("mousedown", closeOnOutsideClick);

    return () => document.removeEventListener("mousedown", closeOnOutsideClick);
  }, []);

  /*
    Backend currently doesn't have applicants/trend.

    Temporary values are used only to keep the existing UI.
    We'll replace these when we build the application system.
  */
  const applicants = job.applicants || 0;
  const applicantInitials = job.applicantInitials || [];

  return (
    <div
      className="job-card-enter group relative flex gap-4 rounded-2xl border border-[#e3e5ec] bg-white p-5 pl-4 transition-all hover:-translate-y-0.5 hover:border-[#c2c6d4] hover:shadow-[0_10px_30px_-16px_rgba(13,15,23,0.25)] sm:p-6 sm:pl-5"
      style={{ animationDelay: `${index * 70}ms` }}
    >
      {/* accent rail */}
      <span className="absolute bottom-5 left-0 top-5 w-1 rounded-full bg-[#C8FF4D]" />

      <div className="min-w-0 flex-1">
        <div className="flex items-start justify-between gap-3">
          <div className="min-w-0">
            <h3 className="truncate text-[1.05rem] font-semibold text-[#0d0f17]">
              {job.title}
            </h3>

            {/* BACKEND: company → companyName */}
            <p className="mt-0.5 text-sm text-[#6b7186]">{job.companyName}</p>
          </div>

          <div className="relative shrink-0" ref={menuRef}>
            <button
              type="button"
              onClick={() => setMenuOpen((v) => !v)}
              aria-label="Job options"
              className="flex h-8 w-8 items-center justify-center rounded-lg text-[#6b7186] transition hover:bg-[#f2f3f6] hover:text-[#0d0f17]"
            >
              <DotsIcon />
            </button>

            {menuOpen && (
              <div className="absolute right-0 top-9 z-10 w-40 overflow-hidden rounded-xl border border-[#e3e5ec] bg-white py-1 shadow-lg shadow-[#0d0f17]/10">
                <button
                  type="button"
                  onClick={() => {
                    onEdit(job);
                    setMenuOpen(false);
                  }}
                  className="flex w-full items-center gap-2 px-4 py-2 text-left text-sm text-[#333a52] hover:bg-[#f2f3f6]"
                >
                  <PencilIcon />
                  Edit job
                </button>

                <button
                  type="button"
                  onClick={() => {
                    onRequestDelete(job);
                    setMenuOpen(false);
                  }}
                  className="flex w-full items-center gap-2 px-4 py-2 text-left text-sm text-[#c0392b] hover:bg-[#fbeceb]"
                >
                  <TrashIcon />
                  Delete job
                </button>
              </div>
            )}
          </div>
        </div>

        {/* Job information */}
        <div className="mt-3 flex flex-wrap items-center gap-x-4 gap-y-1.5 text-[13px] text-[#6b7186]">
          <span className="inline-flex items-center gap-1.5">
            <PinIcon />
            {job.location}
          </span>

          <span className="inline-flex items-center gap-1.5">
            <WalletIcon />
            {job.salary}
          </span>

          {/* BACKEND: type → jobType */}
          <span>{job.jobType}</span>
        </div>

        {/* Skills */}
        <div className="mt-4 flex flex-wrap gap-2">
          {job.skills?.map((skill, index) => (
            <span
              key={index}
              className="rounded-full bg-[#f2f3f6] px-3 py-1 text-xs font-medium text-[#333a52] ring-1 ring-[#e3e5ec]"
            >
              {skill}
            </span>
          ))}
        </div>

        {/* Bottom section */}
        <div className="mt-5 flex flex-wrap items-end justify-between gap-4 border-t border-[#e3e5ec] pt-4">
          <div>
            <div className="flex items-center -space-x-2">
              {applicantInitials.map((initials) => (
                <span
                  key={initials}
                  className="flex h-7 w-7 items-center justify-center rounded-full border-2 border-white bg-[#0d0f17] text-[10px] font-semibold text-white"
                >
                  {initials}
                </span>
              ))}
            </div>

            <p className="mt-1.5 text-xs text-[#6b7186]">
              <span className="font-semibold text-[#0d0f17]">{applicants}</span>{" "}
              applicants
            </p>
          </div>
        </div>

        {/* Created date */}
        <p className="mt-3 text-xs text-[#9aa1b5]">
          {job.createdAt
            ? `Posted ${new Date(job.createdAt).toLocaleDateString("en-IN", {
                day: "numeric",
                month: "short",
                year: "numeric",
              })}`
            : "Posted recently"}
        </p>
      </div>
    </div>
  );
};

/* --------------------------- Delete modal ---------------------------- */

const DeleteModal = ({ job, onCancel, onConfirm }) => {
  if (!job) return null;

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center bg-[#0d0f17]/40 px-6 backdrop-blur-sm"
      onClick={onCancel}
    >
      <div
        className="w-full max-w-sm rounded-2xl bg-white p-6 shadow-2xl"
        onClick={(e) => e.stopPropagation()}
      >
        <h3 className="text-[1.05rem] font-semibold text-[#0d0f17]">
          Delete this job posting?
        </h3>

        <p className="mt-2 text-sm leading-relaxed text-[#6b7186]">
          "{job.title}" at {job.companyName} will be removed. This can't be
          undone.
        </p>

        <div className="mt-6 flex justify-end gap-3">
          <button
            type="button"
            onClick={onCancel}
            className="rounded-xl px-4 py-2.5 text-sm font-medium text-[#333a52] transition hover:bg-[#f2f3f6]"
          >
            Cancel
          </button>

          <button
            type="button"
            onClick={onConfirm}
            className="rounded-xl bg-[#c0392b] px-4 py-2.5 text-sm font-medium text-white transition hover:bg-[#a5301f]"
          >
            Delete job
          </button>
        </div>
      </div>
    </div>
  );
};

/* ------------------------------ Page ---------------------------------- */

const MyJobs = () => {
  const [jobs, setJobs] = useState([]);
  const [query, setQuery] = useState("");
  const [pendingDelete, setPendingDelete] = useState(null);
  const [editingJob, setEditingJob] = useState(null);

  /* --------------------------- Get My Jobs --------------------------- */

  const getMyJobs = async () => {
    try {
      const response = await api.get("/job/my-jobs");

      if (response.data.success) {
        setJobs(response.data.jobs);
      }
    } catch (error) {
      console.log("Error fetching my jobs:", error);
    }
  };

  useEffect(() => {
    getMyJobs();
  }, []);

  /* ------------------------------ Stats ------------------------------ */

  const stats = useMemo(() => {
    /*
      Applicants will be 0 until we build the Apply Job system.
    */
    const applicants = jobs.reduce(
      (sum, job) => sum + (job.applicants || 0),
      0,
    );

    return {
      total: jobs.length,
      applicants,
    };
  }, [jobs]);

  /* --------------------------- Filtering ----------------------------- */

  const filteredJobs = jobs.filter((job) => {
    const matchesQuery = `
      ${job.title || ""}
      ${job.companyName || ""}
      ${job.location || ""}
      ${job.description || ""}
      ${job.skills?.join(" ") || ""}
    `
      .toLowerCase()
      .includes(query.toLowerCase());

    return matchesQuery;
  });

  /* ------------------------------ Edit ------------------------------- */

  const handleEdit = (job) => {
    setEditingJob(job);
  };

  const handleJobUpdated = (updatedJob) => {
    setJobs((prev) =>
      prev.map((job) => (job._id === updatedJob._id ? updatedJob : job)),
    );

    setEditingJob(null);
  };

  /* ----------------------------- Delete ------------------------------ */

  const confirmDelete = async () => {
    if (!pendingDelete) return;

    try {
      const response = await api.delete(`/job/delete/${pendingDelete._id}`);

      if (response.data.success) {
        setJobs((prev) => prev.filter((job) => job._id !== pendingDelete._id));

        toast.success(`"${pendingDelete.title}" deleted`);

        setPendingDelete(null);
      }
    } catch (error) {
      console.log("Delete job error:", error);

      toast.error(error.response?.data?.message || "Failed to delete job");
    }
  };

  /* ----------------------------- Create ------------------------------ */

  const handleCreate = () => {
    console.log("Create job");
  };

  return (
    <div className="min-h-screen bg-[#f2f3f6] font-sans text-[#0d0f17] antialiased">
      <Navbar />
      <style>{`
        @keyframes jobCardIn {
          from {
            opacity: 0;
            transform: translateY(10px);
          }

          to {
            opacity: 1;
            transform: translateY(0);
          }
        }

        .job-card-enter {
          opacity: 0;
          animation: jobCardIn 0.5s cubic-bezier(0.16, 1, 0.3, 1) forwards;
        }

        @media (prefers-reduced-motion: reduce) {
          .job-card-enter {
            animation: none;
            opacity: 1;
          }
        }
      `}</style>

      <Toaster position="top-right" richColors />

      <div className="mx-auto max-w-3xl px-6 py-10 sm:py-14">
        {/* HEADER */}
        <div className="mb-6">
          <h1 className="text-[1.65rem] font-semibold text-[#0d0f17]">
            My Jobs
          </h1>

          <p className="mt-1.5 text-sm text-[#6b7186]">
            Manage the jobs you've posted
          </p>
        </div>

        {/* STATS PANEL */}
        <div className="relative mb-6 overflow-hidden rounded-2xl bg-[#0d0f17] px-6 py-5 text-white sm:px-7">
          <svg
            className="pointer-events-none absolute -right-6 -top-6 w-52 opacity-60"
            viewBox="0 0 200 120"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M-10 100 C 30 90, 50 60, 80 55 C 110 50, 120 80, 150 60 C 175 44, 170 10, 210 -5"
              stroke="#C8FF4D"
              strokeOpacity="0.18"
              strokeWidth="2"
            />

            <circle cx="80" cy="55" r="3" fill="#C8FF4D" fillOpacity="0.5" />

            <circle cx="150" cy="60" r="3" fill="#C8FF4D" fillOpacity="0.6" />

            <circle cx="210" cy="-5" r="4" fill="#C8FF4D" />
          </svg>

          <div className="relative z-10 grid grid-cols-2 divide-x divide-white/10">
            <div className="pr-4">
              <p className="text-2xl font-semibold sm:text-[1.75rem]">
                {stats.total}
              </p>

              <p className="mt-0.5 text-xs text-[#c2c6d4]">Jobs posted</p>
            </div>

            <div className="pl-4">
              <p className="text-2xl font-semibold sm:text-[1.75rem]">
                {stats.applicants}
              </p>

              <p className="mt-0.5 text-xs text-[#c2c6d4]">Total applicants</p>
            </div>
          </div>
        </div>

        {/* SEARCH + CREATE */}
        <div className="mb-6 flex flex-col gap-3 sm:flex-row">
          <div className="relative flex-1">
            <span className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3.5 text-[#6b7186]">
              <SearchIcon />
            </span>

            <input
              type="text"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder="Search your jobs..."
              className="w-full rounded-xl border border-[#e3e5ec] bg-white py-3 pl-11 pr-4 text-[15px] text-[#0d0f17] placeholder:text-[#6b7186]/70 outline-none transition focus:border-[#232939] focus:ring-4 focus:ring-[#0d0f17]/5"
            />
          </div>

          {/* <button
            type="button"
            onClick={handleCreate}
            className="inline-flex shrink-0 items-center justify-center gap-2 rounded-xl bg-[#0d0f17] px-5 py-3 text-[15px] font-medium text-white transition hover:bg-[#232939] focus:outline-none focus:ring-4 focus:ring-[#0d0f17]/15"
          >
            <PlusIcon />
            Create Job
          </button> */}
        </div>

        {/* JOB LIST */}
        {filteredJobs.length > 0 ? (
          <div className="space-y-4">
            {filteredJobs.map((job, i) => (
              <JobCard
                key={job._id}
                job={job}
                index={i}
                onEdit={handleEdit}
                onRequestDelete={setPendingDelete}
              />
            ))}
          </div>
        ) : (
          <div className="rounded-2xl border border-dashed border-[#e3e5ec] bg-white px-6 py-14 text-center">
            <p className="text-sm font-medium text-[#333a52]">
              {query ? `No jobs match "${query}"` : "No jobs posted yet"}
            </p>

            <p className="mt-1 text-sm text-[#6b7186]">
              Try a different search, or create a new job posting.
            </p>
          </div>
        )}
      </div>

      <DeleteModal
        job={pendingDelete}
        onCancel={() => setPendingDelete(null)}
        onConfirm={confirmDelete}
      />

      {editingJob && (
        <EditJobOverlay
          job={editingJob}
          onClose={() => setEditingJob(null)}
          onUpdated={handleJobUpdated}
        />
      )}
    </div>
  );
};

export default MyJobs;
