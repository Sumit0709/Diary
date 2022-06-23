import React, { Fragment, useEffect, useState } from "react";
import { useParams, useHistory } from "react-router-dom";

import LoadingSpinner from "../ui/LoadingSpinner";
import InsertDiaryForm from "./InsertDiaryForm";

const FIREBASE_DOMAIN = 'https://diary-4u-default-rtdb.firebaseio.com';

const defaultBG = [
  "https://images.unsplash.com/photo-1580826237584-fda5b612e1bc?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=MnwyOTQ4MjF8MHwxfHNlYXJjaHwyM3x8cGxhaW58ZW58MHx8fHwxNjU1ODE3MDkx&ixlib=rb-1.2.1&q=80&w=1080",
  "https://images.unsplash.com/photo-1655833018337-08bd2c4cc17b?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=MnwyOTQ4MjF8MHwxfGFsbHwyOXx8fHx8fDJ8fDE2NTU5NjI3MDg&ixlib=rb-1.2.1&q=80&w=1080",
  "https://images.unsplash.com/photo-1476820865390-c52aeebb9891?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=MnwyOTQ4MjF8MHwxfHNlYXJjaHwxMXx8YmFja2dyb3VuZHxlbnwwfHx8fDE2NTU4OTAwMDM&ixlib=rb-1.2.1&q=80&w=1080",
  "https://images.unsplash.com/photo-1507608158173-1dcec673a2e5?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=MnwyOTQ4MjF8MHwxfHNlYXJjaHwyMXx8YmFja2dyb3VuZHxlbnwwfHx8fDE2NTU4OTAwMDM&ixlib=rb-1.2.1&q=80&w=1080"
]


const InsertDiary = () => {

  const history = useHistory();

    const params = useParams();
    const diaryId = params.diaryId;

    const [diaryData, setDiaryData] = useState({title:'', content:'',id:null});
    const [isLoading, setIsLoading] = useState(false);

    const insertDiaryHandler = async (diary) => {

      const submittingData = async()=>{
        console.log(diary);
        const response = await fetch('https://diary-4u-default-rtdb.firebaseio.com/diary.json',{
          method:'POST',
          body: JSON.stringify({
            ...diary
          }),
          headers: {
            "Content-Type": "application/json"
          }
        });

        if(!response.ok){
          console.log('Error');
          throw new Error('Something went wrong');
        }
      } 

      const updatingData = async()=>{
        const response = await fetch(
          `${FIREBASE_DOMAIN}/diary/${diaryId}.json`,
          {
            method: "PUT",
            body: JSON.stringify({
              ...diary
            }),
            headers: {
              "Content-Type": "application/json",
            },
          }
        );

        if(!response.ok){
          console.log('Error');
          throw new Error('Something went wrong');
        }
      }

      if(diaryId){
        try{
          await updatingData();
          history.replace('/all-diary');
        }catch(error){
          console.log('error');
        }
       
      }else{
        try{
          await submittingData();
          history.replace('/all-diary');
        }catch(error){
          console.log(error);
        }
      }
    }

    useEffect(()=>{
      const loadDiaryData = async ()=>{
        setIsLoading(true);
        const response = await fetch(`${FIREBASE_DOMAIN}/diary/${diaryId}.json`);
        if(!response.ok){
          throw new Error('Error in loading data');
        }

        const responseData = await response.json();

        setDiaryData({
          ...responseData,
          id: diaryId
        })
        setIsLoading(false);
      }

      if(diaryId){
        try{
          loadDiaryData();
        }catch(error){
          console.log('error');
        }
       
      }
    },[diaryId]);

    const bgUrl = diaryData.bgUrl? diaryData.bgUrl : defaultBG[Math.floor(Math.random()*4)];   const finalDiaryData = {...diaryData, bgUrl:bgUrl};

    if (isLoading) {
      return (
        <div className="centered">
          <LoadingSpinner/>
        </div>
      );
    }

  return (
    <Fragment>
      <InsertDiaryForm insertDiary={insertDiaryHandler} diaryData={finalDiaryData}/>
    </Fragment>
  );
};

export default InsertDiary;