
"use client"
import { Architects_Daughter } from 'next/font/google';
import Image from 'next/image';
import { useRouter } from 'next/navigation'
import React from 'react'
import { FaFacebookF, FaInstagram, FaLinkedin, FaLinkedinIn, FaTwitter } from 'react-icons/fa';

const AD = Architects_Daughter({
    weight: "400",
    style: "normal",
    subsets: ["latin"],
})

const Footer = () => {
    const router =  useRouter();

  return (
    <footer className='min-h-[20vh] px-48 py-10 relative bg-cover bg-center bg-np-repeat' style={{
        backgroundImage: "url('/home/home-bg.png')"
    }}>
      <div className="absolute inset-0 bg-black bg-opacity-50 backdrop-blur-2xl"></div>
      <div className="relative z-10 p-4 grid grid-cols-4 gap-20 text-white">
        <div>
            <div className="cursor-pointer" onClick={() => router.push("/")}>
                <Image src="/logo.png" alt="logo" height={80} width={80} />
                <span className='text-xl uppercase font-medium italic'>
                    <span className={AD.className}>Palm&Peaks</span>
                </span>
            </div>
            <p>
                Explore seamlessly curated tours with our all-in-one travel app.
                Effortlessly discover, compare, and book flights, hotels, and tours for
                your new adevnture on the go!. 
            </p>
        </div>
        <div className='flex flex-col gap-3 pt-10'>
            <h3 className='text-3xl font-medium text-danger-500'>Destination</h3>
            <ul className='flex flex-col gap-1'>
                <li className="cursor-pointer">USA</li>
                <li className="cursor-pointer">India</li>
                <li className="cursor-pointer">France</li>
                <li className="cursor-pointer">United Kingdom</li>
            </ul>
        </div>
        <div className='flex flex-col gap-3 pt-10'>
            <h3 className='text-3xl font-medium text-danger-500'>Adventures</h3>
            <ul className='flex flex-col gap-1'>
                <li className="cursor-pointer">Extreme</li>
                <li className="cursor-pointer">In the air</li>
                <li className="cursor-pointer">Nature and Wildlife</li>
                <li className="cursor-pointer">Winter Sports</li>
                <li className="cursor-pointer">Outdoor Parks</li>
                <li className="cursor-pointer">Water Sports</li>
            </ul>
        </div>
        <div className='flex flex-col gap-3 pt-10'>
            <h3 className='text-3xl font-medium text-danger-500'>Get in touch</h3>
            <ul className='flex gap-5 mt-5'>
                <li className="bg-purple-500 bg-opacity-30 rounded-lg text-purple-500 text-3xl p-3 cursor-pointer">
                    <FaFacebookF />
                </li>
                <li className="bg-purple-500 bg-opacity-30 rounded-lg text-purple-500 text-3xl p-3 cursor-pointer">
                    <FaInstagram />
                </li>
                <li className="bg-purple-500 bg-opacity-30 rounded-lg text-purple-500 text-3xl p-3 cursor-pointer">
                    <FaLinkedinIn />
                </li>
                <li className="bg-purple-500 bg-opacity-30 rounded-lg text-purple-500 text-3xl p-3 cursor-pointer">
                    <FaTwitter />
                </li>
            </ul>
        </div>
      </div>
    </footer>
  )
}

export default Footer
