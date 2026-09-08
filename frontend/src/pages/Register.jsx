import React from "react";

const Register = () => {
  return (
    <div className="min-h-screen flex flex-col lg:flex-row font-sans bg-[#f2f3f6] text-[#0d0f17] antialiased">
      {/* LEFT / BRAND PANEL */}
      <div className="relative lg:w-[44%] bg-[#0d0f17] text-[#f2f3f6] overflow-hidden">
        <svg
          className="pointer-events-none absolute -right-10 bottom-0 w-[130%] max-w-none opacity-90"
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
        <div className="absolute inset-0 bg-gradient-to-b from-[#0d0f17]/0 via-[#0d0f17]/10 to-[#0d0f17]"></div>

        <div className="relative z-10 flex flex-col justify-between h-full px-8 py-10 sm:px-14 sm:py-14 lg:min-h-screen">
          <a href="#" className="inline-flex items-center gap-3 w-fit">
            <span className="relative flex h-10 w-10 items-center justify-center rounded-xl bg-[#232939] ring-1 ring-white/10">
              <span className="h-5 w-5 rounded-full border-2 border-white/70"></span>
              <span className="absolute h-1.5 w-1.5 rounded-full bg-[#C8FF4D]"></span>
            </span>
            <span className="text-xl font-semibold tracking-tight">
              HirePoint
            </span>
          </a>

          <div className="mt-16 lg:mt-0 max-w-md mb-16 lg:mb-0">
            <h1 className="text-[2.1rem] leading-[1.15] font-semibold sm:text-4xl">
              Where careers meet their next move.
            </h1>
            <p className="mt-5 text-[15px] leading-relaxed text-[#c2c6d4]">
              HirePoint connects candidates and employers through one focused
              hiring loop — apply, screen, and place, without the noise of a
              dozen other tools.
            </p>
          </div>

          <div></div>
        </div>
      </div>

      {/* RIGHT / FORM PANEL */}
      <div className="flex-1 flex items-center justify-center px-6 py-12 sm:px-10">
        <div className="w-full max-w-[420px]">
          <div className="mb-9">
            <h2 className="text-[1.65rem] font-semibold text-[#0d0f17]">
              Create your account
            </h2>
            <p className="mt-2 text-sm text-[#6b7186]">
              Already on HirePoint?{" "}
              <a
                href="#"
                className="font-medium text-[#0d0f17] underline underline-offset-4 decoration-[#c2c6d4] hover:decoration-[#0d0f17]"
              >
                Sign in
              </a>
            </p>
          </div>

          <form className="space-y-5">
            <div>
              <label
                htmlFor="fullName"
                className="mb-1.5 block text-sm font-medium text-[#333a52]"
              >
                Full name
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
                    <path d="M20 21a8 8 0 0 0-16 0" />
                    <circle cx="12" cy="7" r="4" />
                  </svg>
                </span>
                <input
                  id="fullName"
                  type="text"
                  placeholder="Jordan Blake"
                  className="w-full rounded-xl border border-[#e3e5ec] bg-white py-3 pl-11 pr-4 text-[15px] text-[#0d0f17] placeholder:text-[#6b7186]/70 outline-none transition focus:border-[#232939] focus:ring-4 focus:ring-[#0d0f17]/5"
                />
              </div>
            </div>

            <div>
              <label
                htmlFor="email"
                className="mb-1.5 block text-sm font-medium text-[#333a52]"
              >
                Email address
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
                    <rect x="3" y="5" width="18" height="14" rx="2" />
                    <path d="m3 7 9 6 9-6" />
                  </svg>
                </span>
                <input
                  id="email"
                  type="email"
                  placeholder="jordan@company.com"
                  className="w-full rounded-xl border border-[#e3e5ec] bg-white py-3 pl-11 pr-4 text-[15px] text-[#0d0f17] placeholder:text-[#6b7186]/70 outline-none transition focus:border-[#232939] focus:ring-4 focus:ring-[#0d0f17]/5"
                />
              </div>
            </div>

            <div>
              <label
                htmlFor="password"
                className="mb-1.5 block text-sm font-medium text-[#333a52]"
              >
                Password
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
                    <rect x="4" y="10" width="16" height="10" rx="2" />
                    <path d="M8 10V7a4 4 0 0 1 8 0v3" />
                  </svg>
                </span>
                <input
                  id="password"
                  type="password"
                  placeholder="At least 8 characters"
                  className="w-full rounded-xl border border-[#e3e5ec] bg-white py-3 pl-11 pr-11 text-[15px] text-[#0d0f17] placeholder:text-[#6b7186]/70 outline-none transition focus:border-[#232939] focus:ring-4 focus:ring-[#0d0f17]/5"
                />
                <span className="absolute inset-y-0 right-0 flex items-center pr-3.5 text-[#6b7186]">
                  <svg
                    className="h-[18px] w-[18px]"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="1.8"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  >
                    <path d="M1 12s4-7 11-7 11 7 11 7-4 7-11 7-11-7-11-7Z" />
                    <circle cx="12" cy="12" r="3" />
                  </svg>
                </span>
              </div>
            </div>

            <div>
              <label className="mb-1.5 block text-sm font-medium text-[#333a52]">
                I'm registering as
              </label>
              <div className="grid grid-cols-2 gap-2 rounded-xl bg-[#f2f3f6] p-1 ring-1 ring-[#e3e5ec]">
                <button
                  type="button"
                  className="rounded-lg bg-[#0d0f17] py-2.5 text-sm font-medium text-white shadow-sm"
                >
                  Candidate
                </button>
                <button
                  type="button"
                  className="rounded-lg py-2.5 text-sm font-medium text-[#333a52] hover:bg-white/60"
                >
                  Employer
                </button>
              </div>
            </div>

            <button
              type="submit"
              className="mt-2 w-full rounded-xl bg-[#0d0f17] py-3.5 text-[15px] font-medium text-white transition hover:bg-[#232939] focus:outline-none focus:ring-4 focus:ring-[#0d0f17]/15"
            >
              Register
            </button>

            <p className="pt-1 text-center text-xs leading-relaxed text-[#6b7186]">
              By creating an account, you agree to HirePoint's{" "}
              <a
                href="#"
                className="underline underline-offset-2 hover:text-[#333a52]"
              >
                Terms of Service
              </a>{" "}
              and{" "}
              <a
                href="#"
                className="underline underline-offset-2 hover:text-[#333a52]"
              >
                Privacy Policy
              </a>
              .
            </p>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Register;
