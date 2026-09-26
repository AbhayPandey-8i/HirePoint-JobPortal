import React, { useEffect, useState } from "react";
import { toast } from "sonner";
import api from "../api/axios";

/* ---------- tiny inline icons (no external icon lib needed) ---------- */
const Icon = ({ d, className = "h-4 w-4" }) => (
  <svg
    className={className}
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="1.8"
    strokeLinecap="round"
    strokeLinejoin="round"
  >
    <path d={d} />
  </svg>
);

const ICONS = {
  briefcase:
    "M3 7h18M3 7v11a1 1 0 0 0 1 1h16a1 1 0 0 0 1-1V7M8 7V5a1 1 0 0 1 1-1h6a1 1 0 0 1 1 1v2",
  doc: "M7 3h7l5 5v13a1 1 0 0 1-1 1H7a1 1 0 0 1-1-1V4a1 1 0 0 1 1-1zM14 3v5h5M9 13h6M9 17h6",
  tag: "M20 12 12.6 19.4a2 2 0 0 1-2.8 0l-6.2-6.2a2 2 0 0 1 0-2.8L11 3h6a3 3 0 0 1 3 3v6zM15.5 8.5h.01",
  compass:
    "M12 22a10 10 0 1 0 0-20 10 10 0 0 0 0 20zM15.5 8.5l-2 5-5 2 2-5 5-2z",
  close: "M18 6 6 18M6 6l12 12",
  chevron: "m6 9 6 6 6-6",
  sparkle:
    "M12 3v3M12 18v3M3 12h3M18 12h3M6.3 6.3l2.1 2.1M15.6 15.6l2.1 2.1M6.3 17.7l2.1-2.1M15.6 8.4l2.1-2.1",
  pencil: "M12 20h9M16.5 3.5a2.1 2.1 0 0 1 3 3L7 19l-4 1 1-4L16.5 3.5z",
};

/* ---------- reusable field shell ---------- */
const Field = ({ label, children }) => (
  <div>
    <label className="mb-1.5 block text-sm font-medium text-[#333a52]">
      {label}
    </label>
    {children}
  </div>
);

const inputCls =
  "w-full rounded-xl border border-[#e3e5ec] bg-white px-4 py-3 text-sm text-[#0d0f17] outline-none transition placeholder:text-[#9aa0b4] focus:border-[#0d0f17] focus:ring-4 focus:ring-[#c8ff4d]/40";

