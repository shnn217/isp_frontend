import { Link, useLocation, useNavigate } from "react-router-dom";
import { useState } from "react";
import cla from "../style/pages/Profile.module.scss";
import classes from "../style/pages/Home.module.scss";
import { Profile } from "./Home";
import POST from "./component/POST";
import { useEffect } from "react";
import { createFollowCountApi, getUserSearchApi } from "../api/followLikeSuggestApi";

function Homepage({ user }) {
  const navigate = useNavigate();
  const location = useLocation();
  const [profile, set] = useState({
    university: "University of Birmingham",
    major: "MSc Computer Science",
    email: "ericlin1234@gmail.com",
    brithday: "1991-02-17",
    phone: "(+44) 0739458371639",
    company: "Uk city bank Inc.",
    jobtitle: "App designer engineer",

    location: "London, West Midlands",
    image:
      "https://i.pinimg.com/564x/e3/60/93/e3609311123e13852ee148788d955acb.jpg",
  });
  const [users, setUsers] = useState([]);
  const User = JSON.parse(localStorage.getItem('User'))

  console.log(decodeURI(location.search.split('&')[0].replace('?name=','')))
  
  useEffect(()=>{
    getUserSearchApi(decodeURI(location.search.split('&')[0].replace('?name=',''))).then((res)=>{
      console.log(res.data)
      setUsers(res.data)
    })
  },[])

  // function follow() {
  //   createFollowCountApi(User, users).then((res)=>{
      
  //   })
  // }

  const text = location.search.split("=")[1].toLowerCase();
  function go(id) {
    navigate("/profile/" + id);
  }
  return (
    <div className={classes.container}>
      <div className={classes.content}>
        <div className={classes.con}>
          <div className={classes.left}>
            {/* <Profile user={user} profile={profile} /> */}
            {/* <Savequestions questions={questions} /> */}
          </div>
          <div className={classes.modal}>
            <div className={cla.results}>
              {users.filter(
                (f) =>
                  f.first_name.toLowerCase().includes(text) ||
                  f.last_name.toLowerCase().includes(text)
              ).length > 0 ? (
                users.filter(
                    (f) =>
                      f.first_name.toLowerCase().includes(text) ||
                      f.last_name.toLowerCase().includes(text)
                  )
                  .map((user) => (
                    <div className={cla.result}>
                      <div className={cla.avatar} onClick={() => go(user.user)}>
                        <img
                          onClick={() => go(user.user)}
                          src={user.profile_img != "empty" ? user.profile_img : "https://i.pinimg.com/564x/e3/60/93/e3609311123e13852ee148788d955acb.jpg"}
                          alt={user.first_name}
                        />
                      </div>
                      <div className={cla.info}>
                        <div className={cla.title}>
                          <div className={cla.name} onClick={() => go(user.user)}>
                            {user.first_name} {user.last_name}
                          </div>
                          <div className={cla.jobtitle}>{user.title}</div>
                        </div>

                        <div className={cla.bio}>{user.bio}</div>
                      </div>
                      <div className={`${cla.follow} custom-btn`} >Follow</div>
                    </div>
                  ))
              ) : (
                <div className={cla.noR}>NO RESULT...</div>
              )}
            </div>
          </div>
          <div className={classes.right}>{/* <Recommendation /> */}</div>
        </div>
      </div>
    </div>
  );
}

export default Homepage;
