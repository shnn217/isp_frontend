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
import { FcLike } from "react-icons/fc";
import { RiUserFollowLine } from 'react-icons/ri'
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

  const Notification = [
    {
      user: {
        id: 123,
        name: 'Amy',
        profile_image: 'https://i.pinimg.com/564x/bd/91/c8/bd91c815ce8ffcd514c18e77acf303b6.jpg'
      },
      type: 'like',
      post_id: '1eq1023e-22-e1',
      createIime: '',
    },
    {
      user: {
        id: 33141,
        name: 'Bella',
        profile_image: 'https://i.pinimg.com/564x/bd/91/c8/bd91c815ce8ffcd514c18e77acf303b6.jpg'
      },
      type: 'follow',
      post_id: '',
      createIime: '',
    },
    {
      user: {
        id: 123,
        name: 'Arisa',
        profile_image: 'https://i.pinimg.com/736x/18/29/2c/18292c8720be10c27c3ebea43c18b926.jpg'
      },
      type: 'like',
      post_id: '1eq1023e-22-e1',
      createIime: '',
    },
  ]

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
        className={`${header.headerBtn} ${location.pathname.toLowerCase().includes("topics")
            ? header.select
            : null
          }`}
        title="Topics"
      >
        <MdForum />
      </Link>
      <div className={`${header.notiContainer} `}>
        <div
          title="Notification"
          onClick={() => {
            if (open === 'noti') {
              set(false)
            } else {
              set('noti')
            }
          }}
          className={`${header.headerBtn} ${open === 'noti'
              ? header.select
              : null
            } ${header.noti}`}
        >
          <AiFillBell />

        </div>
        <div className={`${header.notiPanel} ${open === 'noti' ? '' : header.close}`}>
          {Notification.map((noti) => (
            <Link to='#' className={header.notiblock}>
              <div className={header.notiAvatar}>
                <div className={header.rightCorner}>{noti.type === 'like' ? <FcLike /> : <RiUserFollowLine />}</div>
                <img src={noti.user.profile_image} alt="" />
              </div>
              <div className={header.notiContent}>
                {noti.type === 'like' ? `${noti.user.name} just like your post` : `${noti.user.name} just follow you`}
                <div>20 min ago</div>
              </div>
            </Link>
          ))}


        </div>
      </div>

      {user.image ? (
        <div className={header.avatar}>
          <img src={user.image} alt="" onClick={() => set(open === 'avatar' ? '' : 'avatar')} />
          {open === 'avatar' ? (
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
