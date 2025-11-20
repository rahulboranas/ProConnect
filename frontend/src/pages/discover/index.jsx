import { BASE_URL } from '@/config'
import { getAllUser } from '@/config/redux/action/authAction'
import DashboardLayout from '@/layout/DashboardLayout'
import UserLayout from '@/layout/UserLayout'
import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import styles from './style.module.css'
import { useRouter } from 'next/router'
export default function DiscoverPage() {
    const authState = useSelector((state)=>state.auth)
    const postState = useSelector((state)=>state.posts)
    const dispatch = useDispatch()
    const router = useRouter();
    useEffect(()=>{
        if(!authState.all_profiles_fetched){
            dispatch(getAllUser());
        }
    },[])

  return (
    <UserLayout>
        <DashboardLayout>
             <div className={styles.discover_box}>
       <h1 style={{fontWeight:"bold" , color:"gray",fontSize:"1.3em"}}>Discover</h1>
       <div className={styles.allUserProfile}>
        {
          authState.all_profiles_fetched && authState.all_users.map((user)=>{
            return(
              <div onClick={()=>{router.push(`/view_profile/${user.userId.username}`)}} key={user._id} className={styles.userCard}>
                <img className={styles.useCard_image} src={`${BASE_URL}/${user.userId.profilePicture}`} alt=''/>
                <h1>{user.userId.name}</h1>
                <p>{user.userId.username}</p>
              
                </div>
            )
          })
        }
        </div>     
    </div>
        </DashboardLayout>
    </UserLayout>
   
  )
}
