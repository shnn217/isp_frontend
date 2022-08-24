import { Link, useLocation, useParams } from "react-router-dom";
import { useState, useEffect } from "react";
import topics from "../../style/pages/Topics.module.scss";
import { AiOutlineLeft } from "react-icons/ai";
import { Comment, AddComment } from "./POST";


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

  useEffect(()=>{
    console.log('test')
  },[])

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
  const [comment, setComment] = useState([
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
  ]);
  const [text, setText] = useState("");
  const User = JSON.parse(localStorage.getItem("User"));

  function addcomment(e) {
    e.preventDefault();
    setComment([
      {
        user: {
          name: User.name,
          image: User.image,
          jobtitle: User.jobtitle,
        },
        captions: text,
      },
      ...comment,
    ]);
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
            topic.user.profile_image
          }
          className={topics.author}
        >
          <div className={topics.avatar}>
            <img src={topic.user.profile_image} alt="" />
          </div>
          {topic.user.first_name} {topic.user.last_name}
        </Link>
        {topic.captions}
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
