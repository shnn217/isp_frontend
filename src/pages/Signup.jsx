import classes from "../style/pages/Login.module.scss";
import Image from "../resource/image/ISPlogin.png";
import { useState ,useEffect} from "react";
import Logo from "../resource/SVG/Logo";
import { useLocation, useNavigate, Link } from "react-router-dom";
import signupApi from "../api/signupApi";

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
  
      navigate("/login");
    })
    .catch(() => {});

      // localStorage.setItem(
      //   "User",
      //   JSON.stringify({
      //     name: "Eric Lin",
      //     image:
      //       "https://i.pinimg.com/564x/e3/60/93/e3609311123e13852ee148788d955acb.jpg",
      //   })
      // );
      // //把資訊也順便丟進去變數裡面
      // setUser({
      //   name: "Eric Lin",
      //   image:
      //     "https://i.pinimg.com/564x/e3/60/93/e3609311123e13852ee148788d955acb.jpg",
      // });
      //把畫面倒回首頁
      // navigate("/");
    }
  

  function DemoModal () {
    //故意做一個可以demo怎麼用法
    //假如你只要打開而可以就可以用這樣,以此類推：
    //setModal({...modal,open:true});

    setModal({
      open:true,
      title:"你確定要註冊嗎？",
      text:'內容有錯嗎？',
      //把原本那個submit function 在user按完確認後再使用
      todo:submit
    })
    //假如是ＡＰＩ就是這樣?
    // createAccountAPI().then((res)=>{
    //   if(res.status===200){
    //     setSthing({...res});
    //   }
    //   if(res.status>399){
    //     setModal({
    //       open:true,
    //       title:'ERROR',
    //       text:'The email has been regist already..',
    //     })
    //   }
      
    // })
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
            <button className="btn btn-danger w-100" onClick={DemoModal}>
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
