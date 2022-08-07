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

export default function POST({ p }) {
  const [like, setLike] = useState(false);
  const [open,set]= useState(false)
  const User = JSON.parse(localStorage.getItem('User'))
  const [comment,setComment] = useState([
    {
      user: {
        name: "Wang",
        image:
          "https://i.pinimg.com/564x/3f/86/fc/3f86fcc2b0b2dd0fb0e90d6590abaf19.jpg",
        jobtitle: "UI/UX",
      },
      id: "120030221qew12",
     
      captions: "what a car..",
    },
    {
      user: {
        name: "Alex King",
        image:
          "https://i.pinimg.com/736x/59/b8/83/59b8831a4fa6bea47c9c75a5aa5381ef.jpg",
        jobtitle: "Sales",
      },
      id: "12a1200313022fqrq12",
    
      captions: "...",
    },
    {
      user: {
        name: "Valarie ",
        image:
          "https://i.pinimg.com/564x/99/9f/2c/999f2c3b5126ed4e23cfcd9dc360dac8.jpg",
        jobtitle: "Head Hunter",
      },
     
      captions: "can I have a ride?",
      id: "120we203022-qe12grdhu-qwe12",
    },
    {
      user: {
        name: "Amy",
        image:
          "https://i.pinimg.com/564x/05/49/96/05499652752bc2e3137f860c9164fbd9.jpg",
        jobtitle: "Designer",
      },
      id: "12a1200313022fqrq12",
      
      captions: "!?",
    },
  ])
  const [text,setText] =useState('')


  function addcomment (e) {
    e.preventDefault()
    setComment([{
      user:{
        name:User.name,
        image:User.image,
        jobtitle:User.jobtitle,
      },
      captions:text
    },...comment])
    setText('')
  }

  return (
    <div className={post.post} key={`post_${p.id}`}>
      <div className={post.user}>
        <Link to={`/profile/${p.id}?name=${p.user.name}&image=${p.user.image}`}><img src={p.user.image} alt="" /></Link>
        <div className={post.userinfo}>
          <div className={post.name}>
            {p.user.name}
            <IoEarth />
          </div>
          <div className={post.jobtitle}>{p.user.jobtitle}</div>
        </div>
      </div>
      {p.captions ? <div className={post.content}>{p.captions}</div> : null}
      {p.image ? (
        <div className={post.image}>
          <img src={p.image} alt="" />
        </div>
      ) : null}
      <div className={post.howmany}>
        <div className={post.likeNum}>
          <FcLike />
          {p.num_like}
        </div>
        <div className={post.right}></div>
      </div>
      <div className={post.toolbar}>
        <div className={post.block} onClick={() => setLike(!like)}>
          {like ? <FcLike /> : <FcLikePlaceholder />}Like
        </div>
        <div className={`${post.block} ${open?post.blockOpen:''}`} onClick={() =>set(!open)}>
          <FaRegCommentAlt />
          Comment
        </div>
        <div className={post.block}>
          <FcShare />
          Share
        </div>
      </div>
      <div className={`${post.commentCon}  ${open?"":post.close}`}>
         <AddComment text={text} setText={setText} addcomment={addcomment}/>
        {comment.map((c)=>(
          <Comment c={c}/>
        ))}
        

      </div>
    </div>
  );
}
export function AddComment ({text,setText,addcomment}) {
   const User = JSON.parse(localStorage.getItem('User'))
   return (
      <div className={post.createComment}>
      <img src={User.image} alt="" />
      <form className={post.input} onSubmit={addcomment}>
        <input type="text" value={text} onChange={(e)=>{setText(e.target.value)}}  placeholder={'Leave something...'} />
      </form>
      
    </div>
   )
}
export function Comment ({c}) {
   return (
      <div className={`${post.comment}`} >
      <div className={post.avatar}>
        <img src={c.user.image} alt={c.user.name} />
      </div>
      <div className={post.content}>
        <div className={post.commentTitle}>{c.user.name}</div>
        <div className={post.captions}>{c.captions}</div>
      </div>
    </div>
   )
}