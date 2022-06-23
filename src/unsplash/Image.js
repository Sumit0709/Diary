import { Fragment, useState } from "react";
import LoadingSpinner from "../components/ui/LoadingSpinner";
import classes from "./Image.module.css";

const Image = (props) => {
  const [isLoaded, setIsLoaded] = useState(false);
  
  const imageClickHandler = async () => {

    console.log(props.imgUrl);
    props.clickHandler(props.imgUrl.urlRegular);
  };

  return (
    <Fragment>
      <img
        style={{ display: "none" }}
        src={props.imgUrl.urlThumb}
        onLoad={() => setIsLoaded(true)}
        alt="temporary"
      />
      {isLoaded && (
        <div
          className={classes.image}
          style={{
            backgroundImage: `url(${props.imgUrl.urlThumb})`,
            backgroundColor: "none",
          }}
          onClick={imageClickHandler}
        />
      )}
      {!isLoaded && (
        <div className={classes.spinner}>
          <LoadingSpinner />
        </div>
      )}
    </Fragment>
  );
};

export default Image;
