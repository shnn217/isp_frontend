import { Link, useLocation } from "react-router-dom";
import { useState ,useEffect} from "react";
import post from "../style/component/Post.module.scss";
import classes from "../style/pages/Home.module.scss";
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
  const [posts, setPosts] = useState(ProfilePage?[
    {
      user:profile,
      id: "12003022---12",
      image:
        "https://i.pinimg.com/564x/7d/c3/fa/7dc3faeafe7582e9123f86583dfe9043.jpg",
      captions: "New hat~",
      num_like: 120,
    },
    {
      user:profile,
      id: "12a1200313022---12",
      image: "",
      captions: "Life is short",
      num_like: 13,
    },
    {
      user:profile,
      image:
        "https://i.pinimg.com/564x/70/bb/a4/70bba479120323f6e36a0a46a1ae09da.jpg",
      captions: "New in here",
      id: "120we203022-q--12",
      num_like: 10,
    },
  ]:
  [
    {
      user:user,
      id: user.id,
      image:
        "https://i.pinimg.com/564x/4a/da/18/4ada18dae7dc5dfccdbec78bae22b090.jpg",
      captions: "Reflection",
      num_like: 120,
    },
    {
      user:user,
      id: user.id,
      image: "",
      captions: "Life is good",
      num_like: 13,
    },
    {
      user:user,
      image:
        "https://i.pinimg.com/564x/75/a7/20/75a720ec5c585c4f267d178a99d801dc.jpg",
      captions: "Need this",
      id: user.id,
      num_like: 10,
    },
  ]);

  useEffect(()=>{
    if(ProfilePage){
      set({
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
      })
      setPosts([
        {
          user:profile,
          id: "12003022---12",
          image:
            "https://i.pinimg.com/564x/7d/c3/fa/7dc3faeafe7582e9123f86583dfe9043.jpg",
          captions: "New hat~",
          num_like: 120,
        },
        {
          user:profile,
          id: "12a1200313022---12",
          image: "",
          captions: "Life is short",
          num_like: 13,
        },
        {
          user:profile,
          image:
            "https://i.pinimg.com/564x/70/bb/a4/70bba479120323f6e36a0a46a1ae09da.jpg",
          captions: "New in here",
          id: "120we203022-q--12",
          num_like: 10,
        },
      ])
    }else{
      set(user)
      setPosts(
        [
          {
            user:user,
            id: user.id,
            image:
              "https://i.pinimg.com/564x/4a/da/18/4ada18dae7dc5dfccdbec78bae22b090.jpg",
            captions: "Reflection",
            num_like: 120,
          },
          {
            user:user,
            id: user.id,
            image: "",
            captions: "Life is good",
            num_like: 13,
          },
          {
            user:user,
            image:
              "https://i.pinimg.com/564x/75/a7/20/75a720ec5c585c4f267d178a99d801dc.jpg",
            captions: "Need this",
            id: user.id,
            num_like: 10,
          },
        ]
      )
    }
  },[location])


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
