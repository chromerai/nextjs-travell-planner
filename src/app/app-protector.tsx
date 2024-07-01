"use client"
import { useAppStore } from '@/store'
import { USER_API_ROUTES } from '@/utils/api-routes'
import axios from 'axios'
import { usePathname, useRouter } from 'next/navigation'
import React, { useEffect } from 'react'

const AppProtector = () => {
  const router = useRouter()
  const pathname = usePathname();
  const {setUserInfo, userInfo} = useAppStore();

  useEffect(() => {
    if(!userInfo) {
      const getUserInfo = async () => {
        const response = await axios.get(USER_API_ROUTES.ME);
        if(response.data.userInfo) {
          setUserInfo(response.data.userInfo);
        }
      };
      getUserInfo
    }
  }, [setUserInfo, userInfo]);
  return null;
}

export default AppProtector
