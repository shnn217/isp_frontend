import { Link, useLocation, useNavigate } from "react-router-dom";
import { useState } from "react";
import post from "../style/component/Post.module.scss";
import classes from "../style/pages/Home.module.scss";
import { IoEarth } from "react-icons/io5";
import { FaPlus, FaRegCommentAlt, FaLinkedin, FaMinus } from "react-icons/fa";
import { AiFillHeart, AiOutlineUser } from "react-icons/ai";
import { createPostApi, getPostsApi } from "../api/postsApi";
import { FcImageFile } from "react-icons/fc";
import POST from "./component/POST";
import { useEffect } from "react";
import {
  createFollowCountApi,
  getDepSuggestionApi,
  getUniSuggestionApi,
  getUserFollowStatusApi,
} from "../api/followLikeSuggestApi";

function Homepage({ user }) {
  const [profile, set] = useState({});

  const [posts, setPosts] = useState([]);

  useEffect(() => {
    getPostsApi().then((res) => {
      setPosts(res.data);
      console.log(res.data);
    });
  }, []);

  return (
    <div className={classes.container}>
      <div className={classes.content}>
        <div className={classes.con}>
          <div className={classes.left}>
            <Profile user={user} profile={profile} setProfile={set} />
            {/* <Savequestions questions={questions} /> */}
          </div>
          <div className={classes.modal}>
            <CreatePost user={user} setPosts={setPosts} posts={posts} />
            {posts.map((p) => (
              <POST p={p} key={`post_${p.id}`}/>
            ))}
          </div>
          <div className={classes.right}>
            <Recommendation />
            <br></br>
            <DepRecommendation />
          </div>
        </div>
      </div>
    </div>
  );
}

export default Homepage;

export function CreatePost({ user, setPosts, posts }) {
  const [data, set] = useState({
    image: "",
    caption: "",
  });
  async function newfilesUpload(e) {
    //設定檔案大小限制
    var max_size = 5000000;
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
          console.log(upload.target.result);
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
    createPostApi(data).then((respond) => {
      console.log(respond);
      set({ caption: "", image: "" });
      // setPosts([])
      getPostsApi().then((res) => {
        console.log(res.data)
        setPosts(res.data.map((p)=>(p)))
      });
    });
  }

  const handle = (e) => {
    let name = e.target.name;
    let value = e.target.value;
    set({ ...data, [name]: value });
  };

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
          value={data.caption}
          id="exampleFormControlTextarea1"
          rows="2"
          name="caption"
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
        <label
          htmlFor={"image-file"}
          className={`${post.preview} ${post.upload}`}
        >
          <img src={data.image} alt="" />
        </label>
      )}
      <div className={`${post.submit} custom-btn `} onClick={() => submit()}>
        POST
      </div>
    </div>
  );
}

