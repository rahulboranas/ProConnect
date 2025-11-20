import React from 'react'
import styles from './styles.module.css'
import { useRouter } from 'next/router'
import { useDispatch, useSelector } from 'react-redux'
import { reset } from '@/config/redux/reducer/authReducer'
export default function NavBarComponent() {
    const router = useRouter()
    const authState = useSelector(state=>state.auth)
    const dispatch = useDispatch()
  return (

    <div className={styles.container}>
      <nav className={styles.navBar}>
        <h1 style={{cursor:"pointer", fontSize:"1.4rem"}} onClick={()=>{
            router.push("/")
        }}>Pro Connect</h1>
        <div className={styles.navBarOptionContainer}>
          {authState.profileFetched && <div style={{display:"flex", gap:"1rem", cursor:"pointer"}}>
            <p className={styles.nameRender}>Hey, {authState.user?.userId?.name}</p>
            <p onClick={()=>{
              localStorage.removeItem("token")
               dispatch(reset())
              router.push("/login")
             
            }}>LogOut</p>
            <p onClick={()=>{
             
              router.push("/profile")
             
            }}>Profile</p>
            </div>}
           {!authState.profileFetched && <div onClick={()=>{
                router.push("/login")
            }} className={styles.buttonJoin}>
                <p>Be a part</p>

            </div>}
        </div>
      </nav>
    </div>
  )
}
