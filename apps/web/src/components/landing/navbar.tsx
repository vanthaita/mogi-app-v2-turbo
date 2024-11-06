'use client'
import Link from 'next/link'
import React from 'react'
import { Button } from '../ui/button'
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'
import { useAuth } from '@/context/auth.context'
import { ArrowBigRight } from 'lucide-react'

const Navbar = () => {
  const {user} = useAuth();
  return (
    <nav className="border-2 border-black bg-white mx-auto max-w-[1426px] w-[calc(100%-20px)] fixed left-1/2 transform -translate-x-1/2 top-2 z-[9999] rounded-3xl shadow-[4px_6px_rgba(0,0,0)]">
      <div className="container mx-auto flex justify-between items-center py-1 md:py-2 px-4">
        <Link href="/" className="flex items-center text-2xl font-black gap-1.5">
          <div className="text-4xl md:inline text-black">
            Mogi
          </div>
        </Link>
        <ul id="main-nav" className="hidden lg:flex lg:justify-center lg:space-x-8 relative items-center">
          <li className="relative">
            <Link href="#hero" className="active py-2 px-4 text-black hover:text-lime-600 dark:hover:text-lime-400 rounded-md hover:bg-lime-100">
              Home
            </Link>
          </li>
          <li className="relative">
            <Link href="#questions" className="py-2 px-4 text-black hover:text-lime-600 dark:hover:text-lime-400 rounded-md hover:bg-lime-100">
              Questions
            </Link>
          </li>
          <li className="relative">
            <Link href='#questions' className="py-2 px-4 text-black hover:text-lime-600 dark:hover:text-lime-400 rounded-md hover:bg-lime-100 flex items-center">
              Pricing
              <i className="ms-auto bi bi-chevron-down ml-2"></i>
            </Link>
            <ul id="subdrop1"  className="hidden lg:z-10 lg:w-40 lg:bg-white lg:border lg:border-black lg:rounded-lg lg:shadow-[4px_4px_0_0_#000000]">
              <li className="relative">
                <Link href="#" className="py-2 px-4 text-black hover:text-lime-600 dark:hover:text-lime-400 rounded-md hover:bg-lime-100">
                  Seo package
                </Link>
              </li>
              <li className="relative">
                <Link href="#" className="py-2 px-4 text-black hover:text-lime-600 dark:hover:text-lime-400 rounded-md hover:bg-lime-100">
                  Web Design
                </Link>
              </li>
            </ul>
          </li>
          <li className="relative">
            <Link href="#how-it-works" className="py-2 px-4 text-black hover:text-lime-600 dark:hover:text-lime-400 rounded-md hover:bg-lime-100">
              How it Works?
            </Link>
          </li>
        </ul>

        {!user ? (
          <Link
            href="/sign-in"
            className="py-2.5 px-5 inline-flex items-center gap-x-2 rounded-md text-sm font-medium"
          >
            <div className='flex justify-center items-center'>
              <span className="hidden md:inline text-xl">Sign In</span>
              <ArrowBigRight className='w-6 h-6 ml-2'/>
            </div>
          </Link>
        ) : (
          <Link
            href="/dashboard"
            className="inline-flex items-center gap-x-2 rounded-md text-sm font-medium px-4 py-2 text-black "
          >
            <Avatar>
              <AvatarImage src={user.picture} />
              <AvatarFallback>SB</AvatarFallback>
            </Avatar>
            <span className="text-xl ml-2 uppercase">{user?.name}</span>
          </Link>
        )}
      </div>
    </nav>
  )
}

export default Navbar
