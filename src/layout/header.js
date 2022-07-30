import {
   Link,
 } from "react-router-dom";
 import header from "../style/layout/Header.module.scss";//JSON
 import Logo from "../resource/SVG/Logo";
 function Header(props) {

   const user= props.user


   return (
   
       <div className={header.header}>
         <Link to={'/'} className={header.logo}>
           <Logo />
           <div className={header.logoName}>ISP</div>
         </Link>
         <div className={header.QA}>{user.name.length>1?`Hi, ${user.name}`:"Q&A"}</div>
       </div>
       
   );
 }
 
 export default Header;
 
