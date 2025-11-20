import { BASE_URL } from '@/config';
import { AcceptConnection, getMyConnectionRequests } from '@/config/redux/action/authAction';
import DashboardLayout from '@/layout/DashboardLayout'
import UserLayout from '@/layout/UserLayout'
import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import styles from './style.module.css'
import { useRouter } from 'next/router';
import { connection } from 'next/server';

export default function MyConnectionPage() {
    const dispatch = useDispatch();
    const router = useRouter();
    const authState =useSelector((state)=>state.auth)
    useEffect(()=>{
         dispatch(getMyConnectionRequests({token:localStorage.getItem("token")}))
    },[])
    useEffect(()=>{
    if(authState.connectionRequest.length !=0){
        console.log(authState.connectionRequest)
    }
    },[authState.connectionRequest])
    return (
        <UserLayout>
            <DashboardLayout>
                <div  style={{padding:"8px", display:"flex",flexDirection:"column",gap:"1.7rem"}}>
                   <h1>My Connections</h1>
                   {authState.connectionRequest == 0 && <h3>No connection request pending</h3>}
                   {
                    authState.connectionRequest.length !=0 && authState.connectionRequest.filter((connection)=>connection.status_accepted === null).map((user,index)=>{
                        return(
                            
                         <div onClick={()=>{
                            router.push(`/view_profile/${user.userId.username}`)
                         }} className={styles.userCard} key={index+"its_me"}>
                            <div style={{display:"flex",alignItems:"center",gap:"18px"}}>
                                <div className={styles.profilePicture}>
                                    <img src={`${BASE_URL}/${user.userId.profilePicture}`} alt=''/>
                                </div>
                                <div className={styles.userInfo}>
                                    <h3>{user.userId.name}</h3>
                                    <p>{user.userId.username}</p>
                                </div>
                                <div onClick={(e)=>{
                                    e.stopPropagation();
                                    dispatch(AcceptConnection({
                                        token:localStorage.getItem("token"),
                                        action:"accept",
                                    connectionId:user._id
                                    }))
                                }} className={styles.connectBtn}>Accept</div>
                                </div>
                            </div>
                        )
                    })
                   }
                   <h4>my connection</h4>
                   {
                    authState.connectionRequest.filter((connection)=>connection.status_accepted !== null).map((user,index)=>{
                       return(  
                            
                         <div onClick={()=>{
                            router.push(`/view_profile/${user.userId.username}`)
                         }} className={styles.userCard} key={index+"its_me"}>
                            <div style={{display:"flex",alignItems:"center",gap:"18px"}}>
                                <div className={styles.profilePicture}>
                                    <img src={`${BASE_URL}/${user.userId.profilePicture}`} alt=''/>
                                </div>
                                <div className={styles.userInfo}>
                                    <h3>{user.userId.name}</h3>
                                    <p>{user.userId.username}</p>
                                </div>
                         
                                </div>
                            </div>)
                    })
                   }
                </div>
            </DashboardLayout>
        </UserLayout>
    )
}
 