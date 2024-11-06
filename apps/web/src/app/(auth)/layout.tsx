import { Card } from "@/components/ui/card";
import Image from "next/image";

export default function AuthLayout({ children }: { children: React.ReactNode }) {
  return (
    <Card className="font-sans text-base font-normal text-black dark:text-neutral-100 bg-neutral-100 
    dark:bg-neutral-500 min-h-screen flex items-center justify-center border-none">
      <div className="container px-4 py-3 lg:px-8 mx-auto">
        <Card className="w-full py-10 px-8 xl:p-12 text-base bg-white 
          dark:bg-neutral-600 grid grid-cols-1 lg:grid-cols-3 space-x-8 relative">
          {children}
          <div className="relative max-lg:hidden lg:col-span-2">
            <Card className="w-full rounded-xl dark:bg-opacity-10 min-h-[5vh] px-8 
              py-12 border-2 border-black">
              <div className="flex flex-col gap-3">
                <h2 className="text-6xl text-center">Welcome Back!</h2>
                <h6 className="text-3xl mb-4 text-center">Please log in to continue your journey.</h6>
                <div className="relative">
                  <div className="w-full flex items-center justify-center overflow-hidden py-6">
                      <Image 
                        src='/mainpage.png'
                        height={512}
                        width={512}
                        alt="main-page"
                        className="w-2/3 h-2/3 border-4 mt-8"
                      />
                  </div>
                </div>
              </div>
            </Card>
          </div>
          <p className='mt 4 text-gray-700 absolute bottom-6 left-0 right-0 text-start mx-auto overflow-hidden'>
            @2024 Mogi All rights reserved
          </p>
        </Card>
      </div>
    </Card>
  );
}
