import React from "react";
import classes from "../style/pages/Login.module.scss";
import Image from "../resource/image/ISPlogin.png";
import { useState, useCallback } from "react";
import Logo from "../resource/SVG/Logo";
import { useLocation, useNavigate, Link } from "react-router-dom";
import loginApi ,{profileInfoApi}from "../api/loginApi";

function Login({ user, setUser }) {
  const User = localStorage.getItem("Rememberme");
  const [show, setShow] = useState(false);
  const [remember, setRe] = useState(User ? true : false);
  const navigate = useNavigate();
  const [data, set] = useState(
    User !== null ? JSON.parse(User) : { username: "", password: "" }
  );

  function handle(e) {
    let name = e.target.name;
    set({ ...data, [name]: e.target.value });
  }

  const openLinkedinPage = useCallback(() => {
    const linkedinAuthUrl = "https://www.linkedin.com/oauth/v2/authorization";
    const redirectUri = "callback";

    const params = {
      response_type: "code",
      client_id: "782f5ko8ei1qf7",
      redirect_uri: `http://localhost:8000/api/${redirectUri}`,
    };

    const urlParams = new URLSearchParams(params).toString();

    window.location = `${linkedinAuthUrl}?${urlParams}&scope=r_liteprofile%20r_emailaddress`;
  }, []);

  

  function submit(e) {
    //第一步先檢查我設計定的唯一帳密是否正確

    //remember me的功能判斷
    if (remember) {
      localStorage.setItem("Rememberme", JSON.stringify(data));
    } else {
      localStorage.removeItem("Rememberme");
    }
    loginApi(data)
      .then((res) => {
        profileInfoApi().then((respond)=>{
          console.log(respond.data,typeof(respond));
         
            localStorage.setItem(
              "User",
              JSON.stringify(respond.data)
            );
            //把資訊也順便丟進去變數裡面
            setUser({
              ...respond.data,
              
              profile_img: respond.data.profile_img!=="empty"?respond.data.profile_img:
                "https://i.pinimg.com/564x/e3/60/93/e3609311123e13852ee148788d955acb.jpg",
            });
            navigate("/setting");
          
          
        }).catch(()=>{})
        // navigate("/setting");
      })
      .catch(() => {});

    //更新登入流程:假如這人登入成功,把資訊丟進localstorage,用來判斷有沒有登入過
    //因為現在沒有token所以先這樣用
    
    //把畫面倒回首頁
    // navigate("/");
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
              set({ username: "Chung-Yi", password: "qazwsxed217" });
            }}
          >
            <Logo style={{ marginRight: "-5px" }} color={"#365E9D"} />
            <i>ISP</i>
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
              placeholder="Password"
              type={show ? "text" : "password"}
              className={` form-control `}
              name="password"
              id="password"
              value={data.password}
              onChange={handle}
            />
          </div>
          <div className={`${classes.toolbar}`}>
            <div
              className={`${classes.remember} ${remember ? classes.rem : ""}`}
              onClick={() => {
                setRe(!remember);
              }}
            ></div>{" "}
            Remember me
          </div>
          <div className={classes.btn}>
            <button className="btn btn-primary" onClick={submit}>
              SignIn
            </button>{" "}
          </div>
          <div className={classes.div}></div>
          <div className={classes.btn}>
            <button className="btn btn-primary" onClick={openLinkedinPage}>
              LinkedIn
            </button>{" "}
          </div>
          <div className={`${classes.btn} ${classes.signup}`}>
            <Link className="btn btn-danger w-100" to="/login/signup">
              Sign Up
            </Link>{" "}
          </div>
        </div>
      </div>

      <div className={classes.footer}>
        © 2022 Eric Lin , All Rights Reserved.
      </div>
    </div>
  );
}

export default Login;
