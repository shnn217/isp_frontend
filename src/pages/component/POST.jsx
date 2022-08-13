import { Link, useLocation } from "react-router-dom";
import { useState } from "react";
import post from "../../style/component/Post.module.scss";
import { IoEarth } from "react-icons/io5";
import { FaPlus, FaRegCommentAlt } from "react-icons/fa";
import {
  FcLike,
  FcImageFile,
  FcLikePlaceholder,
  FcShare,
} from "react-icons/fc";
import {
  createLikePostApi,
  getUserLikeStatusApi,
} from "../../api/followLikeSuggestApi";
import { getPostDetailApi } from "../../api/postsApi";
import { useEffect } from "react";
import {
  createPostCommentApi,
  getPostCommentListApi,
} from "../../api/commentApi";

export default function POST({ p }) {
  const [like, setLike] = useState(false);
  const [open, set] = useState(false);
  const User = JSON.parse(localStorage.getItem("User"));
  const [comment, setComment] = useState([]);
  const [text, setText] = useState("");
  const [data, setData] = useState({ ...p });

  useEffect(() => {
    getUserLikeStatusApi(data.id).then((res) => {
      if (res.data) {
        setLike(res.data);
      }
    });
  }, []);

  useEffect(() => {
    if (open) {
      getPostCommentListApi(data.id).then((res) => {
        console.log(res.data);
        setComment(res.data);
      });
    }
  }, [open]);

  function submitLike() {
    createLikePostApi(data).then(() => {
      setLike(!like);
      getPostDetailApi(data.id).then((res) => {
        setData(res.data);
      });
    });
  }

  function addcomment(e) {
    e.preventDefault();
    createPostCommentApi(data, text)
      .then((res) => {
        console.log(res.data);
        setComment([
          { user: res.data.user, captions: res.data.comment },
          ...comment,
        ]);
      })
      .then(() => {
        getPostCommentListApi(data.id).then((respond) => {
          setComment(respond.data);
        });
      });
    // setComment([{
    //   user:{
    //     name:User.first_name,
    //     image:User.profile_img,
    //     jobtitle:User.title,
    //   },
    //   captions:text
    // },...comment])
    setText("");
  }

  return (
    <div className={post.post} key={`post_${p.id}`} id={p.id}>
      <div className={post.user}>
        <Link to={`/profile/${p.user.id}`}>
          <img
            src={
              data.user.profile_img !== "empty"
                ? data.user.profile_img
                : "https://i.pinimg.com/564x/e3/60/93/e3609311123e13852ee148788d955acb.jpg"
            }
            alt={data.user.first_name}
          />
        </Link>
        <div className={post.userinfo}>
          <div className={post.name}>
            {data.user.first_name} {data.user.last_name}
            <IoEarth />
          </div>
          <div className={post.jobtitle}>{data.user.title}</div>
        </div>
      </div>
      {p.caption ? <div className={post.content}>{data.caption}</div> : null}
      {p.image ? (
        <div className={post.image}>
          <img src={data.image} alt="" />
        </div>
      ) : null}
      <div className={post.howmany}>
        <div className={post.likeNum}>
          <FcLike />
          {data.num_likes}
        </div>
        <div className={post.right}></div>
      </div>
      <div className={post.toolbar}>
        <div className={post.block} onClick={() => submitLike()}>
          {like ? <FcLike /> : <FcLikePlaceholder />}Like
        </div>
        <div
          className={`${post.block} ${open ? post.blockOpen : ""}`}
          onClick={() => set(!open)}
        >
          <FaRegCommentAlt />
          Comment
        </div>
        <div className={post.block}>
          <FcShare />
          Share
        </div>
      </div>
      <div className={`${post.commentCon}  ${open ? "" : post.close}`}>
        <AddComment text={text} setText={setText} addcomment={addcomment} />
        {comment.map((c) => (
          <Comment c={c} />
        ))}
      </div>
    </div>
  );
}
export function AddComment({ text, setText, addcomment }) {
  const User = JSON.parse(localStorage.getItem("User"));
  return (
    <div className={post.createComment}>
      <img src={User.profile_img} alt="" />
      <form className={post.input} onSubmit={addcomment}>
        <input
          type="text"
          value={text}
          onChange={(e) => {
            setText(e.target.value);
          }}
          placeholder={"Leave something..."}
        />
      </form>
    </div>
  );
}
export function Comment({ c }) {
  return (
    <div className={`${post.comment}`}>
      <div className={post.avatar}>
        <img src={c.user.profile_img} alt={c.user.first_name} />
      </div>
      <div className={post.content}>
        <div className={post.commentTitle}>
          {c.user.first_name} {c.user.last_name}
        </div>
        <div className={post.captions}>{c.comment}</div>
      </div>
    </div>
  );
}
