import React from 'react';
import { Card } from '../ui/card';
import { CheckCircle } from 'lucide-react';
import { Button } from '../ui/button';

const Pricing = () => {
    return (
        <div className="flex flex-col items-center px-6 py-20 bg-gradient-to-b from-gray-100 to-gray-50 min-h-screen">
            <h1 className="text-4xl md:text-5xl font-extrabold text-gray-800 text-center mb-12">
                Our Pricing Plans
            </h1>
            <div className="flex flex-col lg:flex-row items-center lg:space-x-10 space-y-10 lg:space-y-0 w-full max-w-9xl justify-center">
                {/* Free Plan */}
                <Card className="flex flex-col justify-between border border-gray-200 bg-white p-8 w-full max-w-sm text-left rounded-xl shadow-lg transition-transform duration-300 ease-in-out transform hover:scale-105 hover:shadow-xl">
                    <div>
                        <div className="flex items-center space-x-3 mb-4">
                            <span className="bg-gray-100 px-3 py-1 rounded-full text-xs font-semibold text-gray-600">Free</span>
                            <h2 className="text-3xl font-bold text-gray-900">$0</h2>
                        </div>
                        <p className="text-lg text-gray-700 mb-6">Ideal for trying out basic features</p>
                        <ul className="space-y-3 text-gray-800">
                            <li className="flex items-center">
                                <CheckCircle className="w-5 h-5 text-green-500 mr-2" /> Basic mock interviews
                            </li>
                            <li className="flex items-center">
                                <CheckCircle className="w-5 h-5 text-green-500 mr-2" /> AI-generated feedback
                            </li>
                            <li className="flex items-center">
                                <CheckCircle className="w-5 h-5 text-green-500 mr-2" /> Limited question sets
                            </li>
                            <li className="flex items-center">
                                <CheckCircle className="w-5 h-5 text-green-500 mr-2" /> Email support
                            </li>
                        </ul>
                    </div>
                    <Button variant="neutral" className="mt-8 w-full py-3 font-semibold rounded-lg bg-gray-800 text-white hover:bg-gray-700 transition-all duration-300 ease-in-out">
                        Choose Free Plan
                    </Button>
                </Card>
                
                {/* Premium Plan */}
                <Card className="flex flex-col justify-between border border-gray-300 bg-gray-900 text-white p-8 w-full max-w-sm text-left rounded-xl shadow-xl transition-transform duration-300 ease-in-out transform hover:scale-105 hover:shadow-2xl">
                    <div>
                        <div className="flex items-center space-x-3 mb-4">
                            <span className="bg-purple-600 px-3 py-1 rounded-full text-xs font-semibold">Premium</span>
                            <h2 className="text-3xl font-bold">$10</h2>
                        </div>
                        <p className="text-lg text-gray-300 mb-6">Best for professional users</p>
                        <ul className="space-y-3 text-gray-300">
                            <li className="flex items-center">
                                <CheckCircle className="w-5 h-5 text-green-500 mr-2" /> Unlimited mock interviews
                            </li>
                            <li className="flex items-center">
                                <CheckCircle className="w-5 h-5 text-green-500 mr-2" /> Advanced AI feedback
                            </li>
                            <li className="flex items-center">
                                <CheckCircle className="w-5 h-5 text-green-500 mr-2" /> Unlimited question sets
                            </li>
                            <li className="flex items-center">
                                <CheckCircle className="w-5 h-5 text-green-500 mr-2" /> Priority support
                            </li>
                        </ul>
                    </div>
                    <Button variant="neutral" className="mt-8 w-full py-3 font-semibold rounded-lg bg-purple-600 hover:bg-purple-500 transition-all duration-300 ease-in-out">
                        Choose Premium Plan
                    </Button>
                </Card>
            </div>
        </div>
    );
};

export default Pricing;
