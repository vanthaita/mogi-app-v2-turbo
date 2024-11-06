import { Github, Instagram, Youtube } from 'lucide-react'
import Link from 'next/link'
import React from 'react'
import { Button } from '../ui/button'

const Footer = () => {
  return (
    <>
      <section className="inset-0 w-full flex flex-col items-center justify-center bg-black 
        bg-[linear-gradient(to_right,#ffffff33_1px,transparent_1px),linear-gradient(to_bottom,#ffffff33_1px,transparent_1px)] 
        bg-[size:70px_70px] px-5 py-[200px] sm:py-[150px] xs:py-[120px]">
        <h2 className="text-center text-white font-heading text-5xl 
          sm:text-3xl xs:text-2xl xxs:text-xl">AI Interview Coach - Your Personal Interview Trainer
        </h2>
        <Link href="/dashboard" className='mt-[50px] flex font-base'>
          <Button className='"w-full h-full  px-10 py-3 text-[22px] g:px-8 lg:py-2.5 lg:text-lg md:px-6 md:py-2 md:text-base' variant='neutral'>
            Get started
            <svg xmlns="http://www.w3.org/2000/svg" 
              width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" 
              strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="lucide 
              lucide-arrow-up-right ml-[10px] w-[30px] h-[30px] md:w-[20px] md:h-[20px]">
              <path d="M7 7h10v10"></path>
              <path d="M7 17 17 7"></path>
            </svg>
          </Button>
        </Link>
      </section>
      <div>
        <footer className="z-30 dark:border-darkBorder bg-black 
            dark:bg-secondaryBlack px-5 py-5 text-center text-white font-base md:text-sm">
          © 2024 Mogi
        </footer>
      </div>
    </>
  )
}

export default Footer
