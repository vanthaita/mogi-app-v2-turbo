import React from 'react';
import AddNewInterview from './components/add.new.interview';
import ListInterview from './components/list.interview';



const DashboardPage = () => {
  
  return (
    <div className='p-8 relative h-auto'>
      <div className="flex-1 h-[35%] ">
        <span className='text-xl font-bold'>Add new Interview</span>
        <AddNewInterview />
      </div>
      <div className='mt-16'>
        <ListInterview />
      </div>
    </div>
  );
};

export default DashboardPage;
