import classes from "../style/pages/Login.module.scss";
import Image from "../resource/image/ISPlogin.png";
import { useState } from "react";
import Logo from "../resource/SVG/Logo";
function Login() {
  const User = localStorage.getItem("Remeberme");
  const [show, setShow] = useState(false);
  const [remeber, setRe] = useState(User?true:false);
  const [data, set] = useState(
    User!==null ? JSON.parse(User) : { username: "", password: "" }
  );


  function handle(e) {
    let name = e.target.name;
    set({ ...data, [name]: e.target.value });
  }

  function submit() {
    console.log(data);
    if (remeber) {
      localStorage.setItem("Remeberme", JSON.stringify(data));
    }else{
      localStorage.removeItem("Remeberme");
    }
  }

  return (
    <div
      className={`${classes.container} row d-flex align-items-center justify-content-center`}
    >
      <img src={Image} alt="ISPlogin" className={classes.background} />
      <div
        className={`${classes.panel} d-flex flex-column align-items-center col-xs-12 col-md-6 col-lg-5 col-xl-4`}
      >
        <div className={`${classes.title}`}>
          {/* <Logo color={'#365E9D'}/>ISP */}
          Sign In
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
            className={`${classes.remeber} ${remeber ? classes.rem : ""}`}
            onClick={() => {
              setRe(!remeber);
            }}
          ></div>{" "}
          Remeber me
        </div>
        <div className={classes.btn}>
          <button className="btn btn-primary" onClick={submit}>
            SignIn
          </button>{" "}
        </div>
        <div className={classes.div}></div>
        <div className={classes.btn}>
          <button className="btn btn-primary">LinkedIn</button>{" "}
        </div>
        <div className={`${classes.btn} ${classes.signup}`}>
          <button className="btn btn-danger">Sign Up</button>{" "}
        </div>
      </div>
    </div>
  );
}

export default Login;
