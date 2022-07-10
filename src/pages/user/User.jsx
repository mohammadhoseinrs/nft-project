import React, { useState } from 'react'
import { Outlet } from 'react-router-dom'
import UserHeader from '../../components/user/UserHeader'
import UserMain from '../../components/user/UserMain'
import './../../assets/css/user/user.css'
export default function User() {
  const [showSidebar,setShowSideabr]=useState(true)
  return (
    <section className='userpanel'>
        <div className="userpanel__main">
        <UserHeader setShowSideabr={setShowSideabr} showSidebar={showSidebar}  />
        <UserMain showSidebar={showSidebar} />
        </div>
        <div className={`${showSidebar ? 'user__outlet' : 'user__outlet2'}`}>
            <Outlet />
        </div>
    </section>
  )
}
