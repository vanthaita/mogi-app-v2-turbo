import React from 'react';
import { Card } from '../ui/card';
import { User, Mic, ThumbsUp } from 'lucide-react';

const HowItWork = () => {
  return (
    <div className="not-prose flex w-full items-center justify-center z-[15] 
    relative border-t-2 border-b-2 mb-5 border-border
    dark:border-darkBorder bg-white dark:bg-secondaryBlack 
    bg-[radial-gradient(#80808080_1px,transparent_1px)]
    px-10 shadow-light dark:shadow-dark [background-size:16px_16px] 
    ">
      <div className="mx-auto px-8 py-10 md:p-20 xl:p-40 w-full">
        <div className='w-full'>
          <h1 className='text-5xl font-extrabold text-center text-gray-800 dark:text-gray-100 mb-12'>How It Works</h1>
          <div className='grid grid-cols-1 md:grid-cols-3 gap-10'>
            <Card className='px-8 py-8 bg-white dark:bg-gray-900 shadow-lg rounded-lg'>
              <div className="flex items-center justify-center mb-6">
                <User className="w-12 h-12 text-blue-600 dark:text-blue-400" />
              </div>
              <h2 className='text-2xl font-semibold mb-4 text-center text-gray-800 dark:text-gray-100'>1. Create Your Profile</h2>
              <p className='text-lg text-gray-700 dark:text-gray-300 text-center'>
                Fill out your interview details, including job position, experience, and tech stack to tailor the questions.
              </p>
            </Card>
            <Card className='px-8 py-8 bg-white dark:bg-gray-900 shadow-lg rounded-lg'>
              <div className="flex items-center justify-center mb-6">
                <Mic className="w-12 h-12 text-green-600 dark:text-green-400" />
              </div>
              <h2 className='text-2xl font-semibold mb-4 text-center text-gray-800 dark:text-gray-100'>2. Answer Questions</h2>
              <p className='text-lg text-gray-700 dark:text-gray-300 text-center'>
                Record your answers to AI-generated interview questions using your microphone, just like in a real interview.
              </p>
            </Card>
            <Card className='px-8 py-8 bg-white dark:bg-gray-900 shadow-lg rounded-lg'>
              <div className="flex items-center justify-center mb-6">
                <ThumbsUp className="w-12 h-12 text-yellow-600 dark:text-yellow-400" />
              </div>
              <h2 className='text-2xl font-semibold mb-4 text-center text-gray-800 dark:text-gray-100'>3. Get Feedback & Prepare</h2>
              <p className='text-lg text-gray-700 dark:text-gray-300 text-center'>
                Receive feedback on your responses, analyze company insights, and practice to ace the real interview.
              </p>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
}

export default HowItWork;
