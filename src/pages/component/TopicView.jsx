import { Link, useLocation, useParams } from "react-router-dom";
import { useState, useEffect } from "react";
import topics from "../../style/pages/Topics.module.scss";
import { AiOutlineLeft } from "react-icons/ai";
import { Comment ,AddComment } from "./POST";
export default function TopicsList() {
  const params = useParams();
  const [questions, setQ] = useState([
    {
      title: "How to rent a place in stratford",
      type: "Accommodation",
      captions: `Lorem ipsum dolor sit amet consectetur adipisicing elit. Maxime mollitia,
molestiae quas vel sint commodi repudiandae consequuntur voluptatum laborum
numquam blanditiis harum quisquam eius sed odit fugiat iusto fuga praesentium
optio, eaque rerum! Provident similique accusantium nemo autem.`,
      id: "12-32",
    },
    {
      captions: `Lorem ipsum dolor sit amet consectetur adipisicing elit. Maxime mollitia,
molestiae quas vel sint commodi repudiandae consequuntur voluptatum laborum
numquam blanditiis harum quisquam eius sed odit fugiat iusto fuga praesentium
optio, eaque rerum! Provident similique accusantium nemo autem.`,
      type: "visa",
      id: "12-32gqhas32",
      title: "How to exchange international car liscence",
    },
    {
      captions: `Lorem ipsum dolor sit amet consectetur adipisicing elit. Maxime mollitia,
molestiae quas vel sint commodi repudiandae consequuntur voluptatum laborum
numquam blanditiis harum quisquam eius sed odit fugiat iusto fuga praesentium
optio, eaque rerum! Provident similique accusantium nemo autem.`,
      type: "visa",
      id: "12-3232",
      title: "How to rent a place in stratford",
    },
    {
      captions: `Lorem ipsum dolor sit amet consectetur adipisicing elit. Maxime mollitia,
molestiae quas vel sint commodi repudiandae consequuntur voluptatum laborum
numquam blanditiis harum quisquam eius sed odit fugiat iusto fuga praesentium
optio, eaque rerum! Provident similique accusantium nemo autem.`,
      type: "visa",
      id: "12-3qds232",
      title: "How to exchange international car liscence",
    },
    {
      captions: `Lorem ipsum dolor sit amet consectetur adipisicing elit. Maxime mollitia,
molestiae quas vel sint commodi repudiandae consequuntur voluptatum laborum
numquam blanditiis harum quisquam eius sed odit fugiat iusto fuga praesentium
optio, eaque rerum! Provident similique accusantium nemo autem.`,
      type: "Accommodation",
      id: "12-32asf32",
      title: "How to rent a place in stratford",
    },
    {
      captions: `Lorem ipsum dolor sit amet consectetur adipisicing elit. Maxime mollitia,
molestiae quas vel sint commodi repudiandae consequuntur voluptatum laborum
numquam blanditiis harum quisquam eius sed odit fugiat iusto fuga praesentium
optio, eaque rerum! Provident similique accusantium nemo autem.`,
      type: "visa",
      id: "12-32vadv32",
      title: "How to exchange international car liscence",
    },
    {
      captions: "12313213",
      type: "other",
      id: "12-3as232",
      title: "How to rent a place in stratford",
    },
    {
      captions: "12313213",
      type: "other",
      id: "12-323231",
      title: "How to exchange international car liscence",
    },
  ]);
  
  return (
    <div className={topics.container}>
      <div className={topics.content}>
        {questions
          .filter((p) => p.id === params.tid)
          .map((q) => (
            <Topic topic={q} />
          ))}
      </div>
    </div>
  );
}

export function Topic({ topic }) {
  const [open, setOpen] = useState(true);
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
  const User = JSON.parse(localStorage.getItem('User'))

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
    <div className={topics.topicView}>
      <div className={topics.title}>
        <Link to="/Topics">
          <AiOutlineLeft />
        </Link>
        <Link to={`/topics/${topic.id}`}>{topic.title}?</Link>
      </div>

      <div className={`${topics.captions} ${!open ? topics.open : ""}`}>
        {topic.captions}
      </div>
      <div className={`${topics.comments}`}> 
      <AddComment text={text}  setText={setText} addcomment={addcomment}/>  
      {comment.map((c)=>(<Comment c={c}/>))}
      </div>
   
    </div>
  );
}
