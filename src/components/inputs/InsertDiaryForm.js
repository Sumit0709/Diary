import React, {
  useRef,
  useState,
  useContext,
  useEffect,
  Fragment,
} from "react";

import { useHistory } from "react-router-dom";

import classes from "./InsertDiaryForm.module.css";
import "./InsertDiaryForm2.css";
import DiaryContext from "../../store/diary-context";
import MyDate from "../layout/Date";
import MyCalendar from "../layout/MyCalender";

import { MdLandscape, MdFormatColorText } from "react-icons/md";
import GoToTop from "../layout/GoToTop";
import Menu from "./Menu";

const FIREBASE_DOMAIN = "https://diary-4u-default-rtdb.firebaseio.com";

const InsertDiaryForm = (props) => {
  const history = useHistory();
  const titleRef = useRef();
  const contentRef = useRef();
  const noteCtx = useContext(DiaryContext);

  const bgUrl = props.diaryData.bgUrl;

  const [contentHeight, setContentHeight] = useState(50);
  const propsDate = props.diaryData.dateValue;
  const propsColor = props.diaryData.color;
  const [dateValue, setDateValue] = useState(new Date());

  const [color,setColor] = useState("#000");
  const [showColorPicker,setShowColorPicker] = useState("colorPicker");
  useEffect(() => {
    const date = propsDate ? new Date(propsDate) : new Date();
    setDateValue(date);

    propsColor? setColor(propsColor) : setColor("#000");
  }, [propsDate,propsColor]);

  const contentKepUpHandler = (event) => {
    let h = event.target.scrollHeight.toString();
    h = `${h}px`;
    setContentHeight(h);
  };

  const dateChangeHandler = (value) => {
    setDateValue(new Date(value));
    noteCtx.setIsOpenCalander(false);
  };

  const openCalanderHandler = () => {
    noteCtx.setIsOpenCalander(true);
  };

  const submitHandler = (event) => {
    event.preventDefault();

    const title = titleRef.current.value;
    const content = contentRef.current.value;

    props.insertDiary({
      title,
      content,
      dateValue,
      color,
      bgUrl
    });
  };

  const showUnsplashHandler = async () => {

    const title = titleRef.current.value;
    const content = contentRef.current.value;

    const submittingData = async()=>{

      const response = await fetch(`${FIREBASE_DOMAIN}/diary.json`,{
        method:'POST',
        body: JSON.stringify({
          title,
          content,
          dateValue,
          color,
          bgUrl: props.bgUrl
        }),
        headers: {
          "Content-Type": "application/json"
        }
      });

      if(!response.ok){
        console.log('Error');
        throw new Error('Something went wrong');
      }
      else {
        const responseData = await response.json();
        return responseData.name;
      }
    } 

    const updatingData = async () => {
      const response = await fetch(
        `${FIREBASE_DOMAIN}/diary/${props.diaryData.id}.json`,
        {
          method: "PUT",
          body: JSON.stringify({
            title,
            content,
            dateValue,
            color,
            bgUrl: props.bgUrl
          }),
          headers: {
            "Content-Type": "application/json",
          },
        }
      );

      if (!response.ok) {
        console.log("Error");
        throw new Error("Something went wrong");
      }
    };

    try{

      if(!props.diaryData.id){
        const dID = await submittingData();
        history.replace(`/background-selector/${dID}`);
      }
      else{
        await updatingData();
        history.replace(`/background-selector/${props.diaryData.id}`);
      }
    }catch(error){
      console.log(error);
    }
  };


  const colorChangeHandler = (c) => {
    setColor(c);
    // console.log(c);
  }

  const showColorPickerHandler = () => {
    showColorPicker === "colorPicker" 
      ? setShowColorPicker("colorPicker colorPickerActive") 
      : setShowColorPicker("colorPicker");
  }

  const deleteHandler = async () => {
    console.log("deleting");
    const deletingData = async () => {
      const response = await fetch(
        `${FIREBASE_DOMAIN}/diary/${props.diaryData.id}.json`,
        {
          method: "DELETE",
        }
      );

      if (!response.ok) {
        console.log("Error");
        throw new Error("Something went wrong");
      }
      else {
        console.log("Deleted Successfully");
      }
    };

    try{
      await deletingData();
      history.replace('/all-diary')
    }catch(error){
      console.log(error);
    }
  }
  return (
    
    <Fragment>
     
      <div className={showColorPicker}>
        <Menu updateColor={colorChangeHandler}/>
      </div>
      <div className={classes.bg} style={{'backgroundImage':`url(${bgUrl})`}}/>
      
      <div className={classes.navBar}>
          <div className={classes.bgSelector} onClick={showUnsplashHandler}>
            <MdLandscape size={35} color="white"  />
          </div>
          <div className={classes.menu} onClick={showColorPickerHandler}>
            <MdFormatColorText size={35} color="white" />
          </div>
      </div>

      <div className={classes.dltSaveContainer}>
      <div className={classes.save} onClick={submitHandler}>
        Save
      </div>
      {props.diaryData.id && <div className={classes.save} onClick={deleteHandler}>
        Delete
      </div>}
      </div>
      
      
      <div className={classes.diaryPage}>
        <MyDate
          onClick={openCalanderHandler}
          className={classes.dateParent}
          dateValue={dateValue}
        />
        

        {noteCtx.isOpenCalander && <MyCalendar onChange={dateChangeHandler} />}

        <form onSubmit={submitHandler}>
          <div>
            <input
              className={classes.inputTitle}
              type="text"
              id="title"
              style={{color:color}}
              ref={titleRef}
              defaultValue={props.diaryData.title}
              placeholder="Title..."
            />
          </div>
          <div>
            <textarea
              className={classes.inputContent}
              id="content"
              ref={contentRef}
              defaultValue={props.diaryData.content}
              onKeyUp={contentKepUpHandler}
              style={{color:color, height: `${contentHeight}`, minHeight: `800vh` }}
              placeholder="Start writing..."
            />
          </div>
        </form>
        <GoToTop />
      </div>
    </Fragment>
  );
};

export default InsertDiaryForm;
