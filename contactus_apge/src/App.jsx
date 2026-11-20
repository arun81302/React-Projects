import React, { useState } from "react";
import Nav from "./Nav";
import { MdOutlineMessage } from "react-icons/md";
import { IoCallOutline } from "react-icons/io5";
import { IoClose } from "react-icons/io5";

const App = () => {
  const [pop, setPop] = useState(false);
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [text, setText] = useState("");

  function handleSubmit(e) {
    e.preventDefault();
    setPop(true);
  }

  function clearSubmit() {
    setPop(false);
    setName("");
    setEmail("");
    setText("");
  }

  return (
    <div className="min-h-screen bg-slate-50">
      <Nav />

      
      {pop && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 px-4 backdrop-blur-sm">
          <div className="relative w-full max-w-md rounded-2xl bg-white p-6 shadow-2xl sm:p-8">

            <button
              onClick={() => setPop(false)}
              className="absolute right-4 top-4 text-2xl text-gray-500 hover:text-black"
            >
              <IoClose />
            </button>

            <h1 className="mb-6 text-center text-2xl font-bold">
              Your Submitted Data
            </h1>

            <div className="space-y-4">
              <div>
                <p className="text-sm font-semibold text-gray-500">
                  Your Name
                </p>
                <p className="break-words font-medium">{name}</p>
              </div>

              <div>
                <p className="text-sm font-semibold text-gray-500">
                  Your Email
                </p>
                <p className="break-words font-medium">{email}</p>
              </div>

              <div>
                <p className="text-sm font-semibold text-gray-500">
                  Your Message
                </p>
                <p className="break-words font-medium">{text}</p>
              </div>
            </div>

            <button
              onClick={clearSubmit}
              className="mt-7 w-full rounded-lg bg-black py-3 font-semibold text-white transition hover:bg-gray-800"
            >
              Close & Clear
            </button>
          </div>
        </div>
      )}

      
      <main className="mx-auto w-[92%] max-w-6xl py-10 sm:py-14">

        {/* HEADING */}
        <div className="mb-10">
          <h1 className="mb-3 text-3xl font-extrabold sm:text-4xl md:text-5xl">
            Contact Us
          </h1>

          <p className="max-w-2xl text-sm leading-6 text-gray-600 sm:text-base">
            We'd love to hear from you! If you have any questions,
            suggestions, or feedback, feel free to get in touch with us.
            We're always happy to help and would love to know your thoughts.
            Your feedback is valuable to us, and we'll do our best to respond
            as soon as possible.
          </p>
        </div>

        
        <div className="grid grid-cols-1 items-center gap-10 md:grid-cols-2 md:gap-12">

          {/* IMAGE */}
          <div className="flex justify-center">
            <img
              src="/main.svg"
              alt="Contact illustration"
              className="w-full max-w-sm object-contain md:max-w-md"
            />
          </div>

        
          <form
            onSubmit={handleSubmit}
            className="w-full rounded-2xl border border-gray-200 bg-white p-5 shadow-lg sm:p-8"
          >

            
            <div className="grid grid-cols-2 gap-3">

              <button
                type="button"
                className="flex items-center justify-center gap-2 rounded-lg bg-black px-2 py-3 text-xs font-semibold text-white transition hover:bg-gray-800 sm:text-sm"
              >
                <MdOutlineMessage className="text-lg" />
                SUPPORT CHAT
              </button>

              <button
                type="button"
                className="flex items-center justify-center gap-2 rounded-lg bg-black px-2 py-3 text-xs font-semibold text-white transition hover:bg-gray-800 sm:text-sm"
              >
                <IoCallOutline className="text-lg" />
                VIA CALL
              </button>

            </div>

            
            <div className="my-6 flex items-center gap-3">
              <div className="h-px flex-1 bg-gray-200"></div>

              <span className="flex items-center gap-2 text-xs font-semibold text-gray-500 sm:text-sm">
                <MdOutlineMessage className="text-lg" />
                VIA EMAIL FORM
              </span>

              <div className="h-px flex-1 bg-gray-200"></div>
            </div>

            
            <div className="mb-5">
              <label
                htmlFor="name"
                className="mb-2 block text-sm font-semibold"
              >
                Your Name
              </label>

              <input
                type="text"
                id="name"
                placeholder="Enter your name"
                value={name}
                onChange={(e) => setName(e.target.value)}
                required
                className="w-full rounded-lg border border-gray-300 bg-gray-50 px-4 py-3 text-sm outline-none transition focus:border-black focus:bg-white focus:ring-2 focus:ring-gray-200"
              />
            </div>

            
            <div className="mb-5">
              <label
                htmlFor="email"
                className="mb-2 block text-sm font-semibold"
              >
                E-Mail
              </label>

              <input
                type="email"
                id="email"
                placeholder="Enter your email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                className="w-full rounded-lg border border-gray-300 bg-gray-50 px-4 py-3 text-sm outline-none transition focus:border-black focus:bg-white focus:ring-2 focus:ring-gray-200"
              />
            </div>

            
            <div className="mb-6">
              <label
                htmlFor="text"
                className="mb-2 block text-sm font-semibold"
              >
                Message
              </label>

              <textarea
                id="text"
                rows="4"
                placeholder="Write your message here..."
                value={text}
                onChange={(e) => setText(e.target.value)}
                required
                className="w-full resize-none rounded-lg border border-gray-300 bg-gray-50 px-4 py-3 text-sm outline-none transition focus:border-black focus:bg-white focus:ring-2 focus:ring-gray-200"
              />
            </div>

            
            <button
              type="submit"
              className="w-full rounded-lg bg-black py-3 font-semibold text-white transition hover:bg-gray-800 active:scale-[0.98]"
            >
              Submit
            </button>

          </form>
        </div>
      </main>
    </div>
  );
};

export default App;