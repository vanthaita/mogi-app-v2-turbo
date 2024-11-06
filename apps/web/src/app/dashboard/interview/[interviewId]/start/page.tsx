'use client';
import React, { useEffect, useState } from 'react';
import QuestionSection from './components/question.section';
import RecordAnswerSection from './components/record.answer.section';
import { Button } from '@/components/ui/button';
import { useRouter } from 'next/navigation';
import { Card, CardContent } from '@/components/ui/card';
import { Lightbulb } from 'lucide-react';
import { InterviewQuestion, InterViewData } from '@/utils/type';
import axiosInstance from '@/helper/axios';
const InterviewPage = ({ params }: { params: { interviewId: string } }) => {
    const [interviewData, setInterviewData] = useState<InterViewData | null>(null);
    const [mockInterviewQuestions, setMockInterviewQuestions] = useState<InterviewQuestion[]>([]);
    const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
    const router = useRouter();
    useEffect(() => {
        getData();
    }, []);

    const getData = async () => {
        try {
            const response = await axiosInstance.get(`/interview/${params.interviewId}`);
            const data = response.data;
            const parsedQuestions = JSON.parse(data.jsonMockResp).questions as InterviewQuestion[];
            setMockInterviewQuestions(parsedQuestions);
            setInterviewData(data);
        } catch (err) {
            console.error('Error occurred while fetching interview data:', err);
        }
    };

    return (
        <div className="w-full h-full relative">
            <div className="w-full h-full flex flex-col md:flex-row justify-between gap-4 bg-white">
                <div className="md:w-2/3 w-full h-full mr-2 md:p-1 p-4 gap-y-6 flex flex-col justify-between">
                    <QuestionSection
                        mockInterviewQuestions={mockInterviewQuestions}
                        activeQuestionIndex={currentQuestionIndex}
                    />
                    <div>
                        <Card className="border-black border-2 bg-yellow-300 shadow-lg">
                            <CardContent className="p-4 flex flex-col items-start">
                                <Lightbulb className="w-8 h-8 text-black" />
                                <h2 className="text-2xl md:text-3xl font-bold mt-4 text-black">Important Notes Before Starting:</h2>
                                <span className="text-base md:text-lg mt-2 text-black">
                                    Before beginning your interview, please take a moment to review the key points and guidelines provided on the web. 
                                    These notes are crucial for ensuring that you are well-prepared and confident as you proceed. 
                                    Additionally, after completing your interview, you can return here to add any feedback or reflections on your performance. 
                                    This will help you track your progress and make improvements for future interviews.
                                </span>
                            </CardContent>
                        </Card>
                        <div className="flex gap-4 justify-end mt-4">
                            {currentQuestionIndex > 0 && (
                                <Button variant="neutral" onClick={() => setCurrentQuestionIndex(currentQuestionIndex - 1)}>
                                    Previous Question
                                </Button>
                            )}
                            {currentQuestionIndex != mockInterviewQuestions.length - 1 && (
                                <Button variant="neutral" onClick={() => setCurrentQuestionIndex(currentQuestionIndex + 1)}>
                                    Next Question
                                </Button>
                            )}
                            {currentQuestionIndex == mockInterviewQuestions.length - 1 && (
                                <Button
                                    variant="neutral"
                                    onClick={() => router.push(`/dashboard/interview/${params.interviewId}/feedback`)}
                                >
                                    End Question
                                </Button>
                            )}
                        </div>
                    </div>
                </div>

                <div className="w-full md:w-1/2 h-full bg-white">
                    <RecordAnswerSection
                        mockInterviewQuestions={mockInterviewQuestions}
                        activeQuestionIndex={currentQuestionIndex}
                        interviewData={interviewData}
                    />
                </div>
            </div>
        </div>
    );
};

export default InterviewPage;
