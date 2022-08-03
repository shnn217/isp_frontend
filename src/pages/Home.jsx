import {
   Link,
 } from "react-router-dom";
 import { useState } from "react";
import classes from '../style/pages/Home.module.scss'
import {FaPlus} from 'react-icons/fa'


 function Homepage ({user}) {
   const [profile,set]= useState({
      university:'University of Birmingham',
      major:'MSc Computer Science',
      email:'ericlin1234@gmail.com'
   })
   return (
      <div className={classes.container}>
        <div className={classes.content}>
         <div className={classes.con}>
            <div className={classes.left}>
               <div className={classes.avatar}>
                  <img src={user.image} alt={user.name}/>
                  <div className={`${classes.follow} custom-btn`}><FaPlus/>FOLLOW</div>
                 
               </div>
               <div className={classes.info}>
                  <div className={classes.row}>
                     <div className={classes.title}>University:</div>
                     <div className={classes.value}>{profile.university}</div>
                  </div>
                  <div className={classes.row}>
                     <div className={classes.title}>Major:</div>
                     <div className={classes.value}>{profile.major}</div>
                  </div>
                  <div className={classes.row}>
                     <div className={classes.title}>Email:</div>
                     <div className={classes.value}>{profile.email}</div>
                  </div>
               </div>
            </div>
            <div className={classes.modal}></div>
            <div className={classes.modal}></div>
         </div>
        
        </div>
      </div>
   )
 }

 export default Homepage;