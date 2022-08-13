import { Link, useLocation, useParams } from "react-router-dom";
import { useState, useEffect } from "react";
import topics from "../../style/pages/Topics.module.scss";
import { AiOutlineLeft } from "react-icons/ai";
import { Comment, AddComment } from "./POST";
import {
  createQuestionCommentApi,
  getQuestionCommentListApi,
} from "../../api/commentApi";
import { getQuestionDetailApi } from "../../api/questionsApi";
export default function TopicsList() {
  const params = useParams();
  let id = params.tid;
  const [question, setQ] = useState({
    user: {
      first_name: "",
      last_name: "",
      id: "",
      profile_img: "",
    },
    content: "",
    category: "",
    id: "",
    title: "",
  });

  useEffect(() => {
    getQuestionDetailApi(id).then((res) => {
      setQ(res.data);
    });
  }, []);

  return (
    <div className={topics.container}>
      <div className={topics.content}>
        <Topic topic={question} setTopic={setQ} questionId={id}/>
      </div>
    </div>
  );
}

export function Topic({ topic, setTopic, questionId }) {
  const [open, setOpen] = useState(true);
  const [comment, setComment] = useState([]);
  const [text, setText] = useState("");
  const User = JSON.parse(localStorage.getItem("User"));
  
  

  useEffect(() => {
    if(questionId){
      getQuestionCommentListApi(questionId).then((res) => {
        console.log(res.data);
        setComment(res.data);
      });
    }
    
  }, []);

  function addcomment(e) {
    e.preventDefault();
    createQuestionCommentApi(topic, text)
      .then((res) => {
        console.log(res.data);
        setComment([
          { user: res.data.user, captions: res.data.comment },
          ...comment,
        ]);
      })
      .then(() => {
        getQuestionCommentListApi(topic.id).then((respond) => {
          console.log(respond);
          setComment(respond.data);
        });
      });
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
            topic.user.id
          }
          className={topics.author}
        >
          <div className={topics.avatar}>
            <img src={topic.user.profile_img} alt={topic.user.first_name} />
          </div>
          {topic.user.first_name} {topic.user.last_name}
        </Link>
        {topic.content}
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
