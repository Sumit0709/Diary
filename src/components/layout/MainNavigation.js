import React, { Fragment } from "react";
import { NavLink } from "react-router-dom";

import classes from "./MainNavigation.module.css";

const MainNavigation = (props) => {
  return (
    <div className={classes.mainNav}>
        <div className={classes.heading}>
          <h1>Diary</h1>
        </div>
      <nav className={classes.nav}>
        <ul className={classes.link}>
          <li className={classes.linkItem} onClick={()=>{alert("You are currently on Home Page")}}>Home</li>
          <li className={classes.linkItem}><NavLink to="/new-diary" className={classes.navLink}>New Page</NavLink></li>
          <li className={classes.linkItem} onClick={()=>{alert("LOGIN Functionality will be added in future.")}}>Login</li>
        </ul>
      </nav>
    </div>
  );
};
export default MainNavigation;