export function Profile({ profile, user, set }) {
  const location = useLocation();
  const navigate = useNavigate();
  const [follow, setFollow] = useState(false);
  const ProfilePage =
    !location.pathname.includes("me") && location.pathname.includes("profile");
  const info = ProfilePage ? profile : user;

  console.log();
  useEffect(() => {
    if (ProfilePage) {
      getUserFollowStatusApi(location.pathname.split("/")[2]).then((res) => {
        setFollow(res.data);
      });
    }
  }, []);

  function createFollow() {
    createFollowCountApi(user, profile).then((res) => {
      console.log(res);
      setFollow(!follow);
    });
  }

  return (
    <div className={classes.profile}>
      <div className={classes.avatar}>
        {ProfilePage ? (
          <img
            src={
              info.profile_img !== "empty"
                ? info.profile_img
                : "https://i.pinimg.com/564x/e3/60/93/e3609311123e13852ee148788d955acb.jpg"
            }
            alt={info.first_name}
          />
        ) : (
          <Link to="/profile/me">
            <img
              src={
                info.profile_img !== "empty"
                  ? info.profile_img
                  : "https://i.pinimg.com/564x/e3/60/93/e3609311123e13852ee148788d955acb.jpg"
              }
              alt={info.first_name}
            />
          </Link>
        )}
        {ProfilePage ? (
          <div
            className={`${classes.follow} custom-btn`}
            onClick={() => createFollow()}
          >
            {follow ? (
              <>UNFOLLOW</>
            ) : (
              <>
                <FaPlus />
                <>FOLLOW</>
              </>
            )}
          </div>
        ) : <div className={`${classes.setting} custom-btn`} onClick={()=> navigate('/setting')}>Account Setting</div>}
      </div>
      <div className={classes.info}>
        <h4>
          {info.first_name} {info.last_name}
          {ProfilePage && info.linkedin_url ? (
            <a href={info.linkedin_url}>
              <FaLinkedin />
            </a>
          ) : user.linkedin_url ? (
            <a href={info.linkedin_url}>
              <FaLinkedin />
            </a>
          ) : null}
        </h4>

        <div className={classes.row}>
          <div className={classes.title}>Location:</div>
          <div className={classes.value}>{info.location}</div>
        </div>
        <div className={classes.row}>
          <div className={classes.title}>Title:</div>
          <div className={classes.value}>{info.title} </div>
        </div>
        <div className={classes.row}>
          <div className={classes.title}>University:</div>
          <div className={classes.value}>{info.uni}</div>
        </div>
        <div className={classes.row}>
          <div className={classes.title}>Department:</div>
          <div className={classes.value}>{info.dep}</div>
        </div>
        <div className={classes.row}>
          <div className={classes.title}>Bio:</div>
          <div className={classes.value}>{info.bio}</div>
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
  const [connection, setConnection] = useState([]);

  function GetList() {
    getUniSuggestionApi().then((res) => {
      setConnection(res.data);
    });
  }
  useEffect(() => {
    GetList();
  }, []);

  return (
    <div className={`${classes.smallModal} ${open ? classes.open : ""}`}>
      <h4>Uni Connection</h4>
      <h8>
        <i>People go to the same Uni</i>
      </h8>
      {connection
        .filter((a, index) => (open ? true : index < 4))
        .map((q, index) => (
          <Link
            to={`/profile/${q.user}`}
            className={`${classes.row} ${classes.row2}`}
            key={`quse_${index}`}
            title={q.title}
          >
            <img
              src={
                q.profile_img !== "empty"
                  ? q.profile_img
                  : "https://i.pinimg.com/564x/e3/60/93/e3609311123e13852ee148788d955acb.jpg"
              }
              alt={q.first_name}
            />
            {/* <AiOutlineUser size={32} /> */}
            <div>
              <div>
                {q.first_name} {q.last_name}
              </div>
              <div>{q.title}</div>
            </div>
          </Link>
        ))}
      <div className={classes.morebtn} onClick={() => set(!open)}>
        {open ? "Hide" : "More"}
      </div>
    </div>
  );
}

export function DepRecommendation() {
  const [open, set] = useState(false);
  const [connection, setConnection] = useState([]);

  function GetList() {
    getDepSuggestionApi().then((res) => {
      setConnection(res.data);
    });
  }
  useEffect(() => {
    GetList();
  }, []);

  return (
    <div className={`${classes.smallModal} ${open ? classes.open : ""}`}>
      <h4>Dep Connection</h4>
      <h8>
        <i>People study in the same Dep</i>
      </h8>
      {connection
        .filter((a, index) => (open ? true : index < 4))
        .map((q, index) => (
          <Link
            to={`/profile/${q.user}`}
            className={`${classes.row} ${classes.row2}`}
            key={`quse_${index}`}
            title={q.title}
          >
            <img
              src={
                q.profile_img !== "empty"
                  ? q.profile_img
                  : "https://i.pinimg.com/564x/e3/60/93/e3609311123e13852ee148788d955acb.jpg"
              }
              alt={q.first_name}
            />
            {/* <AiOutlineUser size={32} /> */}
            <div>
              <div>
                {q.first_name} {q.last_name}
              </div>
              <div>{q.title}</div>
            </div>
          </Link>
        ))}
      <div className={classes.morebtn} onClick={() => set(!open)}>
        {open ? "Hide" : "More"}
      </div>
    </div>
  );
}
