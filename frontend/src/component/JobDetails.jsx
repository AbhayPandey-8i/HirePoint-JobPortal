import React from "react";

const BookmarkIcon = () => (
  <svg
    className="h-[18px] w-[18px]"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="1.8"
    strokeLinecap="round"
    strokeLinejoin="round"
  >
    <path d="M6 3.75A1.75 1.75 0 0 1 7.75 2h8.5A1.75 1.75 0 0 1 18 3.75v17.5l-6-4.2-6 4.2V3.75Z" />
  </svg>
);

const ThumbsDownIcon = () => (
  <svg
    className="h-[18px] w-[18px]"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="1.8"
    strokeLinecap="round"
    strokeLinejoin="round"
  >
    <path d="M7 14V4m0 10-3 0a1 1 0 0 1-1-1V9a1 1 0 0 1 1-1h3m0 6 4.5 5a2 2 0 0 0 3.5-1.3v-2.2h4a2 2 0 0 0 2-2.3l-1-6A2 2 0 0 0 16 6h-6.5" />
  </svg>
);

const ShareIcon = () => (
  <svg
    className="h-[18px] w-[18px]"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="1.8"
    strokeLinecap="round"
    strokeLinejoin="round"
  >
    <path d="M13 5.5 8.5 9m4.5-3.5L17.5 9M13 5.5V15m-5-1.5v5a1 1 0 0 0 1 1h8a1 1 0 0 0 1-1v-5" />
  </svg>
);

const PayIcon = () => (
  <svg
    className="h-[18px] w-[18px]"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="1.8"
    strokeLinecap="round"
    strokeLinejoin="round"
  >
    <rect x="2" y="6" width="20" height="12" rx="2" />
    <circle cx="12" cy="12" r="2.5" />
  </svg>
);

const BriefcaseIcon = () => (
  <svg
    className="h-[18px] w-[18px]"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="1.8"
    strokeLinecap="round"
    strokeLinejoin="round"
  >
    <rect x="3" y="7" width="18" height="13" rx="2" />
    <path strokeLinecap="round" d="M8 7V5a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2" />
  </svg>
);

const BackIcon = () => (
  <svg
    className="h-4 w-4"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
  >
    <path d="M15 18l-6-6 6-6" />
  </svg>
);

