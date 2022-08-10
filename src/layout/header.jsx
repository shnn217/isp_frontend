import { Link, useNavigate } from "react-router-dom";
import header from "../style/layout/Header.module.scss"; //JSON
import Logo from "../resource/SVG/Logo";
import {
  AiOutlineSearch,
  AiOutlineUser,
  AiOutlineSetting,
  AiOutlineLogout,
  AiOutlineQuestionCircle,
} from "react-icons/ai";
import { MdForum } from "react-icons/md";
import { useState } from "react";
import BlankUser from "../resource/image/blank-profile-picture.png";

function Header(props) {
  const [open, set] = useState(false);
  const user = props.user;
  let navigate = useNavigate();

  function search (e){
    e.preventDefault();
    // console.log(e.target.search.value)
    navigate(`/profile/search?name=${e.target.search.value}`);
  }

  return (
    <div className={header.header}>
      <Link to={"/"} className={header.logo}>
        <Logo />
        <div className={header.logoName}>ISP</div>
      </Link>
      <form className={header.searchbar} onSubmit={search}>
        <AiOutlineSearch />
        <input type="text" name="search" placeholder="username" />
      </form>
      <Link to="/topics" className={header.forum} title="Topics">
        <MdForum />
      </Link>
      {user.first_name ? (
        <div className={header.avatar}>
          <img src={user.profile_img?user.profile_img:BlankUser} alt="user" onClick={() => set(!open)} />
          {open ? (
            <div className={header.panel} onClick={() => set(!open)}>
              <Link
                to={"/profile/me"}
                className={`${header.name} ${header.row}`}
              >
                <AiOutlineUser />
                {user.first_name} {user.last_name}
              </Link>

              <Link to="/setting" className={header.row}>
                <AiOutlineSetting />
                Setting
              </Link>
              <Link to="/F&Q" className={header.row}>
                <AiOutlineQuestionCircle />
                F&Q
              </Link>
              <Link to="/login" className={`${header.logout} ${header.row}`}>
                <AiOutlineLogout />
                Logout
              </Link>
            </div>
          ) : null}
        </div>
      ) : (
        <div className={header.QA}>
          
        </div>
      )}
    </div>
  );
}

export default Header;
