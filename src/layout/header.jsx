import { Link } from "react-router-dom";
import header from "../style/layout/Header.module.scss"; //JSON
import Logo from "../resource/SVG/Logo";
import {
  AiOutlineSearch,
  AiOutlineUser,
  AiOutlineSetting,
  AiOutlineLogout,
  AiOutlineQuestionCircle,
} from "react-icons/ai";
import {MdForum} from 'react-icons/md';
import { useState } from "react";


function Header(props) {
  const [open, set] = useState(false);
  const user = props.user;

  return (
    <div className={header.header}>
      <Link to={"/"} className={header.logo}>
        <Logo />
        <div className={header.logoName}>ISP</div>
      </Link>
      <div className={header.searchbar}>
        <AiOutlineSearch />
        <input type="text" placeholder="username" />
      </div>
      <Link to="/topics" className={header.forum} title='Topics'>
        <MdForum/>
      </Link>
      {user.image ? (
        <div className={header.avatar}>
          <img src={user.image} alt="" onClick={() => set(!open)} />
          {open ? (
            <div className={header.panel} onClick={() => set(!open)}>
              <Link to={'/profile/me'} className={`${header.name} ${header.row}`}>
                <AiOutlineUser />
                {user.name}
              </Link>

              <Link to='/setting' className={header.row}>
                <AiOutlineSetting />
                Setting
              </Link>
              <Link to='/F&Q' className={header.row}>
                <AiOutlineQuestionCircle />
                F&Q
              </Link>
              <Link to='/login' className={`${header.logout} ${header.row}`}>
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
