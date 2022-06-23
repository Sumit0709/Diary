import MainNavigation from "../layout/MainNavigation";
import AllDiary from "./AllDiary";

import classes from "./Home.module.css";

const Home = () => {
    return <div className={classes.home}>
    <MainNavigation />
    <AllDiary />
  </div>
}

export default Home;