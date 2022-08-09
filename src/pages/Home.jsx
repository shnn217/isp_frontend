import { Link, useLocation } from "react-router-dom";
import { useState } from "react";
import post from "../style/component/Post.module.scss";
import classes from "../style/pages/Home.module.scss";
import { IoEarth } from "react-icons/io5";
import { FaPlus, FaRegCommentAlt } from "react-icons/fa";
import { AiFillHeart, AiOutlineUser } from "react-icons/ai";
import {
  FcImageFile,
} from "react-icons/fc";
import POST from "./component/POST";

function Homepage({ user }) {
  const [profile, set] = useState({
    university: "University of Birmingham",
    major: "MSc Computer Science",
    email: "ericlin1234@gmail.com",
    brithday: "1991-02-17",
    phone: "(+44) 0739458371639",
    company: "Uk city bank Inc.",
    jobtitle: "App designer engineer",

    location: "London, West Midlands",
    image: 'https://i.pinimg.com/564x/e3/60/93/e3609311123e13852ee148788d955acb.jpg',

  });
  const questions = [
    {
      title: "How to apply PSW visa",
    },
    {
      title: "How to exchange international car liscence",
    },
    {
      title: "How to apply PSW visa",
    },
    {
      title: "How to exchange international car liscence",
    },
    {
      title: "How to apply PSW visa",
    },
    {
      title: "How to exchange international car liscence",
    },
    {
      title: "How to apply PSW visa",
    },
    {
      title: "How to exchange international car liscence",
    },
  ];

  const [posts, setPosts] = useState([
    {
      user: {
        id:'qkowekqoe',
        name: "Wang",
        image:
          "https://i.pinimg.com/564x/3f/86/fc/3f86fcc2b0b2dd0fb0e90d6590abaf19.jpg",
        jobtitle: "UI/UX",
      },
      id: "120030221qew12",
      image:
        "https://i.pinimg.com/736x/d9/8e/c0/d98ec0b448f2381d00c842d3f86b383d.jpg",
      captions: "what a car..",
      num_like: 120,
    },
    {
      user: {
        name: "Alex King",
        image:
          "https://i.pinimg.com/736x/59/b8/83/59b8831a4fa6bea47c9c75a5aa5381ef.jpg",
        jobtitle: "Sales",
      },
      id: "12a1200313022fqrq12",
      image: "",
      captions: "I'm Iron man.",
      num_like: 13,
    },
    {
      user: {
        name: "Valarie ",
        image:
          "https://i.pinimg.com/564x/99/9f/2c/999f2c3b5126ed4e23cfcd9dc360dac8.jpg",
        jobtitle: "Head Hunter",
      },
      image:
        "https://i.pinimg.com/564x/51/c9/3e/51c93e0a70e8ea6b3e10224cac8715a4.jpg",
      captions: "",
      id: "120we203022-qe12grdhu-qwe12",
      num_like: 10,
    },
    {
      user: {
        name: "Amy",
        image:
          "https://i.pinimg.com/564x/05/49/96/05499652752bc2e3137f860c9164fbd9.jpg",
        jobtitle: "Designer",
      },
      id: "12a1200313022fqrq12",
      image: "",
      captions: "!?",
      num_like: 43,
    },
  ]);

  return (
    <div className={classes.container}>
      <div className={classes.content}>
        <div className={classes.con}>
          <div className={classes.left}>
            <Profile user={user} profile={profile} />
            <Savequestions questions={questions} />
          </div>
          <div className={classes.modal}>
            <CreatePost user={user} setPosts={setPosts} posts={posts} />
            {posts.map((p) => (
              <POST p={p} />
            ))}
          </div>
          <div className={classes.right}>
            <Recommendation />
          </div>
        </div>
      </div>
    </div>
  );
}

export default Homepage;

export function CreatePost({ user, setPosts, posts }) {
  const [data, set] = useState({
    image: '',
    captions: '',

  });
  async function newfilesUpload(e) {
    //設定檔案大小限制
    var max_size = 540000;
    // console.log('imageID:',images[index].id)
    var reader = new FileReader();
    const imageFile = e.target.files[0];
    // console.log(e.target.files)
    const imageName = e.target.files[0].name;
    //設定套件的setup
    const options = {
      maxSizeMB: 0.044,
      maxWidthOrHeight: 600,
      useWebWorker: true,
    };

    if (imageFile) {
      if (imageFile.size < max_size) {
        // console.log(imageFile.size < max_size);
        reader.onload = function (upload) {
          set({ ...data, image: upload.target.result });
          // let wowo = valid.images;
        };
        reader.readAsDataURL(imageFile);
        // await new Promise(resolve=>{
        // })
      } else {
        alert("Please below 5MB");
        try {
          // const compressedFile = await imageCompression(imageFile, options);
          // reader.readAsDataURL(compressedFile);
          // await upddd();
        } catch (error) {
          // console.log(error);
          // setReset(!reset);
        }
      }
    }
  }

  function submit() {

    setPosts([
      {
        user: user,
        image: data.image,
        captions: data.captions,
        id: `203${data.captions}`,
        num_like: 0
      },
      ...posts
    ])
    set(
      {
        image: '',
        captions: '',
      }
    )
  }

  const handle = (e) => {
    let name = e.target.name
    let value = e.target.value
    set({ ...data, [name]: value })
  }
  return (
    <div className={`${post.post} ${post.create} `}>
      {/* <div className={post.top}>
        <img src={user.image} alt="" />
        <div className={post.input}></div>
      </div> */}
      <h4>Post something interesting..</h4>
      <div className={post.input}>
        <textarea
          placeholder="Type something here..."
          // className="form-control"
          value={data.captions}
          id="exampleFormControlTextarea1"
          rows="2"
          name='captions'
          onChange={handle}
        ></textarea>
      </div>
      <input
        accept=".jpg, .png, .jpeg"
        style={{ display: "none" }}
        id={"image-file"}
        type="file"
        onClick={(e) => {
          e.target.value = null;
        }}
        onChange={(e) => {
          newfilesUpload(e);
        }}
      />
      {!data.image ? (
        <label htmlFor={"image-file"} className={post.upload}>
          <FcImageFile size={32} />
          UPLOAD
        </label>
      ) : (
        <label htmlFor={"image-file"} className={`${post.preview} ${post.upload}`}>
          <img src={data.image} alt="" />
        </label>
      )}
      <div className={`${post.submit} custom-btn `} onClick={() => submit()}>POST</div>
    </div>
  );
}


