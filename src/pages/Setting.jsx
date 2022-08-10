import { Link, useLocation } from "react-router-dom";
import { useEffect, useState } from "react";
import classes from "../style/pages/Setting.module.scss";
import home from "../style/pages/Home.module.scss";
import profileUpdateApi from "../api/profileApi";

function Homepage({ user,setUser }) {
  const formArray = [
    
      {
        title:'First Name',
        name:'first_name',
        type:"text"
      },
      {
        title:'Last Name',
        name:'last_name',
        type:"text"
      },
      {
        title:'Location',
        name:'location',
        type:"text"
      },
      {
        title:'Title',
        name:'title',
        type:"text"
      },
      {
        title:'University',
        name:'uni',
        type:"text"
      },
      {
        title:'Department',
        name:'dep',
        type:"text"
      },
      {
        title:'Bio',
        name:'bio',
        type:"text"
      },
      {
        title:'Linkedin Url',
        name:'linkedin_url',
        type:"text"
      },
  ];
  const [profile, set] = useState({ ...user });
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
          set({ ...profile, profile_img: upload.target.result });
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

  function handle (e) {
    let name = e.target.name
    let value = e.target.value
    set({...profile,[name]:value})
  }
  function save () {
    profileUpdateApi(profile).then((respond) => {
      console.log(respond)
      setUser(profile)
      localStorage.setItem(
      "User",
      JSON.stringify(profile)
    );
    }).catch((error) => {
      console.log(error)
    })
    
  }
  return (
    <div className={classes.container}>
      <div className={classes.profile}>
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
        <label htmlFor={"image-file"} className={classes.avatar}>
          <img src={profile.profile_img} alt="" />
        </label>
        <div className={classes.form}>
          {formArray.map(f=>(
             <div className={classes.row}>
             <label for={f.title} key={f.name} className="form-label">
            {f.title}
             </label>
             <input
               type={f.type}
               className="form-control"
                name={f.name}
                value={profile[f.name]}
               id={f.title} 
               onChange={handle}
             />
           </div>
          ))}
         <Link to={'/profile/me'} onClick={save} className={`${classes.save}  custom-btn `}>SAVE</Link>
        </div>
      </div>
    </div>
  );
}

export default Homepage;
