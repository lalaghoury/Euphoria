import React from "react";

const CommonHeading = ({ text, className = "" }) => {
  return (
    <div className={`mb-[50px] mt-[20px] flex items-center gap-x-[15px] font-['core Sans C'] w-full ${className}`}>
      <div className="w-1.5 h-7 rounded-[0.625rem] bg-[#8a33fd]" />
      <h1 className="text-[#3c4242] text-[1.75rem] font-semibold leading-[2.0625rem]">
        {text}
      </h1>
    </div>
  );
};

export default CommonHeading;
