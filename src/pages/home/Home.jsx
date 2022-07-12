import React, { useEffect, useState } from "react";
import HomeBanner from "../../components/home/Banner";
import TopPlayers from "../../components/home/TopPlayers";
import UiSlider from "../../components/uiSlider/UiSlider";
import Data from "../../components/data/Data";
import Flag from "../../components/flag/main";
import ModalGame from "../../components/home/ModalGame";
import { useSelector } from "react-redux";
import Loading from "../../components/loading/Loading";
import api from "../../api/api";
import './../../assets/css/home/home.css'
export default function Home() {
  const {user}=useSelector(state=>state.login)
  const [openModal,setOpenModal]=useState(false)
  const [loading,setloading]=useState(false)
  const [DataTopPlayer, setDataTopPlayer] = useState([]);
  const [DataTopPlayer2, setDataTopPlayer2] = useState([]);
  const [datas,setDatas]=useState([])
  const [datas2,setDatas2]=useState([])
  const playgame=JSON.parse(localStorage.getItem('walletconnect'))
  useEffect(()=>{
    if(user?.completeRegisterV1===false){
      setOpenModal(true)
    }else if(user?.completeRegisterV1===true){
      setOpenModal(false)
    }
  },[user])

  const fetchData=async()=>{
     setloading(true)
     await api.get(`api/Layoutplace/player/1`).then(res=>{
      console.log(res.data);
      setDatas(res.data)
      setloading(false)
    })
    await api.get(`api/Layoutplace/player/2`).then(res=>{
      console.log(res.data);
      setDatas2(res.data)
    })
  }
  const newdata=datas.forEach(data=>{
    DataTopPlayer.push(data.Record)
  })
  const newdata2=datas2.forEach(data=>{
    DataTopPlayer2.push(data.Record)
  })
  useEffect(()=>{
    fetchData()
  },[])
  if (loading) return <Loading />;



  return (
    <div className="Home">
      {/* {alert(DataTopPlayer)} */}
      <HomeBanner setOpenModal={setOpenModal}/>

      <UiSlider>
        <React.Fragment>
          {DataTopPlayer.map((item) => (
            <TopPlayers
              id={item.Id}
              fullName={item.FullName}
              age={item.Age}
              nationalityId1={Flag(item.NationalityId1)}
              nationalityId2={!Flag(item.NationalityId2) ? null : ""}
              styleId={item.StyleId}
              leagueId={item.LeagueId}
              themeId={item.ThemeId}
              position={item.Position}
              locked={item.Locked}
              price={item.Price}
            />
          ))}
        </React.Fragment>
      </UiSlider>
      <h1 className="newSlider__header">New Collections Unlocked</h1>
      <div className="slider__newCollection">
      <UiSlider>
        <React.Fragment>
          {DataTopPlayer2.map((item) => (
            <TopPlayers
              id={item.Id}
              fullName={item.FullName}
              age={item.Age}
              nationalityId1={Flag(item.NationalityId1)}
              nationalityId2={!Flag(item.NationalityId2) ? null : ""}
              styleId={item.StyleId}
              leagueId={item.LeagueId}
              themeId={item.ThemeId}
              position={item.Position}
              locked={item.Locked}
              price={item.Price}
            />
          ))}
        </React.Fragment>
      </UiSlider>
      </div>
      {openModal && playgame && <ModalGame setOpenModal={setOpenModal} />}
    </div>
  );
}
