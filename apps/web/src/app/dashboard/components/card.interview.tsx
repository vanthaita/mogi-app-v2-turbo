'use client'
import React from 'react'
import { Card } from '@/components/ui/card'
import { Button } from '@/components/ui/button';
import Link from 'next/link';
import { Briefcase, Calendar, Code, HelpCircle } from 'lucide-react';
import TimeDisplay from '@/utils/TimeDisplay';

const CardInterview = ({ role, techStack, experience, questions, time, mockId}: {
    role: string;
    techStack: string;
    experience: string;
    questions: string;
    time: string;
    mockId: string;
}) => {
    let parsedQuestions;
    try {
        parsedQuestions = JSON.parse(questions);
    } catch (e) {
        console.error('Failed to parse JSON:', e);
    }
    return (
        <Card className='p-4 border-4 border-black bg-white lg:w-[24rem] h-[14.5rem] w-[22rem]'>
            <div className='flex flex-col gap-4 mb-4'>
            <div className="flex flex-col gap-2">
                <div className="flex items-center gap-2">
                    <Briefcase className="text-black" size={16} /> 
                    <span className="text-sm font-semibold text-black">Job Position/Role:</span>
                    <span className="text-sm text-black">{role}</span>
                </div>
                <div className="flex items-center gap-2">
                    <Code className="text-black" size={16} />
                    <span className="text-sm font-semibold text-black">Tech Stack:</span>
                    <span className="text-sm text-black">{techStack}</span>
                </div>
                <div className="flex items-center gap-2">
                    <Calendar className="text-black" size={16} />
                    <span className="text-sm font-semibold text-black">Years of Experience:</span>
                    <span className="text-sm text-black">{experience}</span>
                </div>
                </div>
                <div className="flex flex-col gap-2">
                <div className="flex items-center gap-2">
                    <HelpCircle className="text-black" size={16} /> 
                    <span className="text-sm font-semibold text-black">
                        Questions: {parsedQuestions?.questions.length || 'NULL'}
                    </span>
                </div>
                    <TimeDisplay time={time as unknown as Date} />
                </div>
                <div className='flex justify-end items-center gap-4 mb-4'>
                    <Link href={`/dashboard/interview/${mockId}/feedback`}>
                        <Button variant='neutral' className='bg-blue-300'>Feedback</Button>
                    </Link>
                    <Link href={`/dashboard/interview/${mockId}/start`}>
                        <Button variant='neutral' className='bg-black text-white'>Start</Button>
                    </Link>
                </div>
            </div>
        </Card>
    )
}

export default CardInterview
