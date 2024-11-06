'use client';
import React, { useState } from 'react';
import { Table, TableBody, TableCaption, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Button } from "@/components/ui/button"; 
import { Card, CardHeader, CardContent, CardFooter } from "@/components/ui/card"; 
import { ArrowUpRight, Download } from "lucide-react"; 

const PlanPage = () => {
  const currentPlan = {
    name: "Basic Plan",
    price: "$20",
    status: "Active"
  };

  const subscriptionHistory = [
    { name: "Basic Plan", date: "2023-11-01", status: "Completed", price: "$20" },
    { name: "Pro Plan", date: "2023-10-01", status: "Completed", price: "$50" },
  ];

  const [tokenCount, setTokenCount] = useState(100);

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
              <p className="text-sm text-gray-500">Our most popular plan for small teams.</p>
            </CardHeader>
            <CardContent className="flex justify-between items-center p-6">
              <div>
                <p className="text-4xl font-bold text-gray-800">
                  {currentPlan.price} <span className="text-lg font-normal text-gray-500">/month</span>
                </p>
              </div>
              <Button className="ml-4 px-6 py-2 bg-blue-600 text-white font-medium rounded-md hover:bg-blue-700 transition-colors duration-200 flex items-center">
                <ArrowUpRight className="mr-2 h-5 w-5" /> Upgrade Plan
              </Button>
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
                  <TableRow key={index} className="border-b border-gray-100 hover:bg-gray-50">
                    <TableCell className="font-medium text-gray-800 text-sm text-left">{subscription.name}</TableCell>
                    <TableCell className="text-center text-gray-600 text-sm">{subscription.date}</TableCell>
                    <TableCell className="text-center text-gray-600 text-sm">{subscription.status}</TableCell>
                    <TableCell className="text-right text-gray-800 text-sm">{subscription.price}</TableCell>
                  </TableRow>
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
