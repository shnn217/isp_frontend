import { Link, useLocation ,Outlet} from "react-router-dom";
import { useState, useEffect } from "react";
import classes from "../style/pages/Home.module.scss";
import {
  Profile,
  POST,
  Recommendation,
  Savequestions,
  CreatePost,
  DepRecommendation,
} from "./Home";
import topics from "../style/pages/Topics.module.scss";
import { AiOutlineQuestionCircle, AiFillCaretDown } from "react-icons/ai";

function Topicspage({ user }) {
  let location = useLocation();
  const ProfilePage =
    !location.pathname.includes("me") && location.pathname.includes("profile");
  const [profile, set] = useState(
    ProfilePage
      ? {
          name: location.search
            ? decodeURI(location.search.split("&")[0].replace("?name=", ""))
            : "Allen Won",
          university: "University of Birmingham",
          major: "MSc Computer Science",
          email: "ALLENs234@gmail.com",
          brithday: "03/21/1991",
          phone: "(+44) 0731314371639",
          company: "Uk city bank Inc.",
          jobtitle: "Designer ",
          location: "London, West Midlands",
          image: location.search
            ? location.search.split("&")[1].replace("image=", "")
            : "https://i.pinimg.com/564x/99/0b/14/990b1498c2da7fca661b81187f099890.jpg",
        }
      : user
  );

  return (
    <div className={classes.container}>
      <div className={classes.content}>
        <div className={classes.con}>
          <div className={classes.left}>
            <Profile user={user} profile={profile} />
          </div>
          <div className={classes.modal}>
            <Outlet/>
          </div>
          <div className={classes.right}>
            <Recommendation />
            <DepRecommendation />
          </div>
        </div>
      </div>
    </div>
  );
}

export default Topicspage;
