'use client'
import React, { useEffect, useRef, useState } from 'react';
import dynamic from "next/dynamic";
import useSpeechToText from 'react-hook-speech-to-text';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Car, Mic } from 'lucide-react';
import Image from 'next/image';
import { InterviewQuestion } from '@/utils/type';
import { RecordAnswerSectionProps } from '@/utils/type';
import Webcam from 'react-webcam';
import { useAuth } from '@/context/auth.context';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import axiosInstance from '@/helper/axios';
const RecordAnswerSection: React.FC<RecordAnswerSectionProps> = ({
    interviewData,
    mockInterviewQuestions,
    activeQuestionIndex
}) => {
    const webcamRef = useRef<Webcam>(null);
    const [userAnswer, setUserAnswer] = useState('');
    const {user} = useAuth()
    const [isLoading, setIsLoading] = useState(false)
    const {
        error,
        isRecording,
        results,
        startSpeechToText,
        stopSpeechToText
    } = useSpeechToText({
        continuous: true,
        useLegacyResults: false
    });

    useEffect(() => {
        results.map((result: any) => {
            setUserAnswer(prevAnswer => prevAnswer + result?.transcript);
        });
    }, [results]);

    const saveUserAnswer = async () => {
        if (isRecording) {
            stopSpeechToText();
            if (userAnswer.length < 10) {
                return;
            }
            setIsLoading(true);
            try {
                const response = await axiosInstance.post('/interview/feedback', {
                    mockId: interviewData.id,
                    question: mockInterviewQuestions[activeQuestionIndex].question,
                    correctAnswer: mockInterviewQuestions[activeQuestionIndex].answer,
                    userAns: userAnswer,
                    userId: user?.id,
                });
                if (response.status === 200) {
                    toast.success('Success to save answer.', {
                        className: 'border-2 border-black shadow-lg bg-gray-100 text-black p-6 rounded-none',
                        bodyClassName: 'text-sm font-medium ',
                        position: "bottom-right",
                        autoClose: 3000,
                        hideProgressBar: true,
                        closeOnClick: true,
                        pauseOnHover: true,
                        draggable: true,
                        progress: undefined,
                    });
                }
            } catch (error) {
                console.error('Failed to save answer:', error);
                toast.error('Failed to save answer.', {
                    className: 'border-2 border-black shadow-lg bg-gray-100 text-black p-6 rounded-none',
                    bodyClassName: 'text-sm font-medium ',
                    position: "bottom-right",
                    autoClose: 3000,
                    hideProgressBar: true,
                    closeOnClick: true,
                    pauseOnHover: true,
                    draggable: true,
                    progress: undefined,
                });
            } finally {
                setIsLoading(false);
            }
        } else {
            startSpeechToText();
        }
    }
    
    return (
        <div className="w-full h-full flex flex-col items-center justify-center">
            <div className='w-full h-full relative flex items-center justify-center rounded-lg '>
                {webcamRef.current && webcamRef.current.stream  ? (
                    <Webcam 
                        className='max-w-full max-h-full w-auto h-auto rounded-lg object-contain' 
                        style={{ width: '640px', height: '480px' }} 
                    />
                ) : (
                    <Card style={{ width: '640px', height: '480px' }} className='flex flex-col justify-center items-center bg-white'>
                        <div className=' flex flex-col justify-center items-center'>
                            <Image 
                                src='/cam.svg'
                                height={200}
                                width={200}
                                alt='cam'
                            />
                            <span className='text-gray-500 mt-4'>Webcam Preview</span>
                        </div>
                    </Card>
                )}
            </div>
            <div className="w-full flex items-center justify-center mb-10">
                <Button variant="neutral" onClick={saveUserAnswer} 
                    disabled={isLoading && isRecording}
                >
                    {isLoading ? (
                        <span>Saving...</span>
                    ) : (
                        isRecording ? (
                            <div className="flex gap-4 justify-center items-center">
                                <Mic />
                                <span className="text-red-500 text-lg font-medium">Stop Recording</span>
                            </div>
                        ) : (
                            <span>Start Recording</span>
                        )
                    )}
                </Button>
            </div>
        </div>
    );
};

export default RecordAnswerSection;
