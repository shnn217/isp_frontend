import {
   Link,
} from "react-router-dom";
import { useState } from "react";
import classes from '../style/pages/Home.module.scss'
import { FaPlus } from 'react-icons/fa'
import { AiFillHeart,AiOutlineUser } from 'react-icons/ai'

function Homepage({ user }) {
   const [profile, set] = useState({
      university: 'University of Birmingham',
      major: 'MSc Computer Science',
      email: 'ericlin1234@gmail.com',
      brithday: '02/17/1991',
      phone:'(+44) 0739458371639',
      company: 'Uk city bank Inc.',
      jobtitle:'App designer engineer',
      location:'London, West Midlands'
   })
   const questions = [
      {
         title: 'How to apply PSW visa'
      },
      {
         title: 'How to exchange international car liscence'
      },
      {
         title: 'How to apply PSW visa'
      },
      {
         title: 'How to exchange international car liscence'
      },
      {
         title: 'How to apply PSW visa'
      },
      {
         title: 'How to exchange international car liscence'
      },
      {
         title: 'How to apply PSW visa'
      },
      {
         title: 'How to exchange international car liscence'
      },

   ]
   return (
      <div className={classes.container}>
         <div className={classes.content}>
            <div className={classes.con}>
               <div className={classes.left}>
                  <Profile user={user} profile={profile}/>
                  <Savequestions questions={questions} />
               </div>
               <div className={classes.modal}>
                  
               </div>
               <div className={classes.right}>
                  <Recommendation />
               </div>
            </div>

         </div>
      </div>
   )
}

export default Homepage;

export function Profile ({profile,user}) {
   return (
      <div className={classes.profile}>
         <div className={classes.avatar}>
            <img src={user.image} alt={user.name} />
            <div className={`${classes.follow} custom-btn`}><FaPlus />FOLLOW</div>

         </div>
         <div className={classes.info}>
            <h3>{user.name}</h3>
            
            <div className={classes.row}>
               <div className={classes.title}>Brithday:</div>
               <div className={classes.value}>{profile.brithday}</div>
            </div>
            <div className={classes.row}>
               <div className={classes.title}>Location:</div>
               <div className={classes.value}>{profile.location}</div>
            </div>
            <div className={classes.row}>
               <div className={classes.title}>Work:</div>
               <div className={classes.value}>{profile.company} </div>
            </div>
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
   )
}

export function Savequestions({ questions }) {
   const [open, set] = useState(false)
   return (
      <div className={`${classes.smallModal} ${open ? classes.open : ""}`}>
         <h3>Recent Saved</h3>
         {questions.filter((a, index) => open ? true : index < 4).map((q, index) => (
            <div className={classes.row} key={`quse_${index}`} title={q.title}>
               <AiFillHeart />
               {q.title}
            </div>
         ))}
         <div className={classes.morebtn} onClick={() => set(!open)}>{open ? "Hide" : "More"}</div>
      </div>
   )
}

export function Recommendation() {
   const [open, set] = useState(false)
   const connection = [
      {
         name: 'Amy Wang',
         jobtitle: 'UI/UX designer'
      },
      {
         name: 'Amy Wang',
         jobtitle: 'UI/UX designer'
      },
      {
         name: 'Amy Wang',
         jobtitle: 'UI/UX designer'
      },
      {
         name: 'Amy Wang',
         jobtitle: 'UI/UX designer'
      },
      {
         name: 'Amy Wang',
         jobtitle: 'UI/UX designer'
      },
      {
         name: 'Amy Wang',
         jobtitle: 'UI/UX designer'
      },

   ]
   return (
      <div className={`${classes.smallModal} ${open ? classes.open : ""}`}>
         <h3>Social Connection</h3>
         {connection.filter((a, index) => open ? true : index < 4).map((q, index) => (
            <div className={`${classes.row} ${classes.row2}`} key={`quse_${index}`} title={q.title}>
               <AiOutlineUser size={32}/>
               <div>
                  <div>{q.name}</div>
                  <div>{q.jobtitle}</div>
               </div>

            </div>
         ))}
         <div className={classes.morebtn} onClick={() => set(!open)}>{open ? "Hide" : "More"}</div>
      </div>
   )

}