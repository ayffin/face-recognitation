import React from "react";
import Tilt from 'react-tilt';
import brain from "./human.png";
import "./Logo.css";

const Logo = () => {
  return(
    <div className = " ma4 mto">
      <Tilt className="Tilt br3 shadow-3 " options={{ max : 55, scale:1.2,easing: "cubic-bezier(.03,.98,.52,.99)" }} style={{ height: 120, width: 120 }} >
        <div className="Tilt-inner pa3">
          <img src ={brain} alt='logo'/>
         </div>
      </Tilt>
    </div>
  )
}
export default Logo;