const SectionCard = ({ icon, title, children }) => (
  <div className="rounded-2xl border border-[#e3e5ec] bg-white p-6 shadow-[0_1px_2px_rgba(13,15,23,0.04)]">
    <div className="mb-5 flex items-center gap-2.5">
      <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-lg bg-[#0d0f17] text-[#c8ff4d]">
        <Icon d={ICONS[icon]} className="h-4 w-4" />
      </span>
      <h3 className="font-semibold text-[#0d0f17]">{title}</h3>
    </div>
    {children}
  </div>
);

const EditJobOverlay = ({ job, onClose, onUpdated }) => {
  const [jobTitle, setJobTitle] = useState("");
  const [companyName, setCompanyName] = useState("");
  const [description, setDescription] = useState("");
  const [requirements, setRequirements] = useState("");
  const [salary, setSalary] = useState("");
  const [location, setLocation] = useState("");
  const [jobType, setJobType] = useState("");
  const [experienceLevel, setExperienceLevel] = useState("");
  const [skills, setSkills] = useState([]);
  const [skillInput, setSkillInput] = useState("");
  const [loading, setLoading] = useState(false);

  // Fill form with selected job
  useEffect(() => {
    if (!job) return;

    setJobTitle(job.title || "");
    setCompanyName(job.companyName || "");
    setDescription(job.description || "");
    setRequirements(job.requirements || "");
    setSalary(job.salary || "");
    setLocation(job.location || "");
    setJobType(job.jobType || "");
    setExperienceLevel(job.experienceLevel || "");
    setSkills(job.skills || []);
  }, [job]);

  const addSkill = () => {
    const trimmed = skillInput.trim();

    if (trimmed && !skills.includes(trimmed)) {
      setSkills((prev) => [...prev, trimmed]);
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
      setSkills((prev) => prev.slice(0, -1));
    }
  };

  const removeSkill = (indexToRemove) => {
    setSkills((prev) => prev.filter((_, index) => index !== indexToRemove));
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
      setLoading(true);

      const response = await api.put(`/job/update/${job._id}`, jobData);

      if (response.data.success) {
        toast.success("Job updated successfully");

        onUpdated(response.data.job);
      }
    } catch (error) {
      console.log("Update job error:", error);

      toast.error(error.response?.data?.message || "Failed to update job");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div
      className="edt-overlay fixed inset-0 z-[100] flex items-center justify-center bg-[#0d0f17]/60 px-4 py-6 backdrop-blur-sm"
      onMouseDown={(e) => {
        if (e.target === e.currentTarget) {
          onClose();
        }
      }}
    >
      <style>{`
        @keyframes edtFadeIn { from { opacity: 0 } to { opacity: 1 } }
        @keyframes edtRiseIn {
          from { opacity: 0; transform: translateY(14px) scale(0.98); }
          to { opacity: 1; transform: translateY(0) scale(1); }
        }
        .edt-overlay { animation: edtFadeIn 0.18s ease-out; }
        .edt-panel { animation: edtRiseIn 0.22s cubic-bezier(0.16, 1, 0.3, 1); }
        .edt-scroll::-webkit-scrollbar { width: 8px; }
        .edt-scroll::-webkit-scrollbar-track { background: transparent; }
        .edt-scroll::-webkit-scrollbar-thumb { background: #e3e5ec; border-radius: 999px; }
        .edt-scroll::-webkit-scrollbar-thumb:hover { background: #cfd2de; }
        @media (prefers-reduced-motion: reduce) {
          .edt-overlay, .edt-panel { animation: none; }
        }
      `}</style>

      <div
        className="edt-panel relative flex max-h-[90vh] w-full max-w-3xl flex-col overflow-hidden rounded-2xl border border-[#e3e5ec] bg-[#f2f3f6] shadow-2xl"
        onMouseDown={(e) => e.stopPropagation()}
      >
        {/* accent hairline */}
        <div className="h-1 w-full shrink-0 bg-gradient-to-r from-[#c8ff4d] via-[#c8ff4d] to-[#0d0f17]/10" />

        {/* HEADER */}
        <div className="flex shrink-0 items-center justify-between gap-4 border-b border-[#e3e5ec] bg-white px-6 py-5">
          <div className="flex items-center gap-3.5">
            <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-[#0d0f17] text-[#c8ff4d]">
              <Icon d={ICONS.pencil} className="h-5 w-5" />
            </span>

            <div className="min-w-0">
              <h2 className="text-lg font-semibold leading-tight text-[#0d0f17]">
                Edit job posting
              </h2>

              <p className="mt-0.5 truncate text-sm text-[#6b7186]">
                {jobTitle ? (
                  <>
                    Updating{" "}
                    <span className="font-medium text-[#333a52]">
                      {jobTitle}
                    </span>
                    {companyName ? ` at ${companyName}` : ""}
                  </>
                ) : (
                  "Update the details of your job posting."
                )}
              </p>
            </div>
          </div>

          <button
            type="button"
            onClick={onClose}
            aria-label="Close"
            className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg text-[#6b7186] transition hover:bg-[#f2f3f6] hover:text-[#0d0f17]"
          >
            <Icon d={ICONS.close} className="h-5 w-5" />
          </button>
        </div>

        {/* FORM */}
        <form
          onSubmit={handleSubmit}
          className="edt-scroll min-h-0 flex-1 overflow-y-auto"
        >
          <div className="space-y-5 p-6">
            {/* ROLE BASICS */}
            <SectionCard icon="briefcase" title="Role basics">
              <div className="grid gap-5 sm:grid-cols-2">
                <Field label="Job title">
                  <input
                    type="text"
                    value={jobTitle}
                    onChange={(e) => setJobTitle(e.target.value)}
                    className={inputCls}
                    placeholder="e.g. Senior Frontend Engineer"
                    required
                  />
                </Field>

                <Field label="Company name">
                  <input
                    type="text"
                    value={companyName}
                    onChange={(e) => setCompanyName(e.target.value)}
                    className={inputCls}
                    placeholder="e.g. Fernway Inc."
                    required
                  />
                </Field>
              </div>
            </SectionCard>

            {/* DESCRIPTION */}
            <SectionCard icon="doc" title="Description & requirements">
              <div className="space-y-5">
                <Field label="Job description">
                  <textarea
                    rows="5"
                    value={description}
                    onChange={(e) => setDescription(e.target.value)}
                    className={`${inputCls} resize-none leading-relaxed`}
                    placeholder="Describe the role..."
                    required
                  />
                  <p className="mt-1.5 text-right text-xs text-[#9aa0b4]">
                    {description.length} characters
                  </p>
                </Field>

                <Field label="Requirements">
                  <textarea
                    rows="4"
                    value={requirements}
                    onChange={(e) => setRequirements(e.target.value)}
                    className={`${inputCls} resize-none leading-relaxed`}
                    placeholder="List qualifications and requirements..."
                    required
                  />
                </Field>
              </div>
            </SectionCard>

            {/* COMPENSATION */}
            <SectionCard icon="compass" title="Compensation & logistics">
              <div className="grid gap-5 sm:grid-cols-2">
                <Field label="Salary">
                  <input
                    type="text"
                    value={salary}
                    onChange={(e) => setSalary(e.target.value)}
                    className={inputCls}
                    placeholder="e.g. 5 LPA"
                    required
                  />
                </Field>

                <Field label="Location">
                  <input
                    type="text"
                    value={location}
                    onChange={(e) => setLocation(e.target.value)}
                    className={inputCls}
                    placeholder="e.g. Noida, India"
                    required
                  />
                </Field>

                <Field label="Job type">
                  <div className="relative">
                    <select
                      value={jobType}
                      onChange={(e) => setJobType(e.target.value)}
                      className={`${inputCls} appearance-none pr-10`}
                      required
                    >
                      <option value="">Select job type</option>
                      <option value="Full-time">Full-time</option>
                      <option value="Part-time">Part-time</option>
                      <option value="Internship">Internship</option>
                    </select>
                    <Icon
                      d={ICONS.chevron}
                      className="pointer-events-none absolute right-3.5 top-1/2 h-4 w-4 -translate-y-1/2 text-[#9aa0b4]"
                    />
                  </div>
                </Field>

                <Field label="Experience level">
                  <div className="relative">
                    <select
                      value={experienceLevel}
                      onChange={(e) => setExperienceLevel(e.target.value)}
                      className={`${inputCls} appearance-none pr-10`}
                      required
                    >
                      <option value="">Select experience level</option>
                      <option value="Fresher">Fresher</option>
                      <option value="Junior">Junior</option>
                      <option value="Mid-level">Mid-level</option>
                      <option value="Senior">Senior</option>
                    </select>
                    <Icon
                      d={ICONS.chevron}
                      className="pointer-events-none absolute right-3.5 top-1/2 h-4 w-4 -translate-y-1/2 text-[#9aa0b4]"
                    />
                  </div>
                </Field>
              </div>
            </SectionCard>

            {/* SKILLS */}
            <SectionCard icon="tag" title="Skills">
              <div
                onClick={() => document.getElementById("edit-skills")?.focus()}
                className="flex flex-wrap items-center gap-2 rounded-xl border border-[#e3e5ec] bg-white px-3 py-2.5 transition focus-within:border-[#0d0f17] focus-within:ring-4 focus-within:ring-[#c8ff4d]/40"
              >
                {skills.map((skill, index) => (
                  <span
                    key={`${skill}-${index}`}
                    className="inline-flex items-center gap-1.5 rounded-lg bg-[#0d0f17] py-1.5 pl-3 pr-2 text-sm font-medium text-[#c8ff4d]"
                  >
                    {skill}

                    <button
                      type="button"
                      onClick={() => removeSkill(index)}
                      aria-label={`Remove ${skill}`}
                      className="rounded p-0.5 text-[#c8ff4d]/70 transition hover:bg-[#c8ff4d]/15 hover:text-[#c8ff4d]"
                    >
                      <Icon d={ICONS.close} className="h-3.5 w-3.5" />
                    </button>
                  </span>
                ))}

                <input
                  id="edit-skills"
                  type="text"
                  value={skillInput}
                  onChange={(e) => setSkillInput(e.target.value)}
                  onKeyDown={handleSkillKeyDown}
                  onBlur={addSkill}
                  placeholder={
                    skills.length
                      ? "Add another..."
                      : "e.g. React, Node.js, MongoDB"
                  }
                  className="min-w-[140px] flex-1 border-none bg-transparent py-1.5 text-sm text-[#0d0f17] outline-none placeholder:text-[#9aa0b4]"
                />
              </div>

              <p className="mt-1.5 flex items-center gap-1 text-xs text-[#6b7186]">
                <Icon d={ICONS.sparkle} className="h-3 w-3" />
                Press Enter or comma to add a skill.
              </p>
            </SectionCard>
          </div>

          {/* FOOTER */}
          <div className="sticky bottom-0 flex shrink-0 items-center justify-between gap-3 border-t border-[#e3e5ec] bg-white px-6 py-4">
            <span className="hidden text-xs text-[#9aa0b4] sm:block">
              {skills.length} skill{skills.length === 1 ? "" : "s"} added
            </span>

            <div className="flex w-full justify-end gap-3 sm:w-auto">
              <button
                type="button"
                onClick={onClose}
                disabled={loading}
                className="rounded-xl border border-[#e3e5ec] bg-white px-5 py-2.5 text-sm font-medium text-[#333a52] transition hover:bg-[#f2f3f6] disabled:cursor-not-allowed disabled:opacity-50"
              >
                Cancel
              </button>

              <button
                type="submit"
                disabled={loading}
                className="inline-flex items-center gap-2 rounded-xl bg-[#c8ff4d] px-5 py-2.5 text-sm font-semibold text-[#0d0f17] shadow-sm transition hover:bg-[#b8ef3d] disabled:cursor-not-allowed disabled:opacity-60"
              >
                {loading && (
                  <span className="h-3.5 w-3.5 animate-spin rounded-full border-2 border-[#0d0f17]/30 border-t-[#0d0f17]" />
                )}
                {loading ? "Saving..." : "Save changes"}
              </button>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
};

export default EditJobOverlay;
