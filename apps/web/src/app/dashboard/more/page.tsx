'use client'
import React from 'react';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { FaInfoCircle, FaEnvelope, FaLifeRing, FaShieldAlt, FaFileAlt } from "react-icons/fa";

const MorePage = () => {
  return (
    <div className="text-black min-h-screen p-6 bg-white">
      <div className="flex flex-col flex-wrap gap-8 md:grid-cols-2 lg:grid-cols-3">

        <Card className="p-8 bg-white border border-black">
          <div className="flex items-center mb-4">
            <FaInfoCircle className="text-3xl mr-3 text-black" />
            <h2 className="text-2xl font-bold text-black">About Us</h2>
          </div>
          <p className="text-base mb-6 text-black">Learn more about our company and values.</p>
          <Button className="bg-black text-white border-2 border-black hover:bg-gray-800 transition-colors duration-300">
            Read More
          </Button>
        </Card>

        <Card className="p-8 bg-black text-white border border-black">
          <div className="flex items-center mb-4">
            <FaEnvelope className="text-3xl mr-3 text-white" />
            <h2 className="text-2xl font-bold text-white">Contact Us</h2>
          </div>
          <p className="text-base mb-6 text-white">Reach out to us with any questions or concerns.</p>
          <Button className="bg-white text-black border-2 border-white hover:bg-gray-200 transition-colors duration-300">
            Get in Touch
          </Button>
        </Card>

        <Card className="p-8 bg-white border border-black">
          <div className="flex items-center mb-4">
            <FaLifeRing className="text-3xl mr-3 text-black" />
            <h2 className="text-2xl font-bold text-black">Support</h2>
          </div>
          <p className="text-base mb-6 text-black">We are here to help you 24/7.</p>
          <Button className="bg-black text-white border-2 border-black hover:bg-gray-800 transition-colors duration-300">
            Support Center
          </Button>
        </Card>

        <Card className="p-8 bg-black text-white border border-black">
          <div className="flex items-center mb-4">
            <FaShieldAlt className="text-3xl mr-3 text-white" />
            <h2 className="text-2xl font-bold text-white">Policy</h2>
          </div>
          <p className="text-base mb-6 text-white">Read our policies and privacy terms.</p>
          <Button className="bg-white text-black border-2 border-white hover:bg-gray-200 transition-colors duration-300">
            View Policies
          </Button>
        </Card>

        <Card className="p-8 bg-white border border-black">
          <div className="flex items-center mb-4">
            <FaFileAlt className="text-3xl mr-3 text-black" />
            <h2 className="text-2xl font-bold text-black">Terms & Conditions</h2>
          </div>
          <p className="text-base mb-6 text-black">Understand our terms of service.</p>
          <Button className="bg-black text-white border-2 border-black hover:bg-gray-800 transition-colors duration-300">
            Read Terms
          </Button>
        </Card>

      </div>
    </div>
  );
};

export default MorePage;
