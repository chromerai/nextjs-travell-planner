import { NextResponse } from "next/server";
import { prisma } from "@/lib"

export async function POST(request:Request) {
    try {
        const {url, jobType} = await request.json();
        const response = await prisma.jobs.create({data: {url, jobType}});

        return NextResponse.json({jobCreated:true}, {status:201});
    } catch (error) {
        return NextResponse.json(
            {error: "An unexpected error occurred."},
            {status: 500 }
        );
    }
}