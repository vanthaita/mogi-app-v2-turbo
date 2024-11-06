import React from 'react'
import { Card } from '../ui/card'

const Benefit = () => {
  return (
    <div className="benefit-cover mx-auto px-8 py-10 md:p-20 xl:p-40 border-t-4 border-b-4 w-full">
        <div className="mx-auto w-fit max-w-5xl border-[#3843D0] bg-[#F7F5FF] p-9 px-10 shadow-[8px_8px_0px_#000]">
        <h2 className="mx-auto mb-4 max-w-4xl text-center text-[1.5rem] md:text-3xl lg:text-4xl xl:text-[4rem] leading-tight md:leading-normal lg:leading-none">
          Elevate Your Interview Skills with <strong className="bg-[#FFC8EB] px-2">Mock Interview AI</strong>
        </h2>
        <p className="mx-auto max-w-3xl text-center text-base md:text-xl lg:text-2xl font-medium">
          Your Personal AI Interview Coach - providing tailored feedback to help you land your dream job.
        </p>
        </div>
    </div>
  )
}

export default Benefit