"use client"
import { Button, Card, CardBody, CardFooter, CardHeader, Input } from '@nextui-org/react';
import Image from 'next/image';
import React, { useState } from 'react'
import { Architects_Daughter } from 'next/font/google';

const AD = Architects_Daughter({
    weight: "400",
    style: 'normal',
    subsets: ['latin'],
})

const login = () => {
    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")

    const handleLogin = async () => {};
  return (
  <div className="h-[100vh] w-full flex items-center justify-center bg-cover bg-center bg-no-repeat" 
  style={{backgroundImage: 'url("/home/home-bg.png'}}
  >
    <div className="absolute inset-0 bg-black bg-opacity-50 backdrop-blur-2xl"></div>
    <Card className="shadow-2xl bg-opacity-20 w-[480px]">
        <CardHeader className="flex flex-col gap-1 capitalize text-3xl items-center">
            <div className="flex flex-col gap-1 capitalize text-3xl items-center">
                <Image 
                    src="/logo.png"
                    alt="logo"
                    width={80}
                    height={80}
                    className="cursor-pointer"
                />
                <span className="text-xl uppercase font-medium italic text-white">
                    <span className={AD.className}>
                        Palm&Peaks Admin Login
                    </span>
                </span>
            </div>
        </CardHeader>
        <CardBody className="flex flex-col items-center w-full justify-center">
            <div className="flex flex-col gap-2 w-full">
                <Input 
                    placeholder="Email"
                    type="email"
                    value={email}
                    onChange={e => setEmail(e.target.value)}
                    color="danger"
                />
                <Input 
                    placeholder="Password"
                    type="password"
                    value={password}
                    onChange={e => setPassword(e.target.value)}
                    color="danger"
                />
            </div>
        </CardBody>
        <CardFooter className="flex flex-col gap-2 items-center justify-center">
            <Button color="danger" variant="shadow" className="w-full capitalize" size="lg" onClick={handleLogin}>Login</Button>
        </CardFooter>
    </Card>
  </div>
  );
}

export default login

