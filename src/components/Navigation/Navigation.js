import React from "react";
import "./Navigation.css";

const Navigation = ({sign,isSignedIn}) => {
  if (isSignedIn){
      return (
          <nav>
            <p className = 'f3 link dim underline pa3 pointer' onClick ={() => sign("signout")}>
              {" Sign out"}
            </p>
          </nav>
      )}
    else {
      return (
            <nav>
               <p className = 'f3 link dim underline pa3 pointer' onClick ={() => sign("Signin")}>
                 {" Sign In"}
               </p>
               <p className = 'f3 link dim underline pa3 pointer' onClick ={() => sign("Register")}>
                 {" Register"}
               </p>
             </nav>
      )
    }

}
export default Navigation;