export function Profile({ profile, user }) {
  const location = useLocation()
  const ProfilePage = !location.pathname.includes('me') && location.pathname.includes('profile')
  return (
    <div className={classes.profile}>
      <div className={classes.avatar}>
        {ProfilePage ? <img src={ProfilePage ? profile.image : user.image} alt={user.name} /> : <Link to="/profile/me"><img src={ProfilePage ? profile.image : user.image} alt={user.name} /></Link>}
        {ProfilePage ? <div className={`${classes.follow} custom-btn`}>
          <FaPlus />
          FOLLOW
        </div> : null}
      </div>
      <div className={classes.info}>
        <h4>{ProfilePage ? profile.name : user.name}</h4>

        <div className={classes.row}>
          <div className={classes.title}>Brithday:</div>
          <div className={classes.value}>{profile.brithday}</div>
        </div>
        <div className={classes.row}>
          <div className={classes.title}>Location:</div>
          <div className={classes.value}>{profile.location}</div>
        </div>
        <div className={classes.row}>
          <div className={classes.title}>Work:</div>
          <div className={classes.value}>{profile.company} </div>
        </div>
        <div className={classes.row}>
          <div className={classes.title}>University:</div>
          <div className={classes.value}>{profile.university}</div>
        </div>
        <div className={classes.row}>
          <div className={classes.title}>Major:</div>
          <div className={classes.value}>{profile.major}</div>
        </div>
        <div className={classes.row}>
          <div className={classes.title}>Email:</div>
          <div className={classes.value}>{profile.email}</div>
        </div>
      </div>
    </div>
  );
}

export function Savequestions({ questions }) {
  const [open, set] = useState(false);
  return (
    <div className={`${classes.smallModal} ${open ? classes.open : ""}`}>
      <h4>Recent Saved</h4>
      {questions
        .filter((a, index) => (open ? true : index < 4))
        .map((q, index) => (
          <div className={classes.row} key={`quse_${index}`} title={q.title}>
            <AiFillHeart />
            {q.title}
          </div>
        ))}
      <div className={classes.morebtn} onClick={() => set(!open)}>
        {open ? "Hide" : "More"}
      </div>
    </div>
  );
}

export function Recommendation() {
  const [open, set] = useState(false);
  const connection = [
    {
      name: "Amy Wang",
      jobtitle: "UI/UX designer",
      id:'123lfla',
      image:'https://i.pinimg.com/564x/bd/ab/a5/bdaba50ec93e924d5c80fef291b26549.jpg'
    },
    {
      name: "Johnson",
      jobtitle: "UI/UX designer",
      id:'123lfsdasla',
      image:'https://i.pinimg.com/564x/99/8a/c1/998ac15e3291a7712ba43c93e8aecc18.jpg'
    },
    {
      name: "Ashton",
      jobtitle: "QA",
      id:'123lqdafla',
      image:'https://i.pinimg.com/564x/00/fe/e5/00fee590be02538c19a4114611fc8bfd.jpg'
    },
    {
      name: "Amy Wang",
      jobtitle: "UI/UX designer",
      id:'123lffafla',
      image:'https://i.pinimg.com/564x/2f/d2/1a/2fd21a918c579563e297402f6aae908c.jpg'
    },
    {
      name: "Amy Wang",
      jobtitle: "UI/UX designer",
      id:'123lfla',
      image:'https://i.pinimg.com/564x/55/43/32/554332dc73ba78f30416e00c9cb9430c.jpg'
    },
    {
      name: "Amy Wang",
      jobtitle: "UI/UX designer",
      id:'123lfla',
      image:'https://i.pinimg.com/564x/10/c9/56/10c9567eeeb0c4ac81a528be21325cef.jpg'
    },
  ];
  return (
    <div className={`${classes.smallModal} ${open ? classes.open : ""}`}>
      <h4>Social Connection</h4>
      {connection
        .filter((a, index) => (open ? true : index < 4))
        .map((q, index) => (
          <Link
            to={`/profile/${q.id}?name=${q.name}&image=${q.image}`}
            className={`${classes.row} ${classes.row2}`}
            key={`quse_${index}`}
            title={q.title}
          >
            <img src={q.image} alt="" />
            {/* <AiOutlineUser size={32} /> */}
            <div>
              <div>{q.name}</div>
              <div>{q.jobtitle}</div>
            </div>
          </Link>
        ))}
      <div className={classes.morebtn} onClick={() => set(!open)}>
        {open ? "Hide" : "More"}
      </div>
    </div>
  );
}
