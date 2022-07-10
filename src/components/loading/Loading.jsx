import * as React from "react";
import { useState, useEffect } from "react";
import { style } from "@mui/system";
import "./style.css"
import gif from './../../assets/img/loading/s-2-optimize.gif'
const Loading = () => {

  return (

    <div id="loading" className="loading-indicator"  >
      <div className="cover"></div>
      <div className="indicator">
        <div className="shadow"></div>
        <div className="bounce">
          <div className="ball">
          </div>
        </div>
      </div>
      <div className="text">R I K O F O O T B A L L
      </div>
    </div>

  )
}
export default Loading;