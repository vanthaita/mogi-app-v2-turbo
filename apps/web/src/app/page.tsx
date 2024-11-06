'use client'
import Benefit from "@/components/landing/benefit";
import Footer from "@/components/landing/footer";
import Hero from "@/components/landing/hero";
import HowItWork from "@/components/landing/howitwork";
import Questions from "@/components/landing/questions";
import Marquee from "react-fast-marquee";
import { UserCheck, MessageCircle, Briefcase } from "lucide-react";
import Navbar from "@/components/landing/navbar";


export default function Home() {
  return (
    <div className="w-full">
      <Navbar />
      <section id="hero">
        <Hero />
      </section>
      <Marquee speed={100} className="bg-black py-6 font-base text-white mt-10">
        <div className=" flex justify-center items-center gap-8">
          <div className="flex justify-center items-center gap-x-4 ml-8">
            <span className="text-xl flex items-center  gap-4">
              <UserCheck className="w-6 h-6 text-white" />
              AI-Powered Interview Coach
            </span>
            <span className="text-xl flex items-center gap-4 ml-10">
              <MessageCircle className="w-6 h-6 text-white" />
              Real-Time Feedback on Mock Interviews
            </span>
            <span className="text-xl flex items-center gap-4 ml-10">
              <Briefcase className="w-6 h-6 text-white" />
              Prepare for Your Dream Job
            </span>
          </div>

            <div className="flex justify-center items-center gap-x-4">
              <span className="text-xl flex items-center gap-4">
                <UserCheck className="w-6 h-6 text-white" />
                AI-Powered Interview Coach
              </span>
              <span className="text-xl flex items-center gap-4 ml-10">
                <MessageCircle className="w-6 h-6 text-white" />
                Real-Time Feedback on Mock Interviews
              </span>
              <span className="text-xl flex items-center gap-4 ml-10">
                <Briefcase className="w-6 h-6 text-white" />
                Prepare for Your Dream Job
              </span>
            </div>
        </div>
      </Marquee>
      <section id="benefit">
        <Benefit />
      </section>
      <section id="how-it-works">
        <HowItWork />
      </section>
      <section id="questions" className="bg-gray-100">
        <Questions />
      </section>
      <Footer />
    </div>
  );
}
