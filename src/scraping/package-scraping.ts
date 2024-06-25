// @ts-nocheck
import { DestinationDetailsType, DestinationItineraryType, DetailedItineraryType, PackageItineraryType } from "@/types/trips";
import { Page } from "puppeteer";
interface PackageInfo {
    id: string | null;
    name: string;
    nights: number;
    days: number;
    inclusions: string[];
    price: number;
}

interface PackageDetailsType {
    description: string;
    images: string[];
    themes: string[];
    detailedItinerary: DetailedItineraryType[];
    destinationItinerary: DestinationItineraryType[];
    destinationDetails: DestinationDetailsType[];
    packageItinerary: PackageItineraryType[];
}


export const startPackagescraping = async(page: Page, pkg: PackageInfo) => {
    const packageDetails = await page.evaluate(() => {
        const packageDetails: PackageDetailsType = {
            description: "",
            images: [],
            themes: [],
            detailedItinerary: [],
            destinationItinerary: [],
            destinationDetails: [],
            packageItinerary: [],
        };

        const packageElement = document.querySelector("#main-container");
        const descriptionSelector = packageElement?.querySelector("#pkgOverview");
        const regex = new RegExp("Yatra", "gi");
        descriptionSelector?.querySelector(".readMore")?.click();
        packageDetails.description = packageElement?.querySelector("pkgOverview p")?.innerHTML.replace(regex, "Palm&Peaks") as string; 

        return packageDetails;
    })

    const details = {...pkg, ...packageDetails };
    return details;
}