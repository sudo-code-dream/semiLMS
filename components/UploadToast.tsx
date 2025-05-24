// CardSection.jsx or CardSection.tsx
import React from "react";

export const CardSection = () => {
  return (
    <section className='w-full max-w-4xl mx-auto py-20 flex flex-col items-center gap-14 relative z-10'>
      <div className='relative z-50 w-[90%] max-w-3xl min-h-[20rem] md:min-h-[15rem] grid place-content-center text-center rounded-xl shadow-[0.063em_0.75em_1.563em_rgba(0,0,0,0.78)] bg-gradient-radial from-[#00458f8f] via-[#151419] to-[#151419] opacity-95 hover:opacity-100 transition-opacity duration-200'>
        {/* Header */}
        <div className='absolute top-0 left-0 right-0 w-full flex justify-end items-center px-4 pt-3'>
          <span className='text-gray-300 w-6 cursor-pointer'>&times;</span>
        </div>

        {/* Body */}
        <div className='w-full px-8 py-4 flex flex-col md:flex-row items-center text-left'>
          <div className='text-[#5a81ff] text-4xl md:text-5xl'>📘</div>
          <div className='md:ml-8 mt-4 md:mt-0'>
            <h3 className='text-white text-xl font-semibold mb-2'>
              Sample Card Title
            </h3>
            <p className='text-gray-300 text-base'>
              This is a description of the card content.
            </p>
          </div>
        </div>

        {/* Progress */}
        <div className='w-full px-8 mt-3'>
          <span className='text-gray-300 font-semibold text-sm block mb-1 text-right'>
            68%
          </span>
          <div className='w-full h-[6px] bg-[#363636] rounded-full relative overflow-hidden'>
            <div
              className='absolute top-0 left-0 h-full rounded-full bg-gradient-to-r from-[#1d1da3] via-[#4242cf] to-[#5a81ff]'
              style={{ width: "68%" }}></div>
          </div>
        </div>

        {/* Buttons */}
        <div className='mt-6 mb-4 flex flex-col md:flex-row justify-center gap-4 md:gap-8'>
          <button className='bg-[#222127] text-white rounded px-6 py-2 text-sm hover:bg-[#5a81ff] transition'>
            Continue
          </button>
          <button className='bg-[#222127] text-white rounded px-6 py-2 text-sm hover:bg-[#5a81ff] transition'>
            Skip
          </button>
        </div>
      </div>
    </section>
  );
};
