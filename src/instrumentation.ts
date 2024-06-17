import puppeteer from "puppeteer";

export const register =  async () => {
    if(process.env.NEXT_RUNTIME==="nodejs") {
        const { Worker } =  await import("bullmq");
        const { connection } = await import("@/lib");
        const { jobsQueue } = await import("@/lib");

        new Worker("JobsQueue", async (job)=>{

            const browser = await puppeteer
        }, {
            connection, 
            concurrency:10, 
            removeOnComplete:{count:1000}, 
            removeOnFail:{count:5000},
        });
    }
}