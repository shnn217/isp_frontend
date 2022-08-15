import { Link, useNavigate, useLocation } from "react-router-dom";
import header from "../style/layout/Header.module.scss"; //JSON
import Logo from "../resource/SVG/Logo";
import {
  AiOutlineSearch,
  AiOutlineUser,
  AiOutlineSetting,
  AiOutlineLogout,
  AiOutlineQuestionCircle,
  AiFillBell,
} from "react-icons/ai";
import { MdForum } from "react-icons/md";
import { useState } from "react";

function Header(props) {
  const [open, set] = useState('');
  const user = props.user;
  let location = useLocation();
  let navigate = useNavigate();

  function search(e) {
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
      <Link
        to="/topics"
        className={`${header.headerBtn} ${
          location.pathname.toLowerCase().includes("topics")
            ? header.select
            : null
        }`}
        title="Topics"
      >
        <MdForum />
      </Link>
      <div
        title="Notification"
        className={`${header.headerBtn} ${
        open
            ? header.select
            : null
        } ${header.noti}`}
      >
        <AiFillBell />
      </div>
      {user.image ? (
        <div className={header.avatar}>
          <img src={user.image} alt="" onClick={() => set(open==='avatar'?'':'avatar')} />
          {open==='avatar' ? (
            <div className={header.panel} onClick={() => set('avatar')}>
              <Link
                to={"/profile/me"}
                className={`${header.name} ${header.row}`}
              >
                <AiOutlineUser />
                {user.name}
              </Link>

              <Link to="/setting" className={header.row}>
                <AiOutlineSetting />
                Setting
              </Link>
              <Link to="/FAQ" className={header.row}>
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
          {user.name.length > 1 ? `Hi, ${user.name}` : "Q&A"}
        </div>
      )}
    </div>
  );
}

export default Header;
