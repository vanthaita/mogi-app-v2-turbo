import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import React from 'react';
import { QuestionSectionProps } from '@/utils/type';
import { Volume2Icon } from 'lucide-react';

const QuestionSection: React.FC<QuestionSectionProps> = ({ mockInterviewQuestions, activeQuestionIndex }) => {
    
    const textToSpeech = (question: string) => {
        if('speechSynthesis' in window) {
            const speech = new SpeechSynthesisUtterance(question);
            window.speechSynthesis.speak(speech);
        } else {
            console.error('Speech synthesis is not supported in this browser.');
        }
    };
    
    const currentQuestion = mockInterviewQuestions[activeQuestionIndex]?.question || 'No question available';

    return (
        <Card className='p-4 bg-white'>
            <div className='flex flex-wrap justify-center gap-2'>
                {mockInterviewQuestions.map((_, index: number) => (
                    <Card 
                        key={index} 
                        className={`rounded-full text-sm md:text-base lg:text-lg px-10 border bg-white ${activeQuestionIndex === index ? 'bg-blue-200' : ''} truncate`}>
                        <span className=' break-words'>{`${index + 1}`}</span>
                    </Card>
                ))}
            </div>
            <h2 className='text-xl sm:text-2xl md:text-3xl font-bold mt-6'>Question {activeQuestionIndex + 1}:</h2>
            <p className='text-lg sm:text-xl md:text-2xl mt-1'>{currentQuestion}</p>
            <Volume2Icon 
                className='cursor-pointer mt-4 w-6 h-6 sm:w-8 sm:h-8' 
                onClick={() => textToSpeech(currentQuestion)} 
                aria-label="Read question aloud"
            />
        </Card>
    );
};

export default QuestionSection;
