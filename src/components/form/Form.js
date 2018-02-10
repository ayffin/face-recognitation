import React from "react";
import "./Form.css"

const Form = ({onInputChanges,onSubmit}) => {
  return(
    <div>
        <p className ="f3 ma3">
          {'This magic brain will detect faces in your pictures'}
        </p>
        <div className = "center ma3">
          <div className ='shadow-5 pa4 br3 form'>
            <input type ="text"
              className = "w-70 pa2 f4 center"
              onChange ={onInputChanges}
            />
            <button
              className ='w-30 f4 grow pa2 ph3 pv2 white bg-light-red dib'
              onClick = {onSubmit}
              >Detect</button>
          </div>
        </div>
  </div>
  )
}
export default Form;
