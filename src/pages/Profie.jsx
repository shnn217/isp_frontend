import { Link, useLocation } from "react-router-dom";
import { useState ,useEffect} from "react";
import post from "../style/component/Post.module.scss";
import classes from "../style/pages/Home.module.scss";
import {getSelfPostsApi} from "../api/postsApi";
import { Profile, POST, Recommendation, Savequestions, CreatePost } from './Home'

function Profilepage({ user }) {
  let location = useLocation()
  const ProfilePage = !location.pathname.includes('me') && location.pathname.includes('profile')
  const [profile, set] = useState(ProfilePage?{
    name: location.search?decodeURI(location.search.split('&')[0].replace('?name=','')):'Allen Won',
    university: "University of Birmingham",
    major: "MSc Computer Science",
    email: "ALLENs234@gmail.com",
    brithday: "03/21/1991",
    phone: "(+44) 0731314371639",
    company: "Uk city bank Inc.",
    jobtitle: "Designer ",
    location: "London, West Midlands",
    image: location.search?location.search.split('&')[1].replace('image=',''):'https://i.pinimg.com/564x/99/0b/14/990b1498c2da7fca661b81187f099890.jpg',
  }:user);
  const questions = [
    {
      title: "How to rent a place in stratford",
    },
    {
      title: "How to exchange international car liscence",
    },
    {
      title: "How to rent a place in stratford",
    },
    {
      title: "How to exchange international car liscence",
    },
    {
      title: "How to rent a place in stratford",
    },
    {
      title: "How to exchange international car liscence",
    },
    {
      title: "How to rent a place in stratford",
    },
    {
      title: "How to exchange international car liscence",
    },
  ];
  console.log(location)
  const [posts, setPosts] = useState(ProfilePage?[]:[]);

  useEffect(()=>{
    getSelfPostsApi().then((res)=>{

      setPosts(res.data.map((post)=>(
        {
          ...post,
          user:{
            name:post.user,
            jobtitle:'UI/UX',
            image:'https://i.pinimg.com/564x/05/49/96/05499652752bc2e3137f860c9164fbd9.jpg'
          },
          captions:post.caption,
          id: post.id,
          num_like: post.num_likes,
        }
      )))
    })
    
  },[location,location.search])


  return (
    <div className={classes.container}>
      <div className={classes.content}>
        <div className={classes.con}>
          <div className={classes.left}>
            <Profile user={user} profile={profile} />
            <Savequestions questions={questions} />
          </div>
          <div className={classes.modal}>
            {!location.pathname.includes('me') && location.pathname.includes('profile') ? null : <CreatePost user={user} setPosts={setPosts} posts={posts} />}
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

export default Profilepage;
