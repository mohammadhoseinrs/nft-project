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
export default function Home() {
  const {user}=useSelector(state=>state.login)
  const [openModal,setOpenModal]=useState(false)
  const [loading,setloading]=useState(false)
  useEffect(()=>{
    if(user?.completeRegisterV1===false){
      setOpenModal(true)
    }else if(user?.completeRegisterV1===true){
      setOpenModal(false)
    }
  },[user])
  const [DataTopPlayer, setDataTopPlayer] = useState([]);
  useEffect(()=>{
    setloading(true)
    api.get(`api/players/layout_place/1`).then(res=>{
      setDataTopPlayer(res.data)
      setloading(false)
    })
  },[])




  return (
    <div className="Home">
      {/* {alert(DataTopPlayer)} */}
      <HomeBanner setOpenModal={setOpenModal}/>

      <UiSlider>
        <React.Fragment>
          {DataTopPlayer.map((item) => (
            <TopPlayers
              id={item.id}
              fullName={item.fullName}
              age={item.age}
              nationalityId1={Flag(item.nationalityId1)}
              nationalityId2={!Flag(item.nationalityId2) ? null : ""}
              styleId={item.styleId}
              leagueId={item.leagueId}
              themeId={item.themeId}
              position={item.position}
            />
          ))}
        </React.Fragment>
      </UiSlider>
      {openModal && <ModalGame setOpenModal={setOpenModal} />}
    </div>
  );
}
