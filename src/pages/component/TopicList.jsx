import { Link, useLocation, Outlet } from "react-router-dom";
import { useState, useEffect } from "react";
import topics from "../../style/pages/Topics.module.scss";
import { AiOutlineQuestionCircle, AiFillCaretDown } from "react-icons/ai";
import { createQuestionApi, getQuestionListApi } from "../../api/questionsApi";

export default function TopicsList() {
  const [filter, setFilter] = useState({
    sele: "ALL",
    options: [
      "ALL",
      "Accommodation",
      "Graduate Route Visa",
      "Academic",
    ],
  });
  const [questions, setQ] = useState([]);

  function select(tag) {
    setFilter({
      ...filter,
      sele: tag,
    });
  }

  useEffect(() => {
    getQuestionListApi().then((res) => {
      setQ(res.data);
      console.log(res.data);
    });
  }, []);

  return (
    <div className={topics.container}>
      <CreatePost
        setQ={setQ}
        questions={questions}
        filter={filter}
        setFilter={setFilter}
      />
      <div className={topics.filter}>
        {filter.options.map((op) => (
          <div
            key={`tag_${op}`}
            title={op}
            className={`${topics.tag} ${
              filter.sele === op ? topics.selected : ""
            }`}
            onClick={() => select(op)}
          >
            {op}
          </div>
        ))}
      </div>
      <div className={topics.content}>
        {questions
          .filter((p) =>
            filter.sele === "ALL" ? true : p.category === filter.sele
          )
          .map((q) => (
            <Topic topic={q} />
          ))}
      </div>
    </div>
  );
}

export function CreatePost({ setQ, questions, filter, setFilter }) {
  const [text, setText] = useState({
    title: "",
    captions: "",
    category: "Accommodation",
  });
  const [open, set] = useState(false);
  const handle = (e) => {
    let name = e.target.name;
    let value = e.target.value;
    setText({ ...text, [name]: value });
  };
  function post() {
    console.log(text)
    createQuestionApi(text).then(() => {
      getQuestionListApi().then((res)=>{
        setQ(res.data);
      });
    });
    setText({
      title: "",
      captions: "",
    });
  }
  useEffect(() => {
    if (text.title) {
      set(true);
    } else {
      set(false);
    }
  }, [text]);
  return (
    <div className={`${topics.create} ${topics.open}`}>
      <div className={topics.title}>
        <input
          placeholder="Ask for help?"
          name="title"
          type="text"
          value={text.title}
          onChange={handle}
        />
        <select className="form-select form-select-sm" onChange={handle} name="category" aria-label="Default select example">
          {/* <option selected></option> */}
          {filter.options.map((option) => option==='ALL'?null:  (
            <option value={option}>{option}</option>
          ))}
        </select>
      </div>
      <div className={`${topics.captions} ${open ? "" : topics.close}`}>
        <textarea
          value={text.captions}
          name="captions"
          placeholder="Detail for this question"
          id=""
          cols="50"
          rows="3"
          onChange={handle}
        ></textarea>
        <div className={`${topics.post} custom-btn`} onClick={post}>
          POST
        </div>
      </div>
    </div>
  );
}

export function Topic({ topic }) {
  const [open, setOpen] = useState(false);
  return (
    <div className={topics.topic}>
      <div className={topics.title}>
        {/* <AiOutlineQuestionCircle /> */}
        <div
          className={topics.avatar}
          title={`${topic.user.first_name} ${topic.user.last_name}`}
        >
          <img
            src={topic.user.profile_img}
            alt={`${topic.user.first_name} ${topic.user.last_name}`}
          />
        </div>
        <Link to={`/topics/${topic.id}`}>{topic.title}</Link>
        <AiFillCaretDown
          onClick={() => setOpen(!open)}
          className={`${topics.down} ${open ? topics.up : ""}`}
        />
      </div>

      <div className={`${topics.captions} ${!open ? topics.open : ""}`}>
        {topic.content}
      </div>
    </div>
  );
}
