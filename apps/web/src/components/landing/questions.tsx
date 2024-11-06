import React from 'react';
import {
    Accordion,
    AccordionContent,
    AccordionItem,
    AccordionTrigger,
} from '@/components/ui/accordion';
import Pricing from './pricing';

const Questions = () => {
  return (
    <>
    <Pricing />
    <div className="mx-auto px-8 py-10 md:p-20 xl:p-40 border-b-4 w-full">
        <div className='w-full flex justify-center items-center flex-col'>
            <h1 className='text-4xl font-bold text-center'>Frequently Asked Questions</h1>
            <div className='flex-col flex mt-10 space-y-4 justify-center items-center'>
                <Accordion className="w-full lg:w-[unset]" type="single" collapsible>
                    <AccordionItem className="lg:w-[500px] max-w-full" value="item-1">
                        <AccordionTrigger>How does the AI generate interview questions?</AccordionTrigger>
                        <AccordionContent>
                        Our AI analyzes the job position, years of experience, and tech stack provided in your profile to generate relevant interview questions tailored to your field.
                        </AccordionContent>
                    </AccordionItem>
                </Accordion>

                <Accordion className="w-full lg:w-[unset]" type="single" collapsible>
                    <AccordionItem className="lg:w-[500px] max-w-full" value="item-2">
                        <AccordionTrigger>Can I re-record my answers?</AccordionTrigger>
                        <AccordionContent>
                        Yes, you can re-record your answers as many times as you want before submitting them for feedback. This allows you to perfect your responses.
                        </AccordionContent>
                    </AccordionItem>
                </Accordion>

                <Accordion className="w-full lg:w-[unset]" type="single" collapsible>
                    <AccordionItem className="lg:w-[500px] max-w-full" value="item-3">
                        <AccordionTrigger>How accurate is the feedback provided?</AccordionTrigger>
                        <AccordionContent>
                        The feedback is based on a combination of AI analysis and industry best practices. While it provides a strong guideline, it&apos;s always recommended to review the feedback critically.
                        </AccordionContent>
                    </AccordionItem>
                </Accordion>

                <Accordion className="w-full lg:w-[unset]" type="single" collapsible>
                    <AccordionItem className="lg:w-[500px] max-w-full" value="item-4">
                        <AccordionTrigger>Can I practice for multiple job positions?</AccordionTrigger>
                        <AccordionContent>
                        Absolutely! You can create different profiles for various job positions and practice tailored interview questions for each one.
                        </AccordionContent>
                    </AccordionItem>
                </Accordion>
           </div>
        </div>
    </div>
    </>
  );
}

export default Questions;
