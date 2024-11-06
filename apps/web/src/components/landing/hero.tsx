import React from 'react';
import { Button } from '../ui/button';
import { BookOpen, Mic } from 'lucide-react'; // Importing icons from Lucide-react
import Image from 'next/image';
import { Card } from '../ui/card';
import Link from 'next/link';
const Hero = () => {
  return (
    <div className="w-full top-8 flex flex-col items-center relative p-8 text-center overflow-hidden">
      <div className="relative z-10 max-w-6xl mt-20">
        <div className='w-full flex justify-center items-center'>
          <div className='flex gap-x-1.5 py-1.5 px-3 rounded-full text-xs font-medium border-2 border-black bg-gray-200 text-black mb-4'>
            <BookOpen className="w-4 h-4" /> {/* Custom icon for emphasis */}
            Your AI Interview Coach
          </div>
        </div>
        <h1 className="text-4xl md:text-6xl font-extrabold text-black mb-6">
          Ace Your <strong className=' text-[#00b4d8]'>Interviews</strong> with AI Guidance
        </h1>
        <p className="text-lg md:text-2xl text-gray-800 mb-8">
          Practice, Improve, and Succeed with personalized AI-driven interview mock sessions.
        </p>
        <div className="flex justify-center space-x-4">
          <Link href='/dashboard'>
            <Button className="px-6 py-3 rounded-lg hover:scale-105 transform transition" variant='neutral'>
              Get started
            </Button>
          </Link>
          <Link href='https://github.com/TaThasi/Mogi'>
            <Button className="text-white px-6 py-3 rounded-lg hover:scale-105 transform transition bg-[#00b4d8]">
              See on GitHub
            </Button>
          </Link>
        </div>
      </div>

      <Card className="rounded-md md:w-1/2 md:h-1/2 w-full h-full mt-10 flex items-center justify-center">
        <Image 
          src='/dashboard.png'
          height={1048}
          width={1048}
          className=' w-full h-full object-contain'
          alt='hero-image'
        />
      </Card>
      <div>
      </div>
    </div>
  );
};

export default Hero;
