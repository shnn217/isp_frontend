import { Link, useLocation, Outlet } from "react-router-dom";
import { useState, useEffect } from "react";
import topics from "../../style/pages/Topics.module.scss";
import { AiOutlineQuestionCircle, AiFillCaretDown } from "react-icons/ai";

export default function TopicsList() {
  const [filter, setFilter] = useState({
    sele: "ALL",
    options: ["ALL", "Accommodation", "Graduate Route Graduate Route Visa", "Academic"],

  });
  const [questions, setQ] = useState([
    {
      user: {
        first_name: "Jay",
        last_name: "Chou",
        profile_image:
          "https://i.pinimg.com/564x/e9/9e/a8/e99ea84b3fd0abaa0f1ae8a963acd68b.jpg",
      },
      title: "How to rent a place in stratford",
      category: "Accommodation",
      captions: `Lorem ipsum dolor sit amet consectetur adipisicing elit. Maxime mollitia,
molestiae quas vel sint commodi repudiandae consequuntur voluptatum laborum
numquam blanditiis harum quisquam eius sed odit fugiat iusto fuga praesentium
optio, eaque rerum! Provident similique accusantium nemo autem.`,
      id: "12-32",
    },
    {
      user: {
        first_name: "Jay",
        last_name: "Chou",
        profile_image:
          "https://i.pinimg.com/564x/e9/9e/a8/e99ea84b3fd0abaa0f1ae8a963acd68b.jpg",
      },
      captions: `Lorem ipsum dolor sit amet consectetur adipisicing elit. Maxime mollitia,
molestiae quas vel sint commodi repudiandae consequuntur voluptatum laborum
numquam blanditiis harum quisquam eius sed odit fugiat iusto fuga praesentium
optio, eaque rerum! Provident similique accusantium nemo autem.`,
      category: "Graduate Route Visa",
      id: "12-32gqhas32",
      title: "How to exchange international car liscence",
    },
    {
      user: {
        first_name: "Jay",
        last_name: "Chou",
        profile_image:
          "https://i.pinimg.com/564x/e9/9e/a8/e99ea84b3fd0abaa0f1ae8a963acd68b.jpg",
      },
      captions: `Lorem ipsum dolor sit amet consectetur adipisicing elit. Maxime mollitia,
        molestiae quas vel sint commodi repudiandae consequuntur voluptatum laborum
        numquam blanditiis harum quisquam eius sed odit fugiat iusto fuga praesentium
        optio, eaque rerum! Provident similique accusantium nemo autem.`,
      category: "Graduate Route Visa",
      id: "12-3232",
      title: "How to rent a place in stratford",
    },
    {
      user: {
        first_name: "Jay",
        last_name: "Chou",
        profile_image:
          "https://i.pinimg.com/564x/e9/9e/a8/e99ea84b3fd0abaa0f1ae8a963acd68b.jpg",
      },
      captions: `Lorem ipsum dolor sit amet consectetur adipisicing elit. Maxime mollitia,
molestiae quas vel sint commodi repudiandae consequuntur voluptatum laborum
numquam blanditiis harum quisquam eius sed odit fugiat iusto fuga praesentium
optio, eaque rerum! Provident similique accusantium nemo autem.`,
      category: "Graduate Route Visa",
      id: "12-3qds232",
      title: "How to exchange international car liscence",
    },
    {
      user: {
        first_name: "Jay",
        last_name: "Chou",
        profile_image:
          "https://i.pinimg.com/564x/e9/9e/a8/e99ea84b3fd0abaa0f1ae8a963acd68b.jpg",
      },
      captions: `Lorem ipsum dolor sit amet consectetur adipisicing elit. Maxime mollitia,
molestiae quas vel sint commodi repudiandae consequuntur voluptatum laborum
numquam blanditiis harum quisquam eius sed odit fugiat iusto fuga praesentium
optio, eaque rerum! Provident similique accusantium nemo autem.`,
      category: "Accommodation",
      id: "12-32asf32",
      title: "How to rent a place in stratford",
    },
    {
      user: {
        first_name: "Jay",
        last_name: "Chou",
        profile_image:
          "https://i.pinimg.com/564x/e9/9e/a8/e99ea84b3fd0abaa0f1ae8a963acd68b.jpg",
      },
      captions: `Lorem ipsum dolor sit amet consectetur adipisicing elit. Maxime mollitia,
molestiae quas vel sint commodi repudiandae consequuntur voluptatum laborum
numquam blanditiis harum quisquam eius sed odit fugiat iusto fuga praesentium
optio, eaque rerum! Provident similique accusantium nemo autem.`,
      category: "Graduate Route Visa",
      id: "12-32vadv32",
      title: "How to exchange international car liscence",
    },
    {
      user: {
        first_name: "Jay",
        last_name: "Chou",
        profile_image:
          "https://i.pinimg.com/564x/e9/9e/a8/e99ea84b3fd0abaa0f1ae8a963acd68b.jpg",
      },
      captions: "12313213",
      category: "other",
      id: "12-3as232",
      title: "How to rent a place in stratford",
    },
    {
      user: {
        first_name: "Jay",
        last_name: "Chou",
        profile_image:
          "https://i.pinimg.com/564x/e9/9e/a8/e99ea84b3fd0abaa0f1ae8a963acd68b.jpg",
      },
      captions: "12313213",
      category: "other",
      id: "12-323231",
      title: "How to exchange international car liscence",
    },
  ]);

  function select(tag) {
    setFilter({
      ...filter,
      sele: tag,
    });
  }
  return (
    <div className={topics.container}>
      <CreatePost setQ={setQ} questions={questions} filter={filter} setFilter={setFilter} />
      <div className={topics.filter}>
        {filter.options.map((op) => (
          <div
            key={`tag_${op}`}
            title={op}
            className={`${topics.tag} ${filter.sele === op ? topics.selected : ""
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
    category: ""
  });
  const [open, set] = useState(false);
  const handle = (e) => {
    let name = e.target.name;
    let value = e.target.value;
    setText({ ...text, [name]: value });

  };
  function post() {
    setQ([
      {
        captions: text.captions,
        title: text.title,
      },
      ...questions,
    ]);
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
        <div className={topics.avatar} title={`${topic.user.first_name} ${topic.user.last_name}`}>
          <img
            src={topic.user.profile_image}
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
        {topic.captions}
      </div>
    </div>
  );
}
