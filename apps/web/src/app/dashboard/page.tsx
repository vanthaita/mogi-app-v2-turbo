import React from 'react';
import AddNewInterview from './components/add.new.interview';
import ListInterview from './components/list.interview';
import { FaPlusCircle } from 'react-icons/fa';
import AddNewTemplate from './components/add.new.template';



const DashboardPage = () => {
  
  return (
    <div className='p-8 relative h-auto'>
        <div className="flex-1 h-[35%] ">
           <div className='flex md:flex-row flex-col gap-x-8'>
                <div>
                    <div className='flex items-center space-x-2'>
                        <FaPlusCircle className="text-xl mt-1" />
                        <span className='text-xl font-bold'>Add new Interview</span>
                    </div>
                    <AddNewInterview />
                </div>
                <div>
                    <div className='flex items-center space-x-2'>
                        <FaPlusCircle className="text-xl mt-1" />
                        <span className='text-xl font-bold'>Add new Interview Template</span>
                    </div>
                    <AddNewTemplate />
                </div>
           </div>

        </div>
        <div className='mt-16'>
            <ListInterview />
        </div>
    </div>
  );
};

export default DashboardPage;
