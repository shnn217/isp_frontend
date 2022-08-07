import { Link, useLocation ,Outlet} from "react-router-dom";
import { useState, useEffect } from "react";
import topics from "../../style/pages/Topics.module.scss";
import { AiOutlineQuestionCircle, AiFillCaretDown } from "react-icons/ai";

export default function TopicsList() {
  const [filter, setFilter] = useState({
    sele: "ALL",
    options: ["ALL", "Accommodation", "visa", "other"],
  });
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

  function select(tag) {
    setFilter({
      ...filter,
      sele: tag,
    });
  }
  return (
    <div className={topics.container}>
      <div className={topics.filter}>
        {filter.options.map((op) => (
          <div
            key={op.id}
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
            filter.sele === "ALL" ? true : p.type === filter.sele
          )
          .map((q) => (
            <Topic topic={q} />
          ))}
      </div>
    </div>
  );
}

export function Topic({ topic }) {
  const [open, setOpen] = useState(false);
  return (
    <div className={topics.topic}>
      <div className={topics.title}>
        <AiOutlineQuestionCircle />
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
