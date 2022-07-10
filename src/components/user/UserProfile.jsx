import React from 'react'
import { Link } from 'react-router-dom'
import './../../assets/css/user/userProfile.css'
import {IoIosArrowForward} from 'react-icons/io'
export default function UserProfile() {
  return (
    <section className='userprofile'>
        <div className="page-title">
            <div className="page-title-left">
                <h3>Profile</h3>
                <p>Welcome ENFTX Profile page</p>
            </div>
            <div className="page-title-right">
                <Link to='/user/dashboard'>Home</Link>
                    <IoIosArrowForward />
                <p>Profile</p>
            </div>
        </div>
    </section>
  )
}
