// @ts-nocheck
import { DestinationDetailsType, DestinationItineraryType, DetailedItineraryType, PackageItineraryType } from "@/types/trips";
import { Page } from "puppeteer";
interface PackageType {
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


export const startPackagescraping = async (page: Page, pkg: PackageType) => {
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
        packageDetails.description = packageElement?.querySelector("#pkgOverView p")?.innerHTML.replace(regex, "Palm&Peaks") as string; 

        packageDetails.images = Array.from(
            packageElement?.querySelectorAll(".galleryThumbImg")).map(
                (imageElement) => imageElement.getAttribute("src")?.replace("/t_holidays_responsivedetailsthumbimg", "")) as string[];

        const themesSelector = packageElement?.querySelector("#packageThemes");
        packageDetails.themes = Array.from(
            themesSelector?.querySelectorAll("li")
        ).map((li) => li.innerText.trim());

        const descriptions: DetailedItineraryType[] = [];
        const dayElements = packageElement?.querySelectorAll(".itineraryOverlay .subtitle");
        
        dayElements?.forEach((dayElement) => {
            const title = dayElement.textContent!.trim();
            const value = [];

            let nextElement = dayElement.nextElementSibling;
            while (nextElement && !nextElement.classList.contains("subtitle")) {
                const textContent = nextElement.textContent!.trim();
                if (textContent) {
                    value.push(textContent);
                }
                nextElement = nextElement.nextElementSibling;
            }

            descriptions.push({title, value});
        });

        packageDetails.detailedItinerary = descriptions;

        const destinationItinerary : {place: string; totalNights: number}[] = [];

        const destinationItinerarySelector = packageElement?.querySelectorAll(".type-list li");
        destinationItinerarySelector?.forEach((element) => {
            const placeElement = element.firstChild;
            const placeText = placeElement?.textContent!.trim().replace(/[\n\t]/g, "");
            const nightsElement = element.querySelector("span");
            let totalNights = 0;
            if(nightsElement) {
                const nightstext = nightsElement?.textContent!.trim()
                const nighstMatch = nightstext.match(/\d+/);
                totalNights = nighstMatch ? parseInt(nighstMatch[0]) : 0;
            }

            destinationItinerary.push({place: placeText!, totalNights})
        });

        packageDetails.destinationItinerary = destinationItinerary; 

        const cities: {
            name: string;
            description: string;
            image: string;
        }[] = [];

        const readMoreButton = document.getElementById("readMore");
        if(readMoreButton) {
            readMoreButton.click();
        }

        const cityElements = document.querySelectorAll(".tabbing a")
        cityElements.forEach((cityElement) => {
            cityElement.click();
            const readMoreButtonCity = document.getElementById("readMore")
            if(readMoreButtonCity) {
                readMoreButtonCity.click();
            }

            const cityName = cityElement?.textContent!.trim();
            const cityDescription = document.getElementById("aboutDestPara")?.textContent!.trim();
            const cityImage = document.querySelector(".info-block img")!.getAttribute("src");

            cities.push({
                name: cityName,
                description: cityDescription,
                image: cityImage,
            });
        });

        packageDetails.destinationDetails = cities;

        const dataExtracted: PackageItineraryType[] = [];
        const timeline = document.querySelector(".time-line .right-column");
        const articles = timeline?.querySelectorAll("article");

        articles?.forEach((article) => {
            const cityNameElement = article.querySelector(".title.row.acc-title .first.ng-building");
            const cityname = cityNameElement ? cityNameElement?.textContent!.trim() : "";

            const daysSelector = article.querySelectorAll(".days.acc-content");
            const daysActivity: {
                activitytype: string;
                activityDescription: string;
            }[][] = [];

            daysSelector.forEach((daySelector) => {
                const activityElements = daySelector.querySelectorAll(".items-content");
                const activities: {
                    activityType: string;
                    activityDescription: string;
                }[] = [];
                
                if (activityElements.length > 0) {
                    activityElements.forEach((activityElement, index) => {

                        const activityTypeElement = activityElement.querySelector(".content.left.ico");
                        const activityType = activityTypeElement ? activityTypeElement
                        ?.textContent!
                        .trim()
                        .split(" ")[0]
                        .split(" ")[0]
                        .split("\n")[0]
                    : `Activity ${index + 1}`;

                    let activityDescription = null;

                    if (activityType === "MEAL" || activityType === "SIGHTSEEING") {
                        const listHolder =  activityElement.querySelector(".list-holder");

                        if (listHolder) {

                            const liElements = listHolder.querySelectorAll("li.ng-scope");

                            if (liElements.length > 0) {
                                const scrapedData: {index: number; text: string }[] = [];

                                liElements.forEach((liElement, index) => {
                                    const liText = liElement?.textContent!.trim();
                                    scrapedData.push({index: index + 1, text: liText});
                                });

                                activityDescription = scrapedData
                            }
                        }
                    } else if( activityType === "HOTEL") {
                        const activityDescriptionElement = activityElement.querySelector(".content.right .name .a");
                        activityDescription = activityDescriptionElement ? activityDescriptionElement?.textContent!.trim() : null;
                    } else if (activitytype === "FLIGHT") {
                        const places = activityElement.querySelectorAll(".place span.full")

                        const scrappedData: string[] = [];
                        places.forEach((place) => {
                            scrappedData.push(place?.textContent!.trim());
                        });
                        activityDescription =  scrappedData;
                    }

                    activities.push({activityType, activityDescription});
                    });
                }
                daysActivity.push(activities)
            });

            dataExtracted.push({
                city: cityname,
                daysActivity,
            });
        });

        packageDetails.packageItinerary = dataExtracted;


        return packageDetails;
    });

    const details = {...pkg, ...packageDetails };
    return details;
}