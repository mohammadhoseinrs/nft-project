import React, { Component, useEffect, useState } from "react";
import { GrFormClose } from "react-icons/gr";
import { BsArrowUp, BsArrowDown, BsAppIndicator } from "react-icons/bs";
import "./../../assets/css/home/ModalGame.css";
import Flag from "./../flag/main";
import api from "../../api/api";
import { css } from "@emotion/react";
import PropagateLoader from "react-spinners/PropagateLoader";
import { useDispatch, useSelector } from "react-redux";
import imageURL from "./../../api/imageApi";
import {MdClose} from 'react-icons/md'
import {IoMdCheckmark} from 'react-icons/io'
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import avatar1 from './../../assets/img/avatar1.jpeg'
import avatar2 from './../../assets/img/avatar2.jpeg'
import { Link } from "react-router-dom";


const avatar=[
  {id:2,border:false,img:avatar1},
  {id:24,border:false,img:avatar2},
]

export default function ModalGame({ setOpenModal }) {
  const [loading, setLoading] = useState(false);
  const [color, setColor] = useState("#525fe1");
  const { user } = useSelector((state) => state.login);
  const dispatch = useDispatch();
  const [imageUrl, setImageUrl] = useState(imageURL);
  const [dataStep, setDataStep] = useState([])
  const [NumberQuestion, setResultQuestion] = React.useState(0);
  const [slideIn1, setSlideIn1] = React.useState(true);
  const [slideIn2, setSlideIn2] = React.useState(true);
  const [slideNo, setSlideNo] = React.useState(0);
  const [modal1,setModal1]=useState(false)
  const [modalText, setModalText] = useState(true);
  const [modalTrueAnswer, setModalTrueAnswer] = useState(false);
  const [modalFinalAnswer, setModalFinalAnswer] = useState(false);
  const [modalAnswer,setModalAnswer]=useState(true)
  const [finallwar,setFinallWar]=useState(true)
  const [countTrue, setCountTrue] = useState();
  const [toggleQuestion,setToggleQuestion]=useState(true)
  const [toggleQuestionTrue,setToggleQuestionTrue]=useState(false)
  const [toggleQuestionFalse,setToggleQuestionFalse]=useState(false)
  const [newAvatar,setNewAvatar]=useState(avatar)
  const [userName,setUserName]=useState('')
  const [avatarId,setAvatarId]=useState(null)
  const [unFor,setUnFor]=useState(false)
  const [modalText2,setModalText2]=useState(true)
  const [registerModal,setRegisterModal]=useState(false)
  const [borderRed,setBorderRed]=useState(false)
  const [err,setErr]=useState('')
  const [show1,setshow1]=useState(false)

  

  let items1 = dataStep[NumberQuestion];
  let items2 = dataStep[NumberQuestion + 1];
  function toggleSlide(p) {
    setTimeout(() => {
      setshow1(true)
      setTimeout(() => {
        setshow1(false)
      }, 2000);
    }, 2500);
    if(NumberQuestion==9){
      setModalText(true)
      setModal1(true)
    }

    if (slideIn1 / 2 == 0) {
      setSlideIn1((slideIn1) => !slideIn1);
    } else {
      setSlideIn2((slideIn2) => !slideIn2);
    }

    setSlideNo(slideNo + 1);

    if (items1.quizMarketValue > items2.quizMarketValue) {
      setToggleQuestion(false)
      setToggleQuestionTrue(true)
      setTimeout(() => {
        setToggleQuestion(true)
        setToggleQuestionTrue(false)
      }, 2500);
      if (p == "up") items2.quiz = "true";
      else items2.quiz = "false";
    }
    if (items1.quizMarketValue < items2.quizMarketValue) {
      setToggleQuestion(false)
      setToggleQuestionFalse(true)
      setTimeout(() => {
        setToggleQuestion(true)
        setToggleQuestionFalse(false)
      }, 2500);
      if (p == "up") items2.quiz = "false";
      else items2.quiz = "true";
    }
    setTimeout(() => {
    if (NumberQuestion !== 10) {
      const dataSteps = [...dataStep];
      dataSteps[NumberQuestion + 1] = items2;
      setDataStep(dataSteps);
      setResultQuestion(NumberQuestion + 1);
      setModalText2(false)
      const count = dataSteps.filter((value) => value.quiz === "true").length;
      setCountTrue(count);
      if (count >= 6 && NumberQuestion==9) {
        setModalText(false)
        setModalFinalAnswer(false);
        setModalTrueAnswer(true)
      } else if(NumberQuestion==9) {
        setModalText(false)
        setModalFinalAnswer(true);
        setModalTrueAnswer(false)
        setFinallWar(false)
        setUnFor(true)
      }
    } else {
      setFinallWar(false)
      setModalText(true)
    }
  }, 3000);
  }
  useEffect(() => {
    setLoading(true);
    try {
      api
        .get("api/quiz/start", {
          headers: { "Content-Type": "application/json" },
        })
        .then((res) => {
          console.log(res.data);
          setDataStep(res.data);
          setLoading(true);
        });
    } catch (err) {
      console.log(err);
    }

    return () => {
      setDataStep([]);
    };
  }, []);

  const handleGame = () => {
    setOpenModal(false);
  };
  const avatarhandler=(id)=>{
    setAvatarId(id)
    const newitem=[...newAvatar]
    newitem.forEach(item=>{
      if(item.id===id){
        return item.border=true
      }
       item.border=false
    })
    setNewAvatar(newitem)
  }
  const registerHandler=async()=>{
    if(avatarId){
    await api.get(`api/auth/${user.token}/registrComplite/${userName}/${avatarId}`).then(res=>{
      console.log(res);
      if(res.data.sucssess===false){
        setErr('You have already registered')
        setBorderRed(true)
        setTimeout(() => {
          setErr(false)
          setBorderRed(false)
        }, 3000);
      }
      if(res.data.sucssess===true && res.data.anyUsername===false){
        setErr('This username is already taken')
        setBorderRed(true)
        setTimeout(() => {
          setErr(false)
          setBorderRed(false)
        }, 3000);
      }
    })
  }else{
    setErr('please choose your avatar')
  }
  }
  console.log(items2);

  const animations = {
    initial: { opacity: 0, y: 100 },
    animate: { opacity: 1, y: 0 },
    exit: { opacity: 0, y: -1000 },
  };

  return (
    <div className="modalGame">
          <div className={`register__modal ${registerModal ? 'register__modal':'register__modal2'}`}>
            <div
            className="modalGame__closeBtn"
            onClick={() => setOpenModal(false)}
          >
            <GrFormClose />
          </div>
          <h3>Congratulations</h3>
                    <div className="modaltrueanswer__text">
                      <p>You passed this step successfully.</p>
                      <p>You answered {' '}{countTrue} {' '} question correctly.</p>
                      <b>$20 </b>
                      gift will be charged to your acount.
                      <p>Play to Earn more .</p>
                    </div>
                    <div className="modaltrueanswer__text__link">
                    <Link to='/marketplace/players'>
                      <Button variant="contained">Go to MarketPlace</Button>
                      </Link>
                      <Link to='/user/dashboard'>
                      <Button variant="contained">Go to Panel</Button>
                      </Link>
                    </div>
                    <div className="modaltrueanswer__cash">
                      How to cash out?
                    </div>
            </div>
            <div className={`modalanswerfailed ${(modalAnswer && unFor && modalFinalAnswer) ? 'modalanswerfailed':'modalanswerfailed2'}`}>
            <div
            className="modalGame__closeBtn"
            onClick={() => setOpenModal(false)}
          >
            <GrFormClose />
          </div>
               <div className="modaltrueanswer__failed">
                      <p>unfortunately unfortunately you didn't pass</p>
                      <p>You answered {' '}{10-countTrue} {' '} question incorrectly.</p>
                      <p>Please try again</p>
                    </div>
                    <button className="start__game__btn" onClick={handleGame}>
                      Start Game again
                    </button>
             </div>    
         
              <div className={`modaltrueanswer ${(modalAnswer && modalTrueAnswer) ? 'modaltrueanswer':'modaltrueanswer2'}`}>
              <div
            className="modalGame__closeBtn"
            onClick={() => setOpenModal(false)}
          >
            <GrFormClose />
          </div>
                    <div className="modaltrueanswer__input">
                      <h3>choose your avatar</h3>
                      <div className="modaltrueanswer__input__avatar">
                        {newAvatar.map(avatar=>(
                          <div className={`modaltrueanswer__input__avatar__1 ${avatar.border ? 'modaltrueanswer__input__avatar__border':''}`} onClick={()=>avatarhandler(avatar.id)}>
                            <img src={avatar.img} alt="" />
                        </div>
                        ))}
                      </div>
                      {err && <div className="err">{err}</div>}
                    <TextField id="outlined-basic" className={`${borderRed ? 'animated shake':''}`} label="UserName" variant="outlined" onChange={(e)=>setUserName(e.target.value)} />
                    <Button  variant="contained" onClick={registerHandler}>Register</Button>
                    </div>
              </div>
        <div className={`modal__text ${modalText && modalAnswer && finallwar && modalText2 ? '':'modal__text2'}`}>
          <div
            className="modalGame__closeBtn"
            onClick={() => setOpenModal(false)}
          >
            <GrFormClose />
          </div>
          <div className="modalText__startgame">
                <p>
                  What do you think about the market value of these players? Get
                  your 20$ reward by giving 6 correct answers out of 10 from
                  this challenge.
                </p>
              </div>

              <button
                className="start__game__btn"
                onClick={() => setModalText(false)}
              >
                Start Game
              </button>
           </div>   
      
          <div className={`modalGame__content ${modalText || modal1  ? 'modalGame__content2' : ''}`}>
            <div
              className="modalGame__closeBtn"
              onClick={() => setOpenModal(false)}
            >
              <GrFormClose />
            </div>
            <div className="modalGame__inner">
              <form className="modalGame__inner__form">
                <h5 className="modalGame__inner__form__tittle">
                  Register Quiz
                </h5>
                <div className="modalGame__inner__form__inner">
                  <div className={`modalGame__inner__form__inner__left`}>
                    <div className="modalGame__inner__form__inner__left__inner ">
                      <div className="modalGame__inner__form__inner__left__inner__playerImage">
                      <img
                      className={`${show1 ? '' : ''}`}
                          src={`${imageURL}/assets/img/marketplace/player/${items1?.id}.png`}
                          alt="player"
                        />
                      </div>
                      <div className="modalGame__inner__form__inner__left__inner__box">
                        <div className="modalGame__inner__form__inner__left__inner__box__flag">
                          <img
                            src={`${imageURL}/assets/img/marketplace/flag/${Flag(
                              items1?.nationalityId1
                            )}.png`}
                            alt=""
                          />
                        </div>
                        <div className="modalGame__inner__form__inner__left__inner__box__content">
                          <h3 className="modalGame__inner__form__inner__left__inner__box__content__title">
                            {`Name: ${items1?.fullName} + ${items1?.id}`}
                          </h3>
                          <div className="modalGame__inner__form__inner__left__inner__box__content__text">
                            <h3 className="modalGame__inner__form__marketvalue">
                              Market Vlaue:
                            </h3>
                            <div className="modalGame__inner__form__marketvalue__icon">
                              <span>€</span>
                            </div>
                            <p className="modalGame__inner__form__marketvalue__icon__value">
                              {items1?.quizMarketValue} M
                            </p>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className="app__versus__bar"></div>
                  <div className="modalGame__inner__form__inner__right">
                    <div className={`modalGame__inner__form__inner__left__inner`}>
                      <div className="modalGame__inner__form__inner__left__inner__item__box">
                        <div
                          className={`modalGame__inner__form__inner__left__inner__playerImage`}
                        >
                          <img
                          className={`${show1 ? 'animateImage' : ''}`}
                            src={`${imageURL}/assets/img/marketplace/player/${items2?.id}.png`}
                            alt="player"
                          />
              
                        </div>
                      </div>
                      <div className="modalGame__inner__form__inner__right__inner__box">
                        <div className="modalGame__inner__form__inner__left__inner__box__flag">
                          <img
                            src={`${imageURL}/assets/img/marketplace/flag/${Flag(
                              items2?.nationalityId1
                            )}.png`}
                            alt=""
                          />
                        </div>
                        <div className="modalGame__inner__form__inner__left__inner__box__content">
                          <p className="modalGame__inner__form__inner__left__inner__box__content__text">
                            Does
                            <b>
                              {items2?.fullName} + {items2?.id}
                            </b>
                            have a<p className="text_red">HIGHER</p>
                            or
                            <p className="text__green">Lower</p>
                            market value than
                            <b>{items1?.fullName} ?</b>
                          </p>
                        </div>
                      </div>
                      <div className="modalGame__inner__form__inner__right__inner__btn">
                        <div
                          className="modalGame__inner__form__inner__right__inner__btn__green"
                          onClick={() => toggleSlide("up")}
                        >
                          <BsArrowUp />
                          <p>View all Creators</p>
                        </div>
                        <div
                          className="modalGame__inner__form__inner__right__inner__btn__red"
                          onClick={() => toggleSlide("down")}
                        >
                          <BsArrowDown />
                          <p>View all Creators</p>
                        </div>
                      </div>
                    </div>
                    <div className={`${toggleQuestionTrue ? 'right__ovrelay__true':'right__ovrelay__true2'}`}>
                            <span>
                                <IoMdCheckmark />
                            </span>
                    </div>
                    <div className={`${toggleQuestionFalse ? 'right__ovrelay__false':'right__ovrelay__false2'}`}>
                      <span>
                        <MdClose  />
                      </span>
                    </div>
                  </div>
                </div>
                <div className="modalgame__point">
                  <span className={`${dataStep[1]?.quiz} `}>1</span>
                  <span className={`${dataStep[2]?.quiz} `}>2</span>
                  <span className={`${dataStep[3]?.quiz} `}>3</span>
                  <span className={`${dataStep[4]?.quiz} `}>4</span>
                  <span className={`${dataStep[5]?.quiz} `}>5</span>
                  <span className={`${dataStep[6]?.quiz} `}>6</span>
                  <span className={`${dataStep[7]?.quiz} `}>7</span>
                  <span className={`${dataStep[8]?.quiz} `}>8</span>
                  <span className={`${dataStep[9]?.quiz} `}>9</span>
                  <span className={`${dataStep[10]?.quiz} `}>10</span>
                </div>
                <div className="modalgame__modalbox">
                  <div className="modalgame__modalbox__item">
                    <h5 className="modalgame__textleft">Gift Low: 20 $</h5>
                  </div>
                  <div className="modalgame__modalbox__item">
                    <h5 className="modalgame__textright">Gift High: 50 $</h5>
                  </div>
                </div>
              </form>
            </div>
          </div>
    </div>
  );
}
