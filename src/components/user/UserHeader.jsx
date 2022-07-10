import React from "react";
import { FiSearch } from "react-icons/fi";
import { RiNotification2Line } from "react-icons/ri";
import { GiHamburgerMenu } from "react-icons/gi";
import avatar from "./../../assets/img/about/avatar.jpeg";
import "./../../assets/css/user/userHeader.css";
export default function UserHeader({showSidebar,setShowSideabr}) {
  return (
    <div className={`${showSidebar ? 'userheader' : 'userheader2'}`}>
      <div className="header__container">
        <div className="header__left">
          <div className="header__left__hamburger" onClick={()=>setShowSideabr(!showSidebar)}>
            <GiHamburgerMenu />
          </div>
          <div className="header__search">
            <form action="">
              <span>
                <FiSearch />
              </span>
              <input type="text" placeholder="Search Here" />
            </form>
          </div>
        </div>
        <div className="header__right">
          <div className="header__right__notification">
            <RiNotification2Line />
          </div>
          <div className="header__right__avatar">
            <img src={avatar} alt="" />
          </div>
        </div>
      </div>
    </div>
  );
}
