/* eslint-disable @next/next/no-img-element */
'use client';
import React, { useEffect, useState } from 'react';
import { Input } from '@/components/ui/input';
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from '@/components/ui/card';
import { InterViewData } from '@/utils/type';
import Link from 'next/link';
import axiosInstance from '@/helper/axios';
import { FaBriefcase, FaUserTie, FaLanguage, FaQuestionCircle } from 'react-icons/fa'; // Import icons

const InterviewCard: React.FC<{ interview: InterViewData }> = ({ interview }) => {
  const mockResponse = JSON.parse(interview.jsonMockResp);
  const questionCount = mockResponse?.questions?.length || 0;

  return (
    <Card className="w-full p-6 border-2 border-gray-300 bg-white text-black cursor-pointer transform hover:scale-105 transition-transform duration-300 mb-6 rounded-lg shadow-lg hover:shadow-xl">
      <Link href={`/dashboard/interview/${interview.id}/`} className="flex items-center space-x-4">
        <div className="w-16 h-16 rounded-full bg-gray-300 overflow-hidden flex items-center justify-center">
          <img src={'/default-company-logo.png'} alt="Company logo" className="w-full h-full object-cover" />
        </div>
        <div className="flex flex-col">
          <CardTitle className="text-2xl font-bold text-gray-800 uppercase tracking-wide">{interview.jobPosition}</CardTitle>
          <CardDescription className="text-sm text-gray-600">{interview.jobDesc}</CardDescription>
        </div>
      </Link>
      <CardContent className="space-y-3 mt-4">
        <p className="flex items-center text-sm text-gray-700">
          <FaBriefcase className="mr-3 text-gray-500" />
          <strong className="font-semibold">Experience:</strong> {interview.jobExperience || 'Not specified'}
        </p>
        <p className="flex items-center text-sm text-gray-700">
          <FaUserTie className="mr-3 text-gray-500" />
          <strong className="font-semibold">Company:</strong> {interview.companyInfo || 'Mogi'}
        </p>
        <p className="flex items-center text-sm text-gray-700">
          <FaLanguage className="mr-3 text-gray-500" />
          <strong className="font-semibold">Interview Language:</strong> {interview.interviewLanguage || 'English'}
        </p>
        <p className="flex items-center text-sm text-gray-700">
          <FaQuestionCircle className="mr-3 text-gray-500" />
          <strong className="font-semibold">Questions:</strong> {questionCount}
        </p>
      </CardContent>
    </Card>
  );
};

const InterviewQuestionList: React.FC = () => {
  const [searchTerm, setSearchTerm] = useState<string>(''); 
  const [mockInterviewList, setMockInterviewList] = useState<InterViewData[]>([]); 
  const [debounceTimeout, setDebounceTimeout] = useState<NodeJS.Timeout | undefined>(undefined); 
  const [loading, setLoading] = useState<boolean>(false);  // Loading state

  const fetchInterviews = async (jobPosition: string) => {
    try {
      setLoading(true);
      const response = await axiosInstance.get<{ mockInterviews: InterViewData[] }>('/interview/search', {
        params: {
          jobPosition,
        },
      });
      setMockInterviewList(response.data.mockInterviews);
    } catch (error) {
      console.error('Error fetching interview data:', error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchInterviews('');
  }, []);

  useEffect(() => {
    if (debounceTimeout) {
      clearTimeout(debounceTimeout);
    }
    const timeout: NodeJS.Timeout = setTimeout(() => {
      fetchInterviews(searchTerm.trim());
    }, 500);
    setDebounceTimeout(timeout);

    return () => clearTimeout(timeout);
  }, [searchTerm]);

  return (
    <div className="mx-auto max-w-9xl p-6">
      <Card className="mb-6 p-4 bg-white border-2 border-gray-300 rounded-lg shadow-lg">
        <Input
          type="text"
          placeholder="Search by role..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="w-full px-4 py-2 border-2 border-gray-300 rounded-lg focus:outline-none text-gray-800 placeholder-gray-500 bg-gray-100"
        />
      </Card>
      {loading ? (
        <div className="flex flex-row justify-center items-center py-6 text-center space-x-2">
            <div className="animate-spin w-8 h-8 border-4 border-t-transparent border-gray-500 rounded-full mb-2"></div>
            <p className="text-gray-600 pb-2">Loading interviews...</p>
        </div>
        ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {mockInterviewList.length > 0 ? (
            mockInterviewList.map((interview) => (
              <InterviewCard key={interview.id} interview={interview} />
            ))
          ) : (
            <p className="text-gray-600 text-lg font-semibold mt-4 text-center w-full">No results found for &#34;{searchTerm}&#34;</p>
          )}
        </div>
      )}
    </div>
  );
};

export default InterviewQuestionList;
