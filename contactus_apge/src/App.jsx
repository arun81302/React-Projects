import React, { useState } from "react";
import Nav from "./Nav";
import { MdOutlineMessage } from "react-icons/md";
import { IoCallOutline } from "react-icons/io5";
import main from "../public/main.svg";

const App = () => {
let [pop,setPop]=useState(false)

  return (
    <div>
      <Nav />
      
      <div>
        { pop && (
        <div className="bg-transparent w-full h-full z-20 fixed  inset-0 flex justify-center items-center">
          <div className="flex flex-col border-2 w-[80%]  bg-white shadow-2xl shadow-gray-900 rounded-md">
            <h1 className="text-center text-2xl font-bold">Your Data</h1>
            <p className="font-bold mb-1.5">Your Name:</p>
            <p className="font-bold mb-1.5">Your Email:</p>
            <p className="font-bold mb-1.5">Your Text:</p>
            <button className="border-2 mb-2 cursor-pointer rounded-xl py-1 mt-2">Clear</button>
          </div>
        </div> )}
        
        <div className="flex flex-col w-[96%] mx-auto mt-3.5">
          <h1 className="text-3xl font-bold">Contact Us</h1>
          <p className="text-sm font-light">
            We'd love to hear from you! If you have any questions, suggestions,
            or feedback, feel free to get in touch with us. We're always happy
            to help and would love to know your thoughts. Your feedback is
            valuable to us, and we'll do our best to respond as soon as
            possible.
          </p>
        </div>
        <div className="mt">
          <div>
            <img src={main} alt="" />
          </div>

          <form className="border-2 w-[95%] mx-auto flex flex-col mt-5 mb-10">
            <div className="border-2 flex justify-between">
              <button className="border-2 flex items-center gap-x-0.5 cursor-pointer px-1.5 text-base py-1.5 rounded-md bg-black text-white font-semibold">
                <MdOutlineMessage />
                VIA SUPPORT CHAT
              </button>
              <button className="border-2 flex items-center gap-x-0.5 cursor-pointer px-1.5 text-base py-1.5 rounded-md bg-black text-white font-semibold">
                <IoCallOutline />
                VIA SUPPORT CHAT
              </button>
            </div>
            <button className="border-2 w-full flex justify-center items-center py-2 gap-x-2 font-semibold rounded-md mt-4 mb-4">
              <MdOutlineMessage />
              VIA EMAIL FORM
            </button>
            <label htmlFor="name">Name</label>
            <input
              className="border-2 mb-2 rounded-md pl-2 py-1 bg-gray-100"
              type="text"
              id="name"
            />
            <label htmlFor="email">E-Mail</label>
            <input
              className="border-2 mb-2 rounded-md pl-2 py-1 bg-gray-100"
              type="email"
              id="email"
            />
            <label htmlFor="text">Text</label>
            <input
              className="border-2 mb-2 rounded-md pl-2 py-1 bg-gray-100"
              type="text"
              id="text"
            />
            <button className="border-2 self-end px-10 font-semibold py-1.5 rounded-md bg-black text-white">
              Submit
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default App;
