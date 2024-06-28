"use client";
import { TripType } from '@/types/trips';
import { USER_API_ROUTES } from '@/utils/api-routes';
import { Button, Chip } from '@nextui-org/react';
import axios from 'axios';
import Image from 'next/image';
import { useRouter, useSearchParams } from 'next/navigation'
import React, { useEffect, useState } from 'react'
import { FaChevronLeft } from 'react-icons/fa';

const CurrencyOptions = ["USD", "EUR", "GBP", "INR", "JPY", "AUD", "CAD"];
const CurrencySymbols: {[key: string]: string} = {
    "USD": "$",
    "EUR": "€",
    "GBP": "£",
    "INR": "₹",
    "JPY": "¥",
    "AUD": "A$",
    "CAD": "C$",
};

type ExchangeRateType = {
    [key: string]: number;
}

const Trips = () => {
    const router = useRouter();
    const searchParams = useSearchParams();
    const searchCity = searchParams.get("city");
    const [trips, setTrips] = useState<TripType[]>([]);
    const [exchangeRates, setExchangeRates] = useState<ExchangeRateType>({});
    const [selectedCurrency, setSelectedCurrency] = useState("INR");

    useEffect(() => {
        const fetchExchangeRates = async () => {
            try {
                const response = await axios.get('https://v6.exchangerate-api.com/v6/0ea32f975a27a28b84f0eec0/latest/USD');
                setExchangeRates(response.data.conversion_rates);
            } catch (error) {
                console.error("Error fetching exchange rate:", error)
            }
        };
        fetchExchangeRates()
    }, []);

    useEffect(() => {
        const fetchData = async () => {
            const data = await axios.get(`${USER_API_ROUTES.GET_CITY_TRIPS}?city=${searchCity}`);
            if(data.data.trips) setTrips(data.data.trips);
        };
        if (searchCity) {
            fetchData();
        }
    }, [searchCity]);

    const convertToSelectedCurrency = (priceInINR:number) => {
        if(exchangeRates[selectedCurrency] && exchangeRates["INR"]) {
            const priceinUSD = priceInINR / exchangeRates["INR"];
            return (priceinUSD * exchangeRates[selectedCurrency]).toFixed(2);
        }
        return priceInINR.toFixed(2);
        };

  return (
    <div className="m-10 px-[5vw] min-h-[80vh]">
        <div className='flex justify-between items-center my-5'>
            <Button
                variant="shadow" 
                color="primary" 
                size="lg" 
                onClick={() => router.push("/")}
            >
                <FaChevronLeft />
                Go Back
            </Button>
            <div>
                <label htmlFor='currency-select' className="mr-2">Choose Currency:</label>
                <select
                id="currency-select"
                value={selectedCurrency}
                onChange={(e) => setSelectedCurrency(e.target.value)}
                >
                    {CurrencyOptions.map((currency) => (
                        <option key={currency} value={currency}>
                            {currency}
                        </option>
                    ))}
                </select>
            </div>
        </div>
        <div className="grid grid-cols-2 gap-5">
            {trips.map((trip)=> (
                <div 
                key={trip.id}
                className="grid grid-cols-9 gap-5 rounded-2xl border border-neutral-300 cursor-pointer"
                onClick={()=> router.push(`/trips/${trip.id}`)}
                >
                    <div className="relative w-full h-48 col-span-3">
                        <Image 
                        src={trip.images[0]} 
                        alt="trip" 
                        fill 
                        className="rounded-2xl"
                        />
                    </div>
                    <div className="col-span-6 pt-5 pr-5 flex flex-col gap-1">
                        <h2 className="text-lg font-medium capitalize">
                            <span className="line-clamp-1">{trip.name}</span>
                        </h2>
                        <div>
                            <ul className='flex gap-5 w-full overflow-hidden'>
                                {
                                    trip.destinationDetails.map((detail, index) => (<li key={detail.name}>
                                        <Chip 
                                        color={index%2===0 ? "secondary": "danger"} 
                                        variant="flat"
                                        >{detail.name}
                                        </Chip>
                                    </li>)
                                )}
                            </ul>
                        </div>
                        <div>
                            <p className='line-clamp-1'>{trip.description}</p>
                        </div>
                        <div className="flex gap-4">
                            <div>{trip.days} days</div>
                            <div>{trip.nights} nights</div>
                        </div>
                        <div className="flex justify-between">
                            <span>{trip.id}</span>
                            <span>
                                <strong>{CurrencySymbols[selectedCurrency]} {convertToSelectedCurrency(trip.price)} /person
                                </strong>
                            </span>
                        </div>
                    </div>
                </div>
            ))}
        </div>
    </div>
  );
};

export default Trips;
