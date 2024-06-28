"use client"
import React, { useState } from 'react'
import {Sidebar as ReactProSidebar, 
    Menu, 
    MenuItem, 
    sidebarClasses,} from 'react-pro-sidebar';

import { Architects_Daughter } from "next/font/google";
import { BiSolidCategory } from 'react-icons/bi';
import { FaBookOpen, FaHome, FaHotel } from 'react-icons/fa';
import { LuLogOut } from 'react-icons/lu';
import { MdOutlineDataUsage } from 'react-icons/md';
import Image from 'next/image';
import { useRouter } from 'next/navigation';

const AD = Architects_Daughter({
    weight: "400",
    style: 'normal',
    subsets: ['latin'],
});

const Sidebar = () => {

    const router = useRouter();
    const [selectedItem, setSelectedItem] = useState("/admin/dashboard");
    const menuItems = [
        {label: "Dashboard", icon: <FaHome />, link: "/admin/dashboard"},
        {
            label: "Trips",
            icon: <BiSolidCategory />,
            link: "/admin/trips",
        },
        {
            label: "Hotels",
            icon: <FaHotel />,
            link: "/admin/hotels",
        },
        { label: "Bookings", icon: <FaBookOpen />, link: "/admin/bookings"},
        {
            label: "Scrape Data",
            icon: <MdOutlineDataUsage />,
            link: "/admin/scrape-data",
        },
    ];

    const handleItemClick = (link: string) => {
        setSelectedItem(link);
        router.push(link);
    };
  return (
    <div className="min-h-[100vh] overflow-hidden">
        <ReactProSidebar className="h-full overflow-hidden"
        rootStyles={{[`.${sidebarClasses.container}`]: {backgroundColor: '#ffffff',
            "&:hover": {
                backgroundColor: "#ffffff",
            },
            },
        }}
        >
            <Menu className="h-[100vh] max-h-[100vh] text-black overflow-hidden"
            menuItemStyles={{
                button: ({level, active}) => {
                    return {
                        backgroundColor: active ? "#0E1428" : "#ffffff",
                        color: active ? "#ffffff" : "#000000",
                        "&:hover": {
                            backgroundColor: active ? "#0E1428" : "#0E1428",
                        color: active ? "#ffffff" : "#ffffff",
                        }
                    };
                    }
                }
            }
            >
                <div className="flex items-center justify-center my-10 flex-col">
                    <Image
                    src="/logo.png" 
                    alt="logo" 
                    width={150} 
                    height={150} 
                    className="cursor-pointer" 
                    onClick={() => router.push("/admin/dashboard")}
                    />
                    <span className="text-3xl uppercase font-medium italic">
                        <span className={AD.className}>Palm&Peaks</span>
                    </span>
                </div>
                {
                    menuItems.map((item, index)  =>(<React.Fragment key={index}>
                        <MenuItem icon={item.icon}
                        active={selectedItem === item.link} 
                        onClick={() => handleItemClick(item.link)}>
                        {item.label}
                        </MenuItem>
                    </React.Fragment>))
                }
                {
                    <MenuItem icon={<LuLogOut />} 
                    active={selectedItem === "/admin/logout"}
                    onClick={() => handleItemClick("/admin/logout")}>
                        Logout
                        </MenuItem>
                }
            </Menu>
            </ReactProSidebar>
    </div>
  );
};

export default Sidebar
