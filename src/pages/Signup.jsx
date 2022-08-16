import classes from "../style/pages/Login.module.scss";
import Image from "../resource/image/ISPlogin.png";
import { useState } from "react";
import Logo from "../resource/SVG/Logo";
import { useLocation, useNavigate, Link, renderMatches } from "react-router-dom";
import signupApi from "../api/signupApi";
import loginApi, { profileInfoApi } from "../api/loginApi";
import {loginFlow} from "./Login"; 



function Signup({ user, setUser,modal,setModal }) {
  const User = localStorage.getItem("Remeberme");
  const [show, setShow] = useState(false);
  const [remeber, setRe] = useState(User ? true : false);
  const navigate = useNavigate();
  const [data, set] = useState(
    User !== null ? JSON.parse(User) : { username: "", password: "" }
  ); 


  function handle(e) {
    let name = e.target.name;
    set({ ...data, [name]: e.target.value });
  }

  

  function submit(e) {
    signupApi(data)
    .then((res) => {
      console.log(res)
      setModal({
        open:true,
        title:"Congrats!!!",
        text:res.data['res'],
        todo:()=>{loginFlow(data, setUser, navigate)}
    })
  })
    .catch((error) => {
      setModal({
        open:true,
        title:"Something went wrong!!!",
        text:error.response.data['res']
      })
    });
  
}
  
  
  


  return (
    <div className={`${classes.container} `}>
      <div
        className={"row d-flex h-100 align-items-center justify-content-center"}
      >
        {/* <img src={Image} alt="ISPlogin" className={classes.background} /> */}
        <div
          className={`${classes.panel} d-flex flex-column align-items-center col-xs-12 col-md-6 col-lg-5 col-xl-4`}
        >
          <div
            className={`${classes.title}`}
            onClick={() => {
              set({ username: "shnn217", password: "password" });
            }}
          >
            <Logo style={{ marginRight: "-5px" }} color={'#365E9D'}/><i>ISP</i>
            {/* Sign In */}
          </div>
          <div className={`${classes.input} `}>
            <input
              placeholder="User Name"
              type={"text"}
              className={` form-control `}
              name="username"
              id="username"
              value={data.username}
              onChange={handle}
            />
          </div>
          <div className={`${classes.input} `}>
            <input
              placeholder="Email"
              type={"text"}
              className={` form-control `}
              name="email"
              id="email"
              value={data.email}
              onChange={handle}
            />
          </div>
          <div className={`${classes.input} `}>
            <input
              placeholder="Password"
              type={show ? "text" : "password"}
              className={` form-control `}
              name="password"
              id="password"
              value={data.password}
              onChange={handle}
            />
          </div>
          <div className={`${classes.input} `}>
            <input
              placeholder="Confirm Password"
              type={show ? "text" : "password"}
              className={` form-control `}
              name="password2"
              id="password2"
              value={data.password2}
              onChange={handle}
            />
          </div>
          
          <div className={`${classes.btn} ${classes.signup}`}>
            <button className="btn btn-danger w-100" onClick={submit}>
             Sign up
            </button>{" "}
          </div>
            <Link to="/login" className={`${classes.toolbar} ${classes.back}`}>Already have your own account?</Link>
        </div>
      </div>

      <div className={classes.footer}>
        © 2022 Eric Lin , All Rights Reserved.
      </div>
    </div>
  );
}

export default Signup;
