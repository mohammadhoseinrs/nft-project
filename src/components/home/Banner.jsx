import React from "react";
import '../../assets/css/home/banner.css';

import banner from './../../assets/img/home/banner-bg.jpeg'
import maradona from './../../assets/img/home/maradona.svg'
import sign from './../../assets/img/logo/sign.png'


const HomeBanner = ({setOpenModal}) => {
    return (
        <section className="banner-section bg_img" data-background="/assets/img/home/banner-bg.jpg" style={{ background: `url(${banner})` }}>
            <div className="banner-shape shape-1"></div>
            <div className="banner-shape shape-2"></div>
            <div className="banner-shape shape-3"></div>
            <div className="banner-shape shape-4"></div>
            <div className="banner-shape shape-5"></div>
            <div className="banner-shape shape-6"></div>
            <div className="football__container">
                <div className="banner-content wow fadeInLeft" data-wow-duration="1s" style={{ visibility: "visible", animationDuration: "1s", animationName: "left" }}>
                    <h1 className="title"><span className="text-theme d-block">i am</span> Robando kal</h1>
                    <div class="bid__btn-wrapper ">
                        <button type="button" class="bid__btn btn-info button__wrapper" data-bs-toggle="modal" data-bs-target="#bidmodal"
                        onClick={()=>setOpenModal(true)}
                        >Register By Quiz</button>
                    </div>
                </div>
                <div className="banner-thumb wow fadeInLeft" data-wow-delay=".5s" data-wow-duration="1s" style={{ visibility: "visible", animationDuration: "1s", animationDelay: "0s", animationName: "top" }}>
                    <img width="100%" src={maradona} alt="banner" />
                </div>
            </div>
        </section>
    )
}

export default HomeBanner;