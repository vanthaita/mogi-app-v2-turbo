import React from 'react';
import { Card } from '../ui/card';
import { CheckCircle } from 'lucide-react';
import { Button } from '../ui/button';

const Pricing = () => {
    return (
        <div className="mx-auto px-8 py-10 md:px-20 xl:px-40 w-full bg-gray-100">
            <div className="w-full flex justify-center items-center flex-col">
                <h1 className="text-6xl font-extrabold text-center w-full mb-8">Pricing</h1>
                <div className="flex flex-col lg:flex-row justify-center items-center mt-8 space-y-6 lg:space-y-0 lg:space-x-6">
                    
                    {/* Basic Plan */}
                    <Card className="border border-gray-300 bg-white p-8 w-full lg:translate-y-6 lg:w-1/3 text-left transition-all shadow-lg transform hover:scale-105 hover:shadow-2xl rounded-lg duration-300 ease-in-out">
                        <div className="flex items-center space-x-2">
                            <span className="bg-gray-200 px-2 py-1 rounded-full text-xs font-semibold">Basic</span>
                            <h2 className="text-3xl font-bold">$0</h2>
                        </div>
                        <p className="text-lg mt-2">Per member, per month</p>
                        <div className="mt-6 space-y-4">
                            <p className="flex items-center text-md">
                                <CheckCircle className="w-5 h-5 text-green-500 mr-2" /> Access to basic mock interviews
                            </p>
                            <p className="flex items-center text-md">
                                <CheckCircle className="w-5 h-5 text-green-500 mr-2" /> AI-generated feedback
                            </p>
                            <p className="flex items-center text-md">
                                <CheckCircle className="w-5 h-5 text-green-500 mr-2" /> Limited question sets
                            </p>
                            <p className="flex items-center text-md">
                                <CheckCircle className="w-5 h-5 text-green-500 mr-2" /> Email support
                            </p>
                        </div>
                        <div className="mt-8">
                            <Button variant='neutral' className="px-6 py-3 font-bold uppercase rounded hover:bg-green-500 hover:text-white transition-all duration-300 ease-in-out">
                                Choose plan
                            </Button>
                        </div>
                    </Card>

                    {/* Team Plan - Best Seller */}
                    <Card className="border border-gray-300 bg-black lg:-translate-y-6  text-white p-8 w-full lg:w-1/3 text-left shadow-xl transform hover:scale-110 lg:shadow-2xl rounded-lg duration-300 ease-in-out">
                        <div className="flex items-center space-x-2">
                            <span className="bg-purple-500 px-2 py-1 rounded-full text-xs font-semibold">Grow</span>
                            <h2 className="text-3xl font-bold">$10</h2>
                        </div>
                        <p className="text-lg mt-2">Per member, per month</p>
                        <div className="mt-6 space-y-4">
                            <p className="flex items-center text-md">
                                <CheckCircle className="w-5 h-5 text-green-500 mr-2" /> Everything in Basic
                            </p>
                            <p className="flex items-center text-md">
                                <CheckCircle className="w-5 h-5 text-green-500 mr-2" /> Unlimited mock interviews
                            </p>
                            <p className="flex items-center text-md">
                                <CheckCircle className="w-5 h-5 text-green-500 mr-2" /> Advanced AI feedback
                            </p>
                            <p className="flex items-center text-md">
                                <CheckCircle className="w-5 h-5 text-green-500 mr-2" /> Custom interview sets
                            </p>
                        </div>
                        <div className="mt-8">
                            <Button variant='neutral' className="px-6 py-3 font-bold uppercase rounded bg-purple-500 text-white hover:bg-purple-700 transition-all duration-300 ease-in-out">
                                Choose plan
                            </Button>
                        </div>
                    </Card>

                    {/* Unlimited Plan */}
                    <Card className="border border-gray-300 bg-white p-8 lg:translate-y-6  w-full lg:w-1/3 text-left transition-all shadow-lg transform hover:scale-105 hover:shadow-2xl rounded-lg duration-300 ease-in-out">
                        <div className="flex items-center space-x-2">
                            <span className="bg-gray-200 px-2 py-1 rounded-full text-xs font-semibold">Scale</span>
                            <h2 className="text-3xl font-bold">$20</h2>
                        </div>
                        <p className="text-lg mt-2">Per member, per month</p>
                        <div className="mt-6 space-y-4">
                            <p className="flex items-center text-md">
                                <CheckCircle className="w-5 h-5 text-green-500 mr-2" /> Everything in Grow
                            </p>
                            <p className="flex items-center text-md">
                                <CheckCircle className="w-5 h-5 text-green-500 mr-2" /> Priority support
                            </p>
                            <p className="flex items-center text-md">
                                <CheckCircle className="w-5 h-5 text-green-500 mr-2" /> AI-driven insights
                            </p>
                            <p className="flex items-center text-md">
                                <CheckCircle className="w-5 h-5 text-green-500 mr-2" /> Team collaboration tools
                            </p>
                        </div>
                        <div className="mt-8">
                            <Button variant='neutral' className="px-6 py-3 font-bold uppercase rounded hover:bg-green-500 hover:text-white transition-all duration-300 ease-in-out">
                                Choose plan
                            </Button>
                        </div>
                    </Card>
                </div>
            </div>
        </div>
    );
};

export default Pricing;
