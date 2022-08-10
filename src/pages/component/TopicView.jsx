import { Link, useLocation, useParams } from "react-router-dom";
import { useState, useEffect } from "react";
import topics from "../../style/pages/Topics.module.scss";
import { AiOutlineLeft } from "react-icons/ai";
import { Comment, AddComment } from "./POST";
import { createQuestionCommentApi, getQuestionCommentListApi } from "../../api/commentApi";
export default function TopicsList() {
  const params = useParams();
  const [question, setQ] = useState({
    user: {
      first_name: "Jay",
      last_name: "Chou",
      id: "qweqwe",
      profile_image:
        "https://i.pinimg.com/564x/e9/9e/a8/e99ea84b3fd0abaa0f1ae8a963acd68b.jpg",
    },
    captions: `Lorem ipsum dolor sit amet consectetur adipisicing elit. Maxime mollitia,
molestiae quas vel sint commodi repudiandae consequuntur voluptatum laborum
numquam blanditiis harum quisquam eius sed odit fugiat iusto fuga praesentium
optio, eaque rerum! Provident similique accusantium nemo autem.`,
    type: "visa",
    id: "12-32vadv32",
    title: "How to exchange international car liscence",
  });

  return (
    <div className={topics.container}>
      <div className={topics.content}>
        <Topic topic={question} />
      </div>
    </div>
  );
}

export function Topic({ topic }) {
  const [open, setOpen] = useState(true);
  const [comment, setComment] = useState([]);
  const [text, setText] = useState("");
  const User = JSON.parse(localStorage.getItem("User"));
  const [data, setData] = useState({...topic})

  function addcomment(e) {
    e.preventDefault();
    createQuestionCommentApi(data, text).then((res)=>{
      console.log(res.data)
      setComment([{user:res.data.user,
        captions:res.data.comment},...comment])
    }).then(()=>{
      getQuestionCommentListApi(data.id).then((respond)=>{
        setComment(respond.data)
      })
    })
    // setComment([
    //   {
    //     user: {
    //       name: User.name,
    //       image: User.image,
    //       jobtitle: User.jobtitle,
    //     },
    //     captions: text,
    //   },
    //   ...comment,
    // ]);
    setText("");
  }

  return (
    <div className={topics.topicView}>
      <div className={topics.title}>
        <Link to="/Topics">
          <AiOutlineLeft />
        </Link>
        {topic.title}?
      </div>

      <div className={`${topics.captions} ${!open ? topics.open : ""}`}>
        <Link
          to={
            "/profile/" +
            topic.user.id +
            "?name=" +
            topic.user.first_name +
            "&image=" +
            topic.user.profile_img
          }
          className={topics.author}
        >
          <div className={topics.avatar}>
            <img src={topic.user.profile_image} alt="" />
          </div>
          {topic.user.first_name} {topic.user.last_name}
        </Link>
        {topic.comment}
      </div>
      <div className={`${topics.comments}`}>
        <AddComment text={text} setText={setText} addcomment={addcomment} />
        {comment.map((c) => (
          <Comment c={c} />
        ))}
      </div>
    </div>
  );
}
