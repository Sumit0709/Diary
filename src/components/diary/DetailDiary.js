import React from "react";
import { Link } from "react-router-dom";

import Card from "../ui/Card";
import classes from "./DetailDiary.module.css";

import { getMonthInAlp } from "../layout/Date";

const DetailDiary = (props) => {
  const dateValue = new Date(props.diary.dateValue);
  const date = dateValue.getDate();
  const month = getMonthInAlp(dateValue.getMonth());
  const year = dateValue.getFullYear();

  return (
    <Link to={`/diary/${props.diary.id}`} className={classes.link}>
      <Card bgUrl={props.diary.bgUrl}>
        <div className={classes.title} style={{'color':`${props.diary.color}`}}>{props.diary.title}</div>
        <div className={classes.content} style={{'color':`${props.diary.color}`}}>{props.diary.content}</div>
        
        <div className={classes.date} style={{'color':`#eee`}}> {`${date} ${month} ${year}`} </div>
        
      </Card>
    </Link>
  );
};

export default DetailDiary;
