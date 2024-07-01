"use client"
import { USER_API_ROUTES } from '@/utils/api-routes';
import axios from 'axios';
import { useRouter, useSearchParams } from 'next/navigation';
import React, { useEffect } from 'react'

const Success = () => {
    const router = useRouter()
    const searchParams = useSearchParams()
    const paymentIntent = searchParams.get("payment_intent")
    useEffect(() => {
        const updateOrderInfo = async () => {
            await axios.patch(USER_API_ROUTES.CREATE_BOOKING, {paymentIntent});
            setTimeout(() => {
                router.push("/my-bookings")
            })
            
        }
        if(paymentIntent) {
            updateOrderInfo();
        }
    },[paymentIntent, router])
  return (
    <div className='h-[80vh] flex items-center px-20 pt-20 flex-col'>
        <h1 className='text-4xl text-center'> Payment SUCCESSFULL.You are now redirected to the bookings page
        </h1>
        <h1 className="text-4xl text-center">Please do not close this page!</h1>
    </div>
  );
};

export default Success;
