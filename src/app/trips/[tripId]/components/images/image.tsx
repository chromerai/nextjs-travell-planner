import React from 'react';
import Image from "next/image";

const shuffleArray = (array: string[]) => {
  for (let i = array.length-1; i >0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [array[i], array[j]] = [array[j], array[i]];
  }
};

const ImageGallery = ({images}: {images: string[]}) => {

  const randomImages = [
    "/randomImages/random1.jpg",
    "/randomImages/random2.jpg",
    "/randomImages/random3.jpg",
    "/randomImages/random4.jpg",
    "/randomImages/random5.jpg",
  ];

  shuffleArray(randomImages)

  const getRandomImage = (index: number) => {
    if (images && images[index]) {
      return images[index];
    } else {
      const randomIndex = index % randomImages.length;
      return randomImages[randomIndex]
    }
  };

  return (
    <div className="px-5 py-5">
      {
        images && (<>
        <div className="grid grid-cols-12 gap-4 lg:gap-6">
          <div className="col-span-12 xl:col-span-4">
            <div className="grid grid-cols-12 gap-4 lg:gap-6">
              <div className="col-span-12 sm:col-span-6 xl:col-span-12">
                <a 
                className='link property-gallery'
                href="/img/tour-details-img-1.jpg"
                >
                <Image 
                src={getRandomImage(0)} 
                alt="image" 
                width={610} 
                height={288}
                decoding="async"
                data-nimg="1"
                className="w-full rounded-2xl"
                style={{color: "transparent"}}
                />
                </a>
              </div>
              <div className="col-span-12 sm:col-span-6 xl:col-span-12 relative">
                <a 
                className='link property-gallery'
                href="/img/tour-details-img-2.jpg"
                >
                <Image 
                src={getRandomImage(1)} 
                alt="image" 
                width={610} 
                height={288}
                decoding="async"
                data-nimg="1"
                className="w-full rounded-2xl"
                style={{color: "transparent"}}
                />
                </a>
              </div>
            </div>
          </div>
          <div className="col-span-12 md:col-span-6 xl:col-span-4">
                <a 
                className='link block property-gallery h-full overflow-hidden'
                href="/img/tour-details-img-3.jpg"
                >
                <Image 
                src={getRandomImage(6)} 
                alt="image" 
                width={610} 
                height={288}
                decoding="async"
                className="w-full rounded-2xl h-full"
                objectFit={"cover"}
                />
                </a>
              </div>
              <div className="col-span-12 md:col-span-6 xl:col-span-4">
                <div className="grid grid-cols-12 gap-4 lg:gap-6 h-full">
                  <div className="col-span-12 h-full">
                <a 
                className='link property-gallery h-full'
                href="/img/tour-details-img-4.jpg"
                >
                <Image 
                src={getRandomImage(3)} 
                alt="image" 
                width={610} 
                height={288}
                decoding="async"
                data-nimg="1"
                className="w-full rounded-2xl h-full"
                style={{color: "transparent"}}
                />
                </a>
                </div>
                <div className="col-span-12 sm:col-span-6">
                <a 
                className='link property-gallery'
                href="/img/tour-details-img-5.jpg"
                >
                <Image 
                src={getRandomImage(4)} 
                alt="image" 
                width={610} 
                height={600}
                decoding="async"
                data-nimg="1"
                className="w-full rounded-2xl h-full"
                style={{color: "transparent"}}
                />
                </a>
                </div>
                <div className="col-span-12 sm:col-span-6">
                <a 
                className='link property-gallery'
                href="/img/tour-details-img-6.jpg"
                >
                <Image 
                src={getRandomImage(5)} 
                alt="image" 
                width={610} 
                height={288}
                decoding="async"
                data-nimg="1"
                className="w-full rounded-2xl h-full"
                style={{color: "transparent"}}
                />
                </a>
                </div>
              </div>
            </div>
          </div>
        </>)
      }
    </div>
  );
};

export default ImageGallery;