const JobDetails = ({ job, onBack }) => {
  if (!job) {
    return (
      <div className="flex h-[60vh] flex-col items-center justify-center rounded-2xl border border-[#e3e5ec] bg-white text-center">
        <span className="flex h-14 w-14 items-center justify-center rounded-2xl bg-[#0d0f17]/[0.06]">
          <span className="text-2xl">💼</span>
        </span>
        <p className="mt-4 text-sm font-medium text-[#6b7186]">
          Select a job to view details
        </p>
      </div>
    );
  }

  return (
    <div className="overflow-hidden rounded-2xl border border-[#e3e5ec] bg-white">
      {/* Dark header block, matches hero/register panel */}
      <div className="relative overflow-hidden bg-[#0d0f17] px-6 py-7 text-[#f2f3f6] sm:px-8">
        <svg
          className="pointer-events-none absolute -right-10 -top-10 w-64 opacity-70"
          viewBox="0 0 200 200"
          fill="none"
        >
          <circle cx="150" cy="40" r="3" fill="#C8FF4D" fillOpacity="0.6" />
          <circle cx="170" cy="90" r="4" fill="#C8FF4D" fillOpacity="0.4" />
          <path
            d="M120 20 C 150 40, 140 80, 180 100"
            stroke="#C8FF4D"
            strokeOpacity="0.2"
            strokeWidth="2"
          />
        </svg>

        <div className="relative z-10">
          {/* Back button — mobile/tablet only */}
          <button
            onClick={onBack}
            className="mb-4 -ml-1 flex items-center gap-1.5 text-sm font-medium text-[#c2c6d4] transition hover:text-[#C8FF4D] lg:hidden"
          >
            <BackIcon />
            Back to jobs
          </button>

          <h1 className="text-2xl font-semibold">{job.title}</h1>
          <p className="mt-2 w-fit cursor-pointer font-medium text-[#C8FF4D] hover:underline">
            {job.companyName}
          </p>
          <p className="mt-1 flex items-center gap-1 text-sm text-[#c2c6d4]">
            <span>📍</span> {job.location}
          </p>
          <p className="mt-2 text-sm font-medium text-[#f2f3f6]">
            ₹{job.salary?.toLocaleString("en-IN")} a year · {job.jobType}
          </p>

          {/* Actions */}
          <div className="mt-6 flex items-center gap-3">
            <button className="rounded-xl bg-[#C8FF4D] px-6 py-2.5 text-sm font-semibold text-[#0d0f17] shadow-sm transition hover:bg-[#b8ef3d] active:bg-[#a8de2d]">
              Apply now
            </button>

            <button
              className="rounded-xl bg-white/10 p-2.5 text-[#c2c6d4] transition hover:bg-white/15 hover:text-[#C8FF4D]"
              aria-label="Save job"
            >
              <BookmarkIcon />
            </button>

            <button
              className="rounded-xl bg-white/10 p-2.5 text-[#c2c6d4] transition hover:bg-white/15 hover:text-red-400"
              aria-label="Not interested"
            >
              <ThumbsDownIcon />
            </button>

            <button
              className="rounded-xl bg-white/10 p-2.5 text-[#c2c6d4] transition hover:bg-white/15 hover:text-[#C8FF4D]"
              aria-label="Share job"
            >
              <ShareIcon />
            </button>
          </div>
        </div>
      </div>

      <div className="custom-scrollbar max-h-[calc(100vh-140px-160px)] overflow-y-auto p-6 sm:p-8">
        {/* Job details */}
        <div>
          <h2 className="text-lg font-semibold text-[#0d0f17]">Job details</h2>
          <p className="mt-1 text-sm text-[#6b7186]">
            Here's how the role aligns with your{" "}
            <span className="cursor-pointer text-[#0d0f17] underline underline-offset-2">
              profile
            </span>
            .
          </p>

          <div className="mt-5 grid gap-4 sm:grid-cols-3">
            <div className="rounded-xl border border-[#e3e5ec] bg-[#f2f3f6] p-4">
              <div className="flex items-center gap-2 text-[#6b7186]">
                <PayIcon />
                <span className="text-xs font-semibold uppercase tracking-wide">
                  Pay
                </span>
              </div>
              <p className="mt-2 text-sm font-semibold text-[#0d0f17]">
                ₹{job.salary?.toLocaleString("en-IN")}/yr
              </p>
            </div>

            <div className="rounded-xl border border-[#e3e5ec] bg-[#f2f3f6] p-4">
              <div className="flex items-center gap-2 text-[#6b7186]">
                <BriefcaseIcon />
                <span className="text-xs font-semibold uppercase tracking-wide">
                  Job type
                </span>
              </div>
              <p className="mt-2 text-sm font-semibold text-[#0d0f17]">
                {job.jobType}
              </p>
            </div>

            <div className="rounded-xl border border-[#e3e5ec] bg-[#f2f3f6] p-4">
              <div className="flex items-center gap-2 text-[#6b7186]">
                <BriefcaseIcon />
                <span className="text-xs font-semibold uppercase tracking-wide">
                  Experience
                </span>
              </div>
              <p className="mt-2 text-sm font-semibold text-[#0d0f17]">
                {job.experienceLevel}
              </p>
            </div>
          </div>
        </div>

        <hr className="my-7 border-[#e3e5ec]" />

        {/* Description */}
        <div>
          <h2 className="text-lg font-semibold text-[#0d0f17]">
            Full job description
          </h2>
          <p className="mt-2 whitespace-pre-line leading-relaxed text-[#333a52]">
            {job.description}
          </p>
        </div>

        {/* Requirements */}
        <div className="mt-6">
          <h2 className="text-lg font-semibold text-[#0d0f17]">Requirements</h2>
          <p className="mt-2 whitespace-pre-line leading-relaxed text-[#333a52]">
            {job.requirements}
          </p>
        </div>

        {/* Skills */}
        <div className="mt-6">
          <h2 className="text-lg font-semibold text-[#0d0f17]">Skills</h2>
          <div className="mt-3 flex flex-wrap gap-2">
            {job.skills?.map((skill, index) => (
              <span
                key={index}
                className="rounded-full border border-[#e3e5ec] bg-white px-3 py-1.5 text-sm font-medium text-[#333a52]"
              >
                {skill}
              </span>
            ))}
          </div>
        </div>

        {/* Posted date */}
        <p className="mt-8 border-t border-[#e3e5ec] pt-4 text-xs text-[#6b7186]">
          Posted on {new Date(job.createdAt).toLocaleDateString("en-IN")}
        </p>
      </div>
    </div>
  );
};

export default JobDetails;
