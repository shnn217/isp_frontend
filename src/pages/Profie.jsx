import { Link, Navigate, useLocation,useNavigate,useParams } from "react-router-dom";
import { useState ,useEffect} from "react";
import post from "../style/component/Post.module.scss";
import classes from "../style/pages/Home.module.scss";
import { Profile, Recommendation, DepRecommendation, Savequestions, CreatePost } from './Home';
import POST from "./component/POST";
import {getOtherUserPostsApi, getPostsApi, getSelfPostsApi} from "../api/postsApi";
import { profileInfoApi } from "../api/profileApi";

function Profilepage({ user }) {
  let location = useLocation()
  let params = useParams()
  let id = params.pid
  let navigate = useNavigate()
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
  
  const User = JSON.parse(localStorage.getItem('User'))
  
  useEffect(()=>{
    if(Number(id)===User.user){
      console.log('test test test')
      navigate('/profile/me')
    }
  },[location])

  console.log(location)
  const [posts, setPosts] = useState(ProfilePage?[]:[]);

  useEffect(()=>{
    if(ProfilePage){
      GetUserPosts()
      GetUserProfile()
    }else{
      GetLogInUserProfile()
    } 
    
    
  },[location,location.search])

  function GetLogInUserProfile(){
    getSelfPostsApi().then((res)=>{

      setPosts(res.data)
  })
}

  function GetUserProfile() {
    profileInfoApi(id).then((res)=>{
      set(res.data)
    })
  }

  function GetUserPosts(){
    getOtherUserPostsApi(id).then((res)=>{
      setPosts(res.data)
    }
  )}

  return (
    <div className={classes.container}>
      <div className={classes.content}>
        <div className={classes.con}>
          <div className={classes.left}>
            <Profile user={user} profile={profile} />
            {/* <Savequestions questions={questions} /> */}
          </div>
          <div className={classes.modal}>
            {!location.pathname.includes('me') && location.pathname.includes('profile') ? null : <CreatePost user={user} setPosts={setPosts} posts={posts} />}
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

export default Profilepage;
