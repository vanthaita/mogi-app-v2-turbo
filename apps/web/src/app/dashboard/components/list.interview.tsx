'use client';
import React, { useEffect, useState } from 'react';
import CardInterview from './card.interview';
import { FileQuestion } from 'lucide-react';
import { InterViewData } from '@/utils/type';
import { useAuth } from '@/context/auth.context';
import axiosInstance from '@/helper/axios';
import { PulseLoader } from 'react-spinners'; // For loading spinner

const ListInterview = () => {
  const { user } = useAuth();
  const [interviewList, setInterviewList] = useState<InterViewData[]>([]);
  const [loading, setLoading] = useState<boolean>(true); // Track loading state

  useEffect(() => {
    const getInterviewList = async () => {
      try {
        setLoading(true); // Set loading to true when starting fetch
        const response = await axiosInstance.get(`/interview/user/${user?.id}`);
        setInterviewList(response.data as InterViewData[]);
      } catch (error) {
        console.error('Error fetching interview data: ', error);
      } finally {
        setLoading(false); // Set loading to false when fetch is done
      }
    };

    if (user?.id) {
      getInterviewList();
    }
  }, [user?.id]);

  return (
    <div className='w-full mb-4'>
      <h2 className='text-3xl font-semibold text-gray-800 dark:text-gray-100 mb-4'>Interviews</h2>
      <div className='flex flex-col items-center justify-center'>
        {loading ? (
          <div className="flex items-center justify-center space-x-2 mt-10">
            <PulseLoader color="#ff7f0e" size={10} margin={2} />
            <span className="text-lg text-gray-500 dark:text-gray-300">Loading...</span>
          </div>
        ) : interviewList.length > 0 ? (
          <div className='flex flex-wrap gap-6'>
            {interviewList.map((interview: InterViewData) => (
              <CardInterview
                key={interview.id}
                role={interview.jobPosition}
                techStack={interview.jobDesc}
                experience={interview.jobExperience}
                questions={interview.jsonMockResp}
                time={interview.createdAt?.toLocaleString() || ''}
                mockId={interview.id}
              />
            ))}
          </div>
        ) : (
          <div className="flex flex-col items-center justify-center text-gray-500 dark:text-gray-300">
            <FileQuestion size={48} className="mb-4" />
            <p className='text-2xl font-medium'>No interviews available</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default ListInterview;
