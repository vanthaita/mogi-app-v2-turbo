'use client'
import React from 'react'
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from '@/components/ui/accordion';
import { Star } from 'lucide-react';
import { FeedbackItemProps } from '@/utils/type';
const FeedbackCard: React.FC<FeedbackItemProps> = ({ item, index, getRatingColor, getUserAnswerColor }) => {
    return (
        <Accordion
            key={index}
            className="w-full max-w-full border-2 border-black rounded-md"
            type="single"
            collapsible
        >
            <AccordionItem className="p-4" value={`item-${index}`}>
               <div className={`flex items-center gap-4 ${getRatingColor(parseInt(item.rating))}`}>
                    <Star className=' w-6 h-6 text-blue-700'/>
                    <span className={`text-white font-bold`}>
                        Rating: {item.rating} / 10
                    </span>
               </div>
                <AccordionTrigger className="text-2xl font-semibold text-black mb-2">
                    {item.question}
                </AccordionTrigger>
                <AccordionContent className="mt-4 mb-2 p-4 bg-[#f0f0f0] border-black">
                    <h3 className="font-semibold">Feedback:</h3>
                    <p className='text-lg'>{item.feedback}</p>
                </AccordionContent>
                <AccordionContent className={`mt-4 mb-2 p-4 border-t-2 border-black ${getUserAnswerColor(parseInt(item.rating))}`}>
                    <h3 className="font-semibold">Your Answer:</h3>
                    <p className='text-lg'>{item.userAns}</p>
                </AccordionContent>
                <AccordionContent className="mt-4 p-4 bg-[#d0d0d0] border-t-2 border-black">
                    <h3 className="font-semibold">Correct Answer:</h3>
                    <p className='text-lg'>{item.correctAnswer}</p>
                </AccordionContent>
            </AccordionItem>
        </Accordion>
    );
};

export default FeedbackCard;
