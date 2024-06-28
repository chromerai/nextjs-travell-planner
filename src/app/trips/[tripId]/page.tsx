"use client"
import { useAppStore } from '@/store'
import { TripType } from '@/types/trips'
import { USER_API_ROUTES } from '@/utils/api-routes'
import { Button, Input, Tab, Tabs } from '@nextui-org/react'
import axios from 'axios'
import Image from 'next/image'
import { useRouter } from 'next/navigation'
import React, { useEffect, useState } from 'react'
import { FaCalendar, FaCheck, FaFacebook, FaInstagram, FaTwitter, FaWhatsapp } from 'react-icons/fa'
import {IoPerson, IoPricetag} from "react-icons/io5";
import { Itinerary } from './components/itinerary'
import {Image as ImageGallery} from "./components/images"

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

const Trips = ({params: { tripId} }: {params: {tripId: string}}) => {
    const router = useRouter();
    const {userInfo} = useAppStore();
    const [tripData, setTripData] = useState<TripType | undefined>(undefined);
    const [date, setDate] = useState(new Date());
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

    const convertToSelectedCurrency = (priceInINR:number) => {
        if(exchangeRates[selectedCurrency] && exchangeRates["INR"]) {
            const priceinUSD = priceInINR / exchangeRates["INR"];
            return (priceinUSD * exchangeRates[selectedCurrency]).toFixed(2);
        }
        return priceInINR.toFixed(2);
        }

    useEffect(() => {

        const  fetchtripData = async() => {
            const data = await axios.get(`${USER_API_ROUTES.GET_TRIP_DATA}?id=${tripId}`);
            if(data.data.id) {
                setTripData(data.data)
            }
        }
        if (tripId) fetchtripData()
    }, [tripId])

    const handleDateChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        const newDate = event.target.value
            ? new Date(event.target.value)
            : new Date();
        setDate(newDate);

    };

    const BookTrip = async () => {};

  return (
    <div>
        {tripData && (<>
        <ImageGallery images={tripData?.images}/>
            <div className="grid grid-cols-3 my-10 gap-10 mx-32">
                <div className="col-span-2">
                    <div className="bg-white px-5 py-5 rounded-lg flex flex-col gap-10 text-blue-text-title">
                        <div className="p-10 bg-[#f5f5fe] rounded-lg border border-gray-200 flex flex-col gap-5">
                            <div className="border-b-2 border-dotted border-gray-400 flex justify-between w-full pb-5">
                            <h1 className="text-3xl">
                                <strong className="font-medium">{tripData?.name}</strong>
                            </h1>
                            <ul className="flex gap-4 text-2xl items-center">
                                <li className="cursor-pointer text-blue-500 bg-blue-100 p-3 rounded-full">
                                    <FaFacebook />
                                </li>
                                <li className="cursor-pointer text-blue-500 bg-blue-100 p-3 rounded-full">
                                    <FaInstagram />
                                </li>
                                <li className="cursor-pointer text-blue-500 bg-blue-100 p-3 rounded-full">
                                    <FaTwitter />
                                </li>
                                <li className="cursor-pointer text-blue-500 bg-blue-100 p-3 rounded-full">
                                    <FaWhatsapp />
                                </li>
                            </ul>
                            </div>
                            <div>
                                <ul className='grid grid-cols-2 gap-5'>
                                    <li>
                                        <span>Trip ID: </span>
                                        <span className="text-blue-500">{tripData.id}</span>
                                    </li>
                                    <li>
                                        <span>Duration: </span>
                                        <span>{tripData.days} Days, {tripData.nights} nights</span>
                                    </li>
                                    <li className='flex gap-4'>
                                        <span>Locations Covered: </span>
                                        <ul className='flex flex-col gap-5'>
                                            {
                                                tripData?.destinationItinerary.map((destination) => {
                                                    return (
                                                        <li key={destination.place}>
                                                            <span>{destination.place}</span>
                                                            <span>
                                                                &nbsp;{destination.totalNights} nights
                                                            </span>
                                                        </li>
                                                    )
                                                })
                                            }
                                        </ul>

                                    </li>
                                </ul>
                            </div>
                        </div>
                        <div className="px-10 py-10 bg-[#f5f5fe] rounded-lg border border-gray-200 gap-3 flex flex-col">
                            <h3 className="text-2xl">
                                <strong  className="font-medium">OverView</strong>
                            </h3>
                            <p>{tripData.description}</p>
                        </div>
                        <div className="px-10 py-10 bg-[#f5f5fe] rounded-lg border border-gray-200 gap-3 flex flex-col">
                        <h3 className="text-2xl">
                                <strong  className="font-medium">Tour Highlights</strong>
                            </h3>
                            <ul className="grid grid-cols-4 gap-5 mt-3">
                                {
                                    tripData.themes.map((theme)=> (
                                    <li key={theme} className="flex gap-2 items-center">
                                        <span className="text-sm text-blue-500 bg-blue-200 p-2 rounded-full">
                                            <FaCheck />
                                        </span>
                                        <span>{theme}</span>
                                    </li>
                                ))
                                }
                                {
                                    tripData.inclusions.map((inclusion)=> (
                                    <li key={inclusion} className="flex gap-2 items-center">
                                        <span className="text-sm text-blue-500 bg-blue-200 p-2 rounded-full">
                                            <FaCheck />
                                        </span>
                                        <span>{inclusion}</span>
                                    </li>
                                ))
                                }
                            </ul>
                        </div>
                        <div className="px-10 py-10 bg-[#f5f5fe] rounded-lg border border-gray-200 gap-3 flex flex-col">
                        <h3 className="text-2xl">
                                <strong  className="font-medium">Itinerary</strong>
                            </h3>
                            <div>
                                <Itinerary data={tripData.detailedItinerary}/>
                            </div>
                        </div>
                        <div className="px-10 py-10 bg-[#f5f5fe] rounded-lg border border-gray-200 gap-3 flex flex-col">
                        <h3 className="text-2xl">
                                <strong  className="font-medium">Location OverView</strong>
                            </h3>
                            <div>
                                <Tabs variant="bordered" color="primary">
                                    {
                                        tripData.destinationDetails.map((city) => (
                                            <Tab
                                            key={city.name}
                                            title={city.name}
                                            className='flex gap-5'
                                            >
                                                <div className="relative h-[200px] w-[20vw]">
                                                    <Image src={city.image} fill alt={city.name} />
                                                </div>
                                                <p className='flex-1'>{city.description}</p>
                                            </Tab>
                                        ))
                                    }
                                </Tabs>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="bg-white p-5 rounded-lg flex flex-col gap-10 h-max text-blue-text-title">
                    <div className="flex flex-col gap-3">
                        <h1 className="font-medium text-2xl">Price</h1>
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
                        <div className="flex gap-2 items-center justify-between">
                            <div className="flex gap-2">
                                <IoPricetag className="text-3xl" />
                                <span className="text-2xl">From</span>
                            </div>
                            <span className="text-4xl font-bold">{CurrencySymbols[selectedCurrency]} {convertToSelectedCurrency(tripData.price)}</span>
                        </div>
                    </div>
                    <div className="flex flex-col gap-5">
                        <Input endContent={<FaCalendar />}
                        type="date" 
                        onChange={handleDateChange}
                        />
                        <Input 
                        endContent={<IoPerson />}
                        placeholder="Guests"
                        type="number"
                        />
                    </div>
                    <ul className="flex flex-col gap-2">
                        <li className="flex justify-between">
                            <span> Base Price</span>
                            <span>{CurrencySymbols[selectedCurrency]} {convertToSelectedCurrency(tripData.price)}</span>
                        </li>
                        <li className="flex justify-between">
                            <span> State Price</span>
                            <span>{CurrencySymbols[selectedCurrency]} {convertToSelectedCurrency(tripData.price * 3 / 100)}</span>
                        </li>
                        <li className="flex justify-between">
                            <span>Service Changes</span>
                            <span>{CurrencySymbols[selectedCurrency]} {convertToSelectedCurrency(tripData.price * 2 / 100)}</span>
                        </li>
                        <li className="flex justify-between">
                            <span>Convenience Fee</span>
                            <span>{CurrencySymbols[selectedCurrency]} {convertToSelectedCurrency(tripData.price * 1.2 / 100)}</span>
                        </li>
                        <li className="flex justify-between">
                            <span>Total Cost</span>
                            <span>{CurrencySymbols[selectedCurrency]} {convertToSelectedCurrency(tripData.price + tripData.price * 6.2 / 100)}</span>
                        </li>
                    </ul>
                    <Button color="primary" size="lg" className="rounded-full" onClick={()=> userInfo && BookTrip()}>
                        {userInfo ? "Book Trip" : "Login to Book Trip"}
                    </Button>
                </div>
            </div>
        </>)}
    </div>
  )
}

export default Trips
