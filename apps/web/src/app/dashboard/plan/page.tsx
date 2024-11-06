'use client';
import React from 'react';
import { Table, TableBody, TableCaption, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Button } from "@/components/ui/button"; 
import { Card, CardHeader, CardContent, CardFooter } from "@/components/ui/card"; 
const PlanPage = () => {
  const currentPlan = {
    name: 'Grow',
    price: '$10',
    renewalDate: '2024-10-01',
    expirationDate: '2024-11-01',
  };

  const paymentMethod = {
    cardType: 'Visa',
    cardEnding: '1234',
    expiry: '06/2024',
    email: 'billing@untitledui.com',
  };

  const subscriptionHistory = [
    { name: 'Basic', date: '2024-01-01', status: 'Expired', price: '$5' },
    { name: 'Grow', date: '2024-04-01', status: 'Expired', price: '$10' },
    { name: 'Scale', date: '2024-07-01', status: 'Expired', price: '$20' },
  ];

  return (
    <div className="p-4 bg-gray-50">
      <div className="mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          <Card className="col-span-1 md:col-span-2 bg-gray-100">
            <CardHeader>
              <h2 className="text-lg font-bold">Basic Plan <span className="text-sm text-green-600">Active</span></h2>
              <p className="text-sm text-gray-600">Our most popular plan for small teams.</p>
            </CardHeader>
            <CardContent className="flex justify-between items-center">
              <div>
                <p className="text-3xl font-semibold">{currentPlan.price} <span className="text-base">/month</span></p>
              </div>
              <Button className="ml-4" >Upgrade Plan</Button>
            </CardContent>
          </Card>

          <Card className='bg-gray-100'>
            <CardHeader>
              <h2 className="text-lg font-bold">Payment Method</h2>
            </CardHeader>
            <CardContent className='flex justify-between items-end'>
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium">{paymentMethod.cardType} ending in {paymentMethod.cardEnding}</p>
                  <p className="text-sm text-gray-600">Expiry: {paymentMethod.expiry}</p>
                  <p className="text-sm text-gray-600">{paymentMethod.email}</p>
                </div>
              </div>
              <Button className="ml-4" >Edit</Button>
            </CardContent>
          </Card>
        </div>

        <Card className="mb-8 bg-gray-100">
          <CardHeader>
            <h2 className="text-lg font-bold">Billing History</h2>
          </CardHeader>
          <CardContent>
            <Table>
              <TableCaption>A history of your subscribed plans.</TableCaption>
              <TableHeader>
                <TableRow>
                  <TableHead className="w-[100px]">Plan</TableHead>
                  <TableHead className="text-center">Date</TableHead>
                  <TableHead className="text-center">Status</TableHead>
                  <TableHead className="text-right">Price</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {subscriptionHistory.map((subscription, index) => (
                  <TableRow key={index}>
                    <TableCell className="font-medium text-start">{subscription.name}</TableCell>
                    <TableCell className="text-center">{subscription.date}</TableCell>
                    <TableCell className="text-center">{subscription.status}</TableCell>
                    <TableCell className="text-right">{subscription.price}</TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </CardContent>
          <CardFooter className="flex justify-end">
            <Button >Download All</Button>
          </CardFooter>
        </Card>
      </div>
    </div>
  );
};

export default PlanPage;
