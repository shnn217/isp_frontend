import classes from "../style/pages/Login.module.scss";
import Image from "../resource/image/ISPlogin.png";
import { useState } from "react";
import Logo from "../resource/SVG/Logo";
import { useLocation, useNavigate, Link } from "react-router-dom";

function Signup({ user, setUser }) {
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
    //第一步先檢查我設計定的唯一帳密是否正確
    if (data.username === "shnn217" && data.password === "password") {
      //remeber me的功能判斷
      if (remeber) {
        localStorage.setItem("Remeberme", JSON.stringify(data));
      } else {
        localStorage.removeItem("Remeberme");
      }

      //更新登入流程:假如這人登入成功,把資訊丟進localstorage,用來判斷有沒有登入過
      //因為現在沒有token所以先這樣用
      localStorage.setItem(
        "User",
        JSON.stringify({
          name: "Eric Lin",
          image:
            "https://i.pinimg.com/564x/e3/60/93/e3609311123e13852ee148788d955acb.jpg",
        })
      );
      //把資訊也順便丟進去變數裡面
      setUser({
        name: "Eric Lin",
        image:
          "https://i.pinimg.com/564x/e3/60/93/e3609311123e13852ee148788d955acb.jpg",
      });
      //把畫面倒回首頁
      navigate("/");
    } else {
      alert("Wrong username or password");
    }
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
            <Logo color={'#365E9D'}/>ISP
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
              name="Cpassword"
              id="Cpassword"
              value={data.Cpassword}
              onChange={handle}
            />
          </div>
          
          <div className={`${classes.btn} ${classes.signup}`}>
            <button className="btn btn-danger w-100" onClick={submit}>
             Sign up
            </button>{" "}
          </div>
            <Link to="/login" className={`${classes.toolbar} ${classes.back}`}>Already have you own account?</Link>
        </div>
      </div>

      <div className={classes.footer}>
        © 2022 Eric Lin , All Rights Reserved.
      </div>
    </div>
  );
}

export default Signup;
