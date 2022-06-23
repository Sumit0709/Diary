import React, { useState } from "react";
import rgbHex from "rgb-hex";
import { ChromePicker } from "react-color";

import classes from "./Menu.module.css";

const Menu = (props) => {
  const [colour, setColour] = useState("black");

  const updateTextColor = (e) => {
    props.updateColor(e.hex);
  };

  const colourChangeHandler = (e) => {
    setColour("#" + rgbHex(e.rgb.r, e.rgb.g, e.rgb.b, e.rgb.a));
  };

  return (
    <div className={classes.parent}>

      <div className={classes.container}>
        <h2 className={classes.color_text} style={{ color: colour }}>
          Choose Text colour!
        </h2>
        <div className={classes.colorPicker}>
          <ChromePicker
            onChangeComplete={updateTextColor}
            onChange={colourChangeHandler}
            color={colour}
          />
        </div>
        <div className={classes.p}>
            <p style={{ color: colour }}>
            It is a long established fact that a reader will be distracted by the
            readable content of a page when looking at its layout. The point of
            using Lorem Ipsum is that it has a more-or-less normal distribution of
            letters, as opposed to using 'Content here, content here'
            </p>
        </div>
      </div>
    </div>
  );
};

export default Menu;
