'use client';
import React, { useState } from 'react';
import { Table, TableBody, TableCaption, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Button } from "@/components/ui/button"; 
import { Card, CardHeader, CardContent, CardFooter } from "@/components/ui/card"; 
import { ArrowUpRight, Download } from "lucide-react"; 
import { useAuth } from '@/context/auth.context';
import axiosInstance from '@/helper/axios';
import { SubscriptionHistory } from '@/utils/type';

const PlanPage = () => {
    const { user } = useAuth();
    const stripeSubscription = user?.stripeSubscription || null; 
    const subscriptionHistory: SubscriptionHistory[] = user?.subscriptionHistory || [];

    const currentPlan = {
        name: "Premium Plan",
        price: "$10", 
        status: stripeSubscription?.status || "Active"
    };
    const createAndLinkToCustomerPortal = async () => {
        try {
            const response = await axiosInstance.post('/stripe/customer-portal', {
                email: user?.email,
            });
            console.log("Customer portal URL:", response.data);
            window.location.href = response.data.url;
        } catch (error) {
            console.error("Error linking to customer portal", error);
        }
    };
    const isFreePlan = stripeSubscription?.status === null;
    return (
        <div className="p-6 bg-gray-50 min-h-screen">
        <div className="max-w-9xl mx-auto">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-10">
                <Card className="col-span-1 md:col-span-2 bg-white shadow-lg rounded-lg">
                    <CardHeader className="border-b border-gray-200 p-6">
                    <h2 className="text-xl font-bold text-gray-800">
                        {currentPlan.name}
                        <span className="ml-2 text-sm font-medium text-green-500">{currentPlan.status}</span>
                    </h2>
                    <p className="text-sm text-gray-500">The only available plan.</p>
                    </CardHeader>
                    <CardContent className="flex justify-between items-center p-6">
                    <div>
                        <p className="text-4xl font-bold text-gray-800">
                        {currentPlan.price} <span className="text-lg font-normal text-gray-500">/month</span>
                        </p>
                    </div>
                    {isFreePlan ? (
                        <Button className="ml-4 px-6 py-2 bg-blue-600 text-white font-medium rounded-md hover:bg-blue-700 transition-colors duration-200 flex items-center">
                            <ArrowUpRight className="mr-2 h-5 w-5" /> Upgrade Plan
                        </Button>
                    ) : 
                        <Button className="ml-4 px-6 py-2 bg-blue-600 text-white font-medium rounded-md hover:bg-blue-700 transition-colors duration-200 flex items-center" onClick={createAndLinkToCustomerPortal}>
                            <ArrowUpRight className="mr-2 h-5 w-5" /> View All Plan
                        </Button>
                    }
                    </CardContent>
                </Card>
            </div>
            <Card className="mb-8 bg-white shadow-lg rounded-lg">
            <CardHeader className="p-6 border-b border-gray-200">
                <h2 className="text-xl font-bold text-gray-800">Billing History</h2>
            </CardHeader>
            <CardContent className="p-6">
                <Table className="w-full">
                <TableCaption className="text-sm text-gray-500">A history of your subscribed plans.</TableCaption>
                <TableHeader>
                    <TableRow className="text-gray-600 font-medium text-sm border-b border-gray-200">
                    <TableHead className="w-[100px]">Plan</TableHead>
                    <TableHead className="text-center">Date</TableHead>
                    <TableHead className="text-center">Status</TableHead>
                    <TableHead className="text-right">Price</TableHead>
                    </TableRow>
                </TableHeader>
                <TableBody>
                    {subscriptionHistory.length > 0 ? subscriptionHistory.map((subscription, index) => (
                    (subscription.action === 'Subscription created' && <TableRow key={index} className="border-b border-gray-100 hover:bg-gray-50">
                        <TableCell className="font-medium text-gray-800 text-sm text-left">Premium</TableCell>
                        <TableCell className="text-center text-gray-600 text-sm">{new Date(subscription.timestamp).toLocaleDateString()}</TableCell>
                        <TableCell className="text-center text-gray-600 text-sm">{subscription.status}</TableCell>
                        <TableCell className="text-right text-gray-800 text-sm">{currentPlan.price}</TableCell>
                    </TableRow>)
                    )) : (
                    <TableRow>
                        <TableCell colSpan={4} className="text-center text-gray-500 p-4">No billing history available</TableCell>
                    </TableRow>
                    )}
                </TableBody>
                </Table>
            </CardContent>
            <CardFooter className="p-6 flex justify-end">
                <Button className="px-6 py-2 bg-blue-600 text-white font-medium rounded-md hover:bg-blue-700 transition-colors duration-200 flex items-center">
                <Download className="mr-2 h-5 w-5" /> Download All
                </Button>
            </CardFooter>
            </Card>
        </div>
        </div>
    );
};

export default PlanPage;
