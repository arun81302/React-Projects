import { useState } from "react";

const EMAIL_REGEX = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

const PHONE_REGEX = /^[+]?[(]?[0-9]{3}[)]?[-\s.]?[0-9]{3}[-\s.]?[0-9]{4,6}$/;

const initialFormData = {
  fullName: "",
  email: "",
  phone: "",
  address: "",
  jobTitle: "",
  company: "",
  yearsExperience: "0-1",
  skills: "",
};

const initialFormErrors = {
  fullName: null,
  email: null,
  phone: null,
  address: null,
  agreeTerms: null,
};

const tabs = [
  { number: "01", title: "Personal Info" },
  { number: "02", title: "Experience" },
  { number: "03", title: "Review & Submit" },
];

function Tabs({ activeTabIndex = 0, onPrevious, onNext, onTabClick }) {
  const [formData, setFormData] = useState(initialFormData);
  const [formErrors, setFormErrors] = useState(initialFormErrors);
  const [agreeTerms, setAgreeTerms] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);

  const isFirstTab = activeTabIndex === 0;
  const isLastTab = activeTabIndex === 2;

  
  // Field validation
  

  const validateField = (name, value) => {
    switch (name) {
      case "fullName":
        if (!value || value.trim().length <= 2) {
          return "Please enter a valid Name.";
        }
        return null;

      case "email":
        if (!value || !EMAIL_REGEX.test(value)) {
          return "Please enter a valid email address.";
        }
        return null;

      case "phone":
        if (value && !PHONE_REGEX.test(value)) {
          return "Please enter a valid phone number.";
        }
        return null;

      case "address":
        if (!value || value.trim().length <= 4) {
          return "Please provide your full address.";
        }
        return null;

      case "agreeTerms":
        if (!value) {
          return "You must agree to the terms and conditions.";
        }
        return null;

      default:
        return null;
    }
  };

  // Update input values
 
  const handleInputChange = (e) => {
    const { name, value } = e.target;

    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));

    // Revalidate a field if it already has an error.
    if (formErrors[name]) {
      setFormErrors((prevErrors) => ({
        ...prevErrors,
        [name]: validateField(name, value),
      }));
    }
  };

  
  // Checkbox handling
  

  const handleAgreeTermsChange = (e) => {
    const checked = e.target.checked;

    setAgreeTerms(checked);

    setFormErrors((prevErrors) => ({
      ...prevErrors,
      agreeTerms: checked ? null : prevErrors.agreeTerms,
    }));
  };

  
  // Validate fields on blur
  

  const handleBlur = (e) => {
    const { name, value } = e.target;

    if (["fullName", "email", "phone", "address"].includes(name)) {
      setFormErrors((prevErrors) => ({
        ...prevErrors,
        [name]: validateField(name, value),
      }));
    }
  };

  
  // Validate the Personal Info tab
  








  const validateCurrentTabForNext = () => {
    if (activeTabIndex !== 0) {
      return true;
    }

    const errors = {
      fullName: validateField("fullName", formData.fullName),
      email: validateField("email", formData.email),
      phone: validateField("phone", formData.phone),
      address: validateField("address", formData.address),
    };

    setFormErrors((prevErrors) => ({
      ...prevErrors,
      ...errors,
    }));

    return Object.values(errors).every((error) => error === null);
  };







  
  // Next button
 

  const handleNextClick = () => {
    if (!validateCurrentTabForNext()) {
      return;
    }

    onNext();
  };

  
  // Direct navigation through headers
  

  const handleTabHeaderClick = (targetIndex) => {
    if (targetIndex === activeTabIndex) {
      return;
    }

    // Validate the current tab before moving forward.
    if (targetIndex > activeTabIndex) {
      if (!validateCurrentTabForNext()) {
        return;
      }
    }

    // Backward navigation remains unrestricted.
    onTabClick(targetIndex);
  };

  
  // Validate all fields before submit


  const validateAllFieldsForSubmit = () => {
    const errors = {
      fullName: validateField("fullName", formData.fullName),
      email: validateField("email", formData.email),
      phone: validateField("phone", formData.phone),
      address: validateField("address", formData.address),
      agreeTerms: validateField("agreeTerms", agreeTerms),
    };

    setFormErrors((prevErrors) => ({
      ...prevErrors,
      ...errors,
    }));

    return Object.values(errors).every((error) => error === null);
  };


  // Submit application
  

  const handleFormSubmit = (e) => {
    e.preventDefault();

    const isValid = validateAllFieldsForSubmit();

    if (!isValid) {
      return;
    }

    console.log("Form Data Submitted:", formData);
    console.log("Agreed to terms:", agreeTerms);

    setIsSubmitted(true);
  };

  
  // Reusable form field styles
  

  const inputClass = (fieldName) =>
    `mt-2 block w-full rounded-xl border bg-white px-4 py-3 text-sm text-slate-800 outline-none transition placeholder:text-slate-400 focus:ring-4 ${
      formErrors[fieldName]
        ? "border-red-400 focus:border-red-500 focus:ring-red-100"
        : "border-slate-200 focus:border-indigo-500 focus:ring-indigo-100"
    }`;

  const labelClass = "block text-sm font-semibold text-slate-700";

  const errorClass = "mt-2 text-sm text-red-600";

  
  // Success screen


  if (isSubmitted) {
    return (
      <section className="rounded-2xl border border-emerald-200 bg-white p-6 text-center shadow-sm sm:p-10">
        <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-full bg-emerald-100 text-3xl text-emerald-600">
          ✓
        </div>

        <h2 className="mt-5 text-2xl font-bold text-slate-900 sm:text-3xl">
          Application Submitted Successfully!
        </h2>

        <p className="mt-3 text-slate-600">Thank you, {formData.fullName}.</p>

        <p className="mt-2 break-words text-sm text-slate-500">
          We will contact you via {formData.email} if you are shortlisted.
        </p>
      </section>
    );
  }

  
  // Main form
  

  return (
    <section className="overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-xl shadow-slate-200/60">
      {/* Tab navigation */}
      <div className="border-b border-slate-200 bg-slate-50 p-3 sm:p-5">
        <div className="grid grid-cols-3 gap-2 sm:gap-4">
          {tabs.map((tab, index) => {
            const isActive = activeTabIndex === index;
            const isComplete = activeTabIndex > index;

            return (
              <button
                key={tab.number}
                type="button"
                onClick={() => handleTabHeaderClick(index)}
                aria-current={isActive ? "step" : undefined}
                className={`flex min-w-0 items-center gap-2 rounded-xl px-2 py-3 text-left transition sm:gap-3 sm:px-4 ${
                  isActive
                    ? "bg-indigo-600 text-white shadow-md shadow-indigo-200"
                    : "bg-white text-slate-600 hover:bg-indigo-50"
                }`}
              >
                <span
                  className={`flex h-8 w-8 shrink-0 items-center justify-center rounded-full text-xs font-bold sm:h-9 sm:w-9 sm:text-sm ${
                    isActive
                      ? "bg-white text-indigo-600"
                      : isComplete
                        ? "bg-emerald-100 text-emerald-700"
                        : "bg-slate-100 text-slate-600"
                  }`}
                >
                  {isComplete ? "✓" : tab.number}
                </span>

                <span className="min-w-0">
                  <span
                    className={`hidden text-[10px] font-semibold uppercase tracking-wider sm:block ${
                      isActive ? "text-indigo-100" : "text-slate-400"
                    }`}
                  >
                    Step {index + 1}
                  </span>

                  <span className="block text-[10px] font-semibold leading-tight sm:mt-1 sm:text-sm">
                    {tab.title}
                  </span>
                </span>
              </button>
            );
          })}
        </div>
      </div>

      {/* Form content */}
      <div className="p-5 sm:p-8 lg:p-10">
        {/* Personal Information */}
        {activeTabIndex === 0 && (
          <div>
            <div className="mb-8">
              <p className="text-sm font-semibold text-indigo-600">
                STEP 1 OF 3
              </p>

              <h2 className="mt-2 text-2xl font-bold tracking-tight text-slate-900 sm:text-3xl">
                Personal Information
              </h2>

              <p className="mt-2 text-sm leading-6 text-slate-500">
                Let's start with your basic details so we can get in touch with
                you.
              </p>

              <p className="mt-3 text-xs text-slate-500">
                Fields marked with <span className="text-red-500">*</span> are
                required.
              </p>
            </div>

            <div className="grid grid-cols-1 gap-x-6 gap-y-6 sm:grid-cols-2">
              {/* Full name */}
              <div>
                <label htmlFor="fullName" className={labelClass}>
                  Full Name <span className="text-red-500">*</span>
                </label>

                <input
                  type="text"
                  id="fullName"
                  name="fullName"
                  placeholder="Enter your full name"
                  autoComplete="name"
                  value={formData.fullName}
                  onChange={handleInputChange}
                  onBlur={handleBlur}
                  aria-invalid={Boolean(formErrors.fullName)}
                  aria-describedby={
                    formErrors.fullName ? "fullName-error" : undefined
                  }
                  className={inputClass("fullName")}
                />

                {formErrors.fullName && (
                  <p id="fullName-error" className={errorClass}>
                    {formErrors.fullName}
                  </p>
                )}
              </div>

              {/* Email */}
              <div>
                <label htmlFor="email" className={labelClass}>
                  Email Address <span className="text-red-500">*</span>
                </label>

                <input
                  type="email"
                  id="email"
                  name="email"
                  placeholder="you@example.com"
                  autoComplete="email"
                  value={formData.email}
                  onChange={handleInputChange}
                  onBlur={handleBlur}
                  aria-invalid={Boolean(formErrors.email)}
                  aria-describedby={
                    formErrors.email ? "email-error" : undefined
                  }
                  className={inputClass("email")}
                />

                {formErrors.email && (
                  <p id="email-error" className={errorClass}>
                    {formErrors.email}
                  </p>
                )}
              </div>

              {/* Phone */}
              <div>
                <label htmlFor="phone" className={labelClass}>
                  Phone Number{" "}
                  <span className="font-normal text-slate-400">(Optional)</span>
                </label>

                <input
                  type="tel"
                  id="phone"
                  name="phone"
                  placeholder="+91 9876543210"
                  autoComplete="tel"
                  value={formData.phone}
                  onChange={handleInputChange}
                  onBlur={handleBlur}
                  aria-invalid={Boolean(formErrors.phone)}
                  aria-describedby={
                    formErrors.phone ? "phone-error" : undefined
                  }
                  className={inputClass("phone")}
                />

                {formErrors.phone && (
                  <p id="phone-error" className={errorClass}>
                    {formErrors.phone}
                  </p>
                )}
              </div>

              {/* Address */}
              <div className="sm:col-span-2">
                <label htmlFor="address" className={labelClass}>
                  Full Address <span className="text-red-500">*</span>
                </label>

                <textarea
                  id="address"
                  name="address"
                  rows={3}
                  placeholder="Enter your complete address"
                  autoComplete="street-address"
                  value={formData.address}
                  onChange={handleInputChange}
                  onBlur={handleBlur}
                  aria-invalid={Boolean(formErrors.address)}
                  aria-describedby={
                    formErrors.address ? "address-error" : undefined
                  }
                  className={`${inputClass("address")} resize-y`}
                />

                {formErrors.address && (
                  <p id="address-error" className={errorClass}>
                    {formErrors.address}
                  </p>
                )}
              </div>
            </div>
          </div>
        )}

        {/* Experience and Skills */}
        {activeTabIndex === 1 && (
          <div>
            <div className="mb-8">
              <p className="text-sm font-semibold text-indigo-600">
                STEP 2 OF 3
              </p>

              <h2 className="mt-2 text-2xl font-bold tracking-tight text-slate-900 sm:text-3xl">
                Work Experience & Skills
              </h2>

              <p className="mt-2 text-sm leading-6 text-slate-500">
                Share your professional background and the skills you would
                bring to the role. All fields are optional.
              </p>
            </div>

            <div className="grid grid-cols-1 gap-x-6 gap-y-6 sm:grid-cols-2">
              {/* Job title */}
              <div>
                <label htmlFor="jobTitle" className={labelClass}>
                  Most Recent Job Title
                </label>

                <input
                  type="text"
                  id="jobTitle"
                  name="jobTitle"
                  placeholder="e.g. Frontend Developer"
                  value={formData.jobTitle}
                  onChange={handleInputChange}
                  className={inputClass("jobTitle")}
                />
              </div>

              {/* Company */}
              <div>
                <label htmlFor="company" className={labelClass}>
                  Company Name
                </label>

                <input
                  type="text"
                  id="company"
                  name="company"
                  placeholder="Enter company name"
                  value={formData.company}
                  onChange={handleInputChange}
                  className={inputClass("company")}
                />
              </div>

              {/* Years of experience */}
              <div className="sm:col-span-2">
                <label htmlFor="yearsExperience" className={labelClass}>
                  Years of Relevant Experience
                </label>

                <select
                  id="yearsExperience"
                  name="yearsExperience"
                  value={formData.yearsExperience}
                  onChange={handleInputChange}
                  className={inputClass("yearsExperience")}
                >
                  <option value="0-1">0 - 1 Year</option>
                  <option value="1-3">1 - 3 Years</option>
                  <option value="3-5">3 - 5 Years</option>
                  <option value="5-10">5 - 10 Years</option>
                  <option value="10+">10+ Years</option>
                </select>
              </div>

              {/* Skills */}
              <div className="sm:col-span-2">
                <label htmlFor="skills" className={labelClass}>
                  Key Skills
                </label>

                <textarea
                  id="skills"
                  name="skills"
                  rows={4}
                  placeholder="e.g. React, JavaScript, Node.js, SQL"
                  value={formData.skills}
                  onChange={handleInputChange}
                  className={`${inputClass("skills")} resize-y`}
                />

                <p className="mt-2 text-xs text-slate-400">
                  Separate your skills with commas.
                </p>
              </div>
            </div>
          </div>
        )}

        {/* Review and Submit */}
        {activeTabIndex === 2 && (
          <div>
            <div className="mb-8">
              <p className="text-sm font-semibold text-indigo-600">
                STEP 3 OF 3
              </p>

              <h2 className="mt-2 text-2xl font-bold tracking-tight text-slate-900 sm:text-3xl">
                Review Your Application
              </h2>

              <p className="mt-2 text-sm leading-6 text-slate-500">
                Review the information below and confirm that it is accurate
                before submitting.
              </p>
            </div>

            {/* Personal information summary */}
            <div className="mb-6 rounded-2xl border border-slate-200 bg-slate-50 p-5 sm:p-6">
              <div className="mb-5 flex items-center justify-between gap-3">
                <h3 className="text-base font-bold text-slate-900 sm:text-lg">
                  Personal Information
                </h3>

                <button
                  type="button"
                  onClick={() => handleTabHeaderClick(0)}
                  className="shrink-0 text-sm font-semibold text-indigo-600 hover:text-indigo-800"
                >
                  Edit
                </button>
              </div>

              <div className="grid grid-cols-1 gap-5 sm:grid-cols-2">
                <ReviewItem label="Full Name" value={formData.fullName} />

                <ReviewItem label="Email Address" value={formData.email} />

                <ReviewItem label="Phone Number" value={formData.phone} />

                <ReviewItem label="Address" value={formData.address} />
              </div>
            </div>

            {/* Experience summary */}
            <div className="mb-6 rounded-2xl border border-slate-200 bg-slate-50 p-5 sm:p-6">
              <div className="mb-5 flex items-center justify-between gap-3">
                <h3 className="text-base font-bold text-slate-900 sm:text-lg">
                  Experience & Skills
                </h3>

                <button
                  type="button"
                  onClick={() => handleTabHeaderClick(1)}
                  className="shrink-0 text-sm font-semibold text-indigo-600 hover:text-indigo-800"
                >
                  Edit
                </button>
              </div>

              <div className="grid grid-cols-1 gap-5 sm:grid-cols-2">
                <ReviewItem label="Job Title" value={formData.jobTitle} />

                <ReviewItem label="Company" value={formData.company} />

                <ReviewItem
                  label="Years of Experience"
                  value={formData.yearsExperience}
                />

                <ReviewItem label="Key Skills" value={formData.skills} />
              </div>
            </div>

            {/* Terms and conditions */}
            <div className="rounded-2xl border border-indigo-100 bg-indigo-50/60 p-5 sm:p-6">
              <h3 className="font-bold text-slate-900">
                Confirmation <span className="text-red-500">*</span>
              </h3>

              <label
                htmlFor="agreeTerms"
                className="mt-4 flex cursor-pointer items-start gap-3"
              >
                <input
                  type="checkbox"
                  id="agreeTerms"
                  name="agreeTerms"
                  checked={agreeTerms}
                  onChange={handleAgreeTermsChange}
                  className="mt-1 h-4 w-4 shrink-0 cursor-pointer accent-indigo-600"
                  aria-invalid={Boolean(formErrors.agreeTerms)}
                  aria-describedby={
                    formErrors.agreeTerms ? "terms-error" : undefined
                  }
                />

                <span className="text-sm leading-6 text-slate-600">
                  I confirm that the information provided is accurate and I
                  agree to the company's terms and conditions.
                </span>
              </label>

              {formErrors.agreeTerms && (
                <p id="terms-error" className={errorClass}>
                  {formErrors.agreeTerms}
                </p>
              )}
            </div>
          </div>
        )}
      </div>

      {/* Bottom navigation */}
      <div className="flex flex-col-reverse gap-3 border-t border-slate-200 bg-slate-50 px-5 py-5 sm:flex-row sm:items-center sm:justify-between sm:px-8">
        <button
          type="button"
          onClick={onPrevious}
          disabled={isFirstTab}
          className="w-full rounded-xl border border-slate-300 bg-white px-5 py-3 text-sm font-semibold text-slate-700 transition hover:bg-slate-100 disabled:cursor-not-allowed disabled:opacity-40 sm:w-auto"
        >
          ← Previous
        </button>

        <p className="hidden text-xs text-slate-400 sm:block">
          Step {activeTabIndex + 1} of 3
        </p>

        {isLastTab ? (
          <button
            type="button"
            onClick={handleFormSubmit}
            className="w-full rounded-xl bg-emerald-600 px-6 py-3 text-sm font-semibold text-white shadow-sm transition hover:bg-emerald-700 focus:outline-none focus:ring-4 focus:ring-emerald-100 sm:w-auto"
          >
            Submit Application →
          </button>
        ) : (
          <button
            type="button"
            onClick={handleNextClick}
            className="w-full rounded-xl bg-indigo-600 px-6 py-3 text-sm font-semibold text-white shadow-sm transition hover:bg-indigo-700 focus:outline-none focus:ring-4 focus:ring-indigo-100 sm:w-auto"
          >
            Continue →
          </button>
        )}
      </div>
    </section>
  );
}

// Reusable review item
function ReviewItem({ label, value }) {
  return (
    <div className="min-w-0">
      <p className="text-xs font-semibold uppercase tracking-wider text-slate-400">
        {label}
      </p>

      <p className="mt-1 break-words text-sm font-medium text-slate-800">
        {value || <span className="italic text-slate-400">Not Provided</span>}
      </p>
    </div>
  );
}

export default Tabs;
