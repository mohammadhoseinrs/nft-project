import React from "react";
import logo from './../../assets/img/logo/logoi.png'
import { Link, NavLink } from "react-router-dom";
import { MdDashboard } from "react-icons/md";
import { FaUserCircle, FaUsers, FaTicketAlt } from "react-icons/fa";
import { ImImage } from "react-icons/im";
import {SiSpringsecurity} from 'react-icons/si'
import { GiReceiveMoney, GiPayMoney } from "react-icons/gi";
import { BiLogOut } from "react-icons/bi";
import {
  AiTwotoneShopping,
  AiTwotoneCalendar,
  AiOutlineTransaction,
} from "react-icons/ai";
import './../../assets/css/user/userMain.css'
export default function UserMain({showSidebar}) {
  const menuItem=[
    {id:1,name:'Dashboard',path:'/user/dashboard' , icon:<MdDashboard />},
    {id:2,name:'Profile',path:'/user/profile' , icon:<FaUserCircle />},
    {id:3,name:'Assets',path:'/user/sssets' , icon:<ImImage />},
    {id:4,name:'Order',path:'/user/order' , icon:<AiTwotoneShopping />},
    {id:5,name:'OrderHistory',path:'/user/orderHistory' , icon:<AiTwotoneCalendar />},
    {id:6,name:'Transaction',path:'/user/transaction' , icon:<AiOutlineTransaction />},
    {id:8,name:'Deposit',path:'/user/deposit' , icon:<GiPayMoney />},
    {id:9,name:'Withdraw',path:'/user/withdraw' , icon:<GiReceiveMoney />},
    {id:10,name:'Ticket',path:'/user/ticket' , icon:<FaTicketAlt />},
    {id:11,name:'Referral',path:'/user/referral' , icon:<FaUsers />},
    {id:12,name:'Security',path:'/user/security' , icon:<SiSpringsecurity />},
  ]
  return (
    <div className={`${showSidebar ? 'usermain':'usermain2'}`}>
      <div className="usermain__logo">
        <Link to="/">
          <img src={logo} alt="" />
        </Link>
      </div>
      <div className="usermain__menu">
        <ul>
          {menuItem?.map(item=>(
             <li>
             <NavLink to={item.path}>
               <span className="nav-icon">
                 {item.icon}
               </span>
               {showSidebar ? (
               <span className="nav-text">{item.name}</span>
               ):(
                 <span className="nav-text2">{item.name}</span>
               )}
             </NavLink>
           </li>
          ))}
          <li className="logout__li">
            <NavLink to="/" className={(Link)=>Link.isActive ?'.active' :''}>
              <span className="nav-icon">
                <BiLogOut />
              </span>
              {showSidebar ?(
                 <span className="nav-text">Logout</span>
              ):(
                <span className="nav-text2">Logout</span>
              )}
            </NavLink>
          </li>
        </ul>
      </div>
    </div>
  );
}
