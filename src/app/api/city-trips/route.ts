// @ts-nocheck
import { NextResponse } from "next/server";
import {prisma} from "@/lib"


export async function GET(request:Request) {
    try {
        const {searchParams} = new URL(request.url);
        const city = searchParams.get("city");
        if(city) {
            const allTrips = await prisma.trips.findMany();
            const filteredTrips = allTrips.filter((trip)=> {
                const destinationItinerary = trip.destinationItinerary || [];
                return destinationItinerary.some(
                    (destination) => destination.place.toLowerCase() === city.toLowerCase()
                );
            });
            if (filteredTrips) {
                return NextResponse.json({trips: filteredTrips,}, {status: 200});
            } else {
                return NextResponse.json(
                    {message: "Trips not found."},
                    {status: 404},
                );
            }
        }
    } catch (error) {
        return NextResponse.json(
            {message: "An unexpected error occured."}, 
            {status: 500}
        );
    }
}