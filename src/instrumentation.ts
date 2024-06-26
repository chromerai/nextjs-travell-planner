import puppeteer, { Browser } from "puppeteer";
import { startLocationScraping, startPackagescraping } from "./scraping";

export const register =  async () => {
    // console.log(process.env)
    if(process.env.NEXT_RUNTIME==="nodejs") {
        const { Worker } =  await import("bullmq");
        const { connection } = await import("@/lib");
        const { jobsQueue, prisma } = await import("@/lib");
        const puppeteer  = await import("puppeteer");
        const SBR_WS_ENDPOINT = 'wss://brd-customer-hl_fa1a66f4-zone-palm_peak:x9onxvz0ynw7@brd.superproxy.io:9222';


        new Worker(
        "jobsQueue", 
        async (job)=>{
            let browser: undefined | Browser = undefined;
            console.log("Connecting to scraping browser...", SBR_WS_ENDPOINT);
            browser = await puppeteer.connect({
                browserWSEndpoint: SBR_WS_ENDPOINT,});
            try {
                // console.log(process.env)

                const page = await browser.newPage();
                // console.log("before if", job.data)
                if(job.data.jobType.type==="location") {
                    console.log("Connected! Navigating to " + job.data.url)
                    await page.goto(job.data.url, {timeout: 60000});
                    console.log("Navigated! Scraping page content...");
                    const packages = await startLocationScraping(page);
                    await prisma.jobs.update({
                        where:{id: job.data.id},
                        data: {isComplete: true, status: "complete"}
                    });
                    for(const pkg of packages) {
                        const jobCreated = await prisma.jobs.findFirst({
                            where: {
                                url: `https://packages.yatra.com/holidays/intl/details.htm?packageId=${pkg?.id}`,
                            },
                        });
                        if (!jobCreated) {
                            const job = await prisma.jobs.create({
                                data: {
                                    url: `https://packages.yatra.com/holidays/intl/details.htm?packageId=${pkg?.id}`,
                                    jobType: {type: "package"},
                                },
                            });
                            jobsQueue.add("package", {...job, packageDetails: pkg});
                        }
                    }
                } else if(job.data.jobType.type==="package") {
                    // Already scraped check
                    const alreadyScrapped = await prisma.trips.findUnique({
                        where: { id: job.data.packageDetails.id}
                    });
                    if(!alreadyScrapped) {
                        console.log("Connected! Navigating to " + job.data.url)
                        await page.goto(job.data.url, {timeout: 120000})
                        console.log("Navigated! Scraping page content...")
                        const pkg = await startPackagescraping(page, job.data.packageDetails);
                        await prisma.trips.create({data: pkg})
                        await prisma.jobs.update({
                            where: {id: job.data.id},
                            data: { isComplete: true, status: "complete"}
                        });
                    }
                    // Scrape the Package
                    // Store the Package in trips model
                    // Mark the job as complete
                }

            } catch (error) {
                console.log(error);
                await prisma.jobs.update({
                where: { id: job.data.id },
                data: {isComplete: true, status: "failed"},
                });
            } finally 
            {
                await browser?.close();
                console.log("Broswer closed successfully")
            }
        }, {
            connection, 
            concurrency:10, 
            removeOnComplete:{count:1000}, 
            removeOnFail:{count:5000},
        });
    }
}