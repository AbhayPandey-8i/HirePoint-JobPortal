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

const JobCard = ({ job, isSelected }) => {
  return (
    <div>
      <div
        className={`group relative cursor-pointer overflow-hidden rounded-2xl border p-5 transition-all duration-200 ${
          isSelected
            ? "border-[#0d0f17] bg-[#0d0f17] text-[#f2f3f6] shadow-lg shadow-[#0d0f17]/15"
            : "border-[#e3e5ec] bg-white text-[#0d0f17] hover:-translate-y-0.5 hover:border-[#c2c6d4] hover:shadow-md"
        }`}
      >
        {isSelected && (
          <span className="absolute right-0 top-0 h-16 w-16 rounded-bl-full bg-[#C8FF4D]/10" />
        )}

        {/* Top row: badge + save */}

        <div className="flex items-start justify-between">
          <span
            className={`inline-flex items-center rounded-full px-2.5 py-1 text-xs font-semibold ${
              isSelected
                ? "bg-[#C8FF4D] text-[#0d0f17]"
                : "bg-[#0d0f17]/[0.06] text-[#0d0f17]"
            }`}
          >
            Easily apply
          </span>

          <button
            onClick={(e) => e.stopPropagation()}
            className={`rounded-lg p-1.5 transition ${
              isSelected
                ? "text-[#c2c6d4] hover:bg-white/10 hover:text-[#C8FF4D]"
                : "text-[#6b7186] hover:bg-[#f2f3f6] hover:text-[#0d0f17]"
            }`}
            aria-label="Save job"
          >
            <BookmarkIcon />
          </button>
        </div>

        {/* Title */}
        <h2 className="mt-3 text-lg hover:underline font-semibold leading-snug">
          {job.title}
        </h2>

        {/* Company */}
        <p
          className={`mt-1 text-sm ${isSelected ? "text-[#c2c6d4]" : "text-[#333a52]"}`}
        >
          {job.companyName}
        </p>

        {/* Location */}
        <p
          className={`mt-1.5 flex items-center gap-1 text-sm ${isSelected ? "text-[#8a90a3]" : "text-[#6b7186]"}`}
        >
          <span>📍</span> {job.location}
        </p>

        {/* Bottom row: salary + dismiss */}
        <div className="mt-4 flex items-center justify-between">
          <span
            className={`rounded-lg px-2.5 py-1.5 text-xs font-medium ${
              isSelected
                ? "bg-white/10 text-[#f2f3f6]"
                : "bg-[#f2f3f6] text-[#333a52]"
            }`}
          >
            ₹{job.salary}
          </span>

          <button
            onClick={(e) => e.stopPropagation()}
            className={`rounded-lg p-1.5 transition ${
              isSelected
                ? "text-[#c2c6d4] hover:bg-white/10 hover:text-red-400"
                : "text-[#6b7186] hover:bg-red-50 hover:text-red-500"
            }`}
            aria-label="Not interested"
          >
            <ThumbsDownIcon />
          </button>
        </div>
      </div>
    </div>
  );
};

export default JobCard;
