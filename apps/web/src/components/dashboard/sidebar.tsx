'use client'
import { LogOutIcon, HomeIcon, UserIcon, SettingsIcon, MoreVerticalIcon, LayoutIcon, List } from 'lucide-react';
import React from 'react';
import { Button } from '../ui/button';
import { useRouter } from 'next/navigation';
import { useAuth } from '@/context/auth.context';
import Link from 'next/link';

const Sidebar = () => {
  const { logout } = useAuth();
  const router = useRouter();

  const handleLogout = async () => {
    try {
      await fetch(`${process.env.NEXT_PUBLIC_SERVER_URL}/auth/logout`, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
        },
        mode: 'no-cors',
        credentials: 'include',
      });
      await logout()
      router.push('/sign-in');
    } catch (err) {
      console.error('Failed to log out:', err);
    }
  };
  

  const sidebarItems = [
    { icon: HomeIcon, label: 'Home', link: '/dashboard' },              
    { icon: UserIcon, label: 'Profile', link: '/dashboard/profile' },    
    { icon: List, label: 'Interview Questions', link: '/dashboard/interview-questions' },  
    { icon: LayoutIcon, label: 'Plan', link: '/dashboard/plan' },       
    { icon: SettingsIcon, label: 'Settings', link: '/dashboard/setting' }, 
    { icon: MoreVerticalIcon, label: 'More', link: '/dashboard/more' },  
  ];

  return (
    <aside className="w-[5rem] h-[calc(100vh)] flex flex-col items-center border-r-4 justify-between">
      <div className="flex flex-col items-center gap-6 mt-6">
        <div className="w-8 h-8 bg-black rounded-full"></div>
        {sidebarItems.map(({ icon: Icon, label, link }, index) => (
          <div key={index} className="group">
            <Link href={link}>
              <div className="relative">
                <Icon className="w-8 h-8 hover:text-blue-500 transition duration-300 ease-in-out cursor-pointer" />
                <span className="absolute left-12 opacity-0 group-hover:opacity-100 bg-gray-800 text-white text-xs rounded-md py-1 px-2 transition duration-300 ease-in-out">
                  {label}
                </span>
              </div>
            </Link>
          </div>
        ))}
      </div>
      <Button
        onClick={handleLogout}
        variant="neutral"
        className="w-14 h-14 flex rounded-full items-center justify-center mb-4"
      >
        <LogOutIcon className="w-10 h-10" />
      </Button>
    </aside>
  );
};

export default Sidebar;
