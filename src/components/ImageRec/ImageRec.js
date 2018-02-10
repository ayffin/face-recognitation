import React from "react";
import "./ImageRec.css"

const ImageRec = ({imageUrl, box}) => {
  return(
    <div className = "center">
        <div className = "absolute ma3">
          <img id= "image" src ={imageUrl} alt= 'face' width ="500px" height ="auto"/>
            {
              box.map(box => {
                return(
                  <div className = "bounding_box"
                        style = {{top: box.top, right: box.right, left: box.left, bottom: box.bottom}}>
                  </div>
                )
              })
            }
        </div>
      </div>
  )
}
export default ImageRec;
