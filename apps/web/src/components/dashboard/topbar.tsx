'use client'
import React from 'react';
import Link from 'next/link';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { useAuth } from '@/context/auth.context';
import { usePathname } from 'next/navigation';

const Topbar = () => {
    const { user } = useAuth();
    const pathname = usePathname();

    const titleMap: { [key: string]: string } = {
        '/dashboard': 'Dashboard',
        '/dashboard/profile': 'Profile',
        '/dashboard/setting': 'Settings',
        '/dashboard/more': 'More',
        '/dashboard/interview': 'Interview',
        '/dashboard/interview-questions': 'Interview Questions',
        '/dashboard/feedback': 'Feedback',
        '/dashboard/plan': 'Your Plan'
    };
    const getCurrentPageTitle = () => {
        if (pathname.startsWith('/dashboard/interview/') && pathname.endsWith('/feedback')) {
            return 'Feedback';
        } else if (pathname.startsWith('/dashboard/interview') && pathname.endsWith('/start'))  {
            return 'Start interview'
        } 
        else if (pathname === '/dashboard/interview') {
            return 'Interview';
        } else if (pathname === '/dashboard/interview-questions') {
            return 'Interview Questions';
        } else if (titleMap[pathname]) {
            return titleMap[pathname];
        }
        return 'Dashboard';
    };
      
    const currentPageTitle = getCurrentPageTitle();

    return (
        <div className="h-[8vh] w-full flex items-center px-8 py-4 border-b-4 justify-between">
            <Link href="/" className="flex items-center text-xl font-black gap-1.5">
                <div className="text-xl md:text-4xl text-black">{currentPageTitle}</div>
            </Link>
            <Link
                href="/dashboard"
                className="inline-flex items-center gap-x-2 rounded-md text-sm font-medium px-4 py-2 text-black"
            >
                <Avatar>
                    <AvatarImage src={user?.picture || '/avatar.svg'} />
                    <AvatarFallback>SB</AvatarFallback>
                </Avatar>
                <span className="text-sm md:text-xl ml-2 uppercase">{user?.name}</span>
            </Link>
        </div>
    );
};

export default Topbar;
