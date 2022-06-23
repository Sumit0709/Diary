import React, { Fragment, useContext, useEffect, useState } from "react";
import { useParams, useHistory } from "react-router-dom";

import DiaryContext from "../../store/diary-context";
import InsertDiaryForm from "./InsertDiaryForm";

const FIREBASE_DOMAIN = 'https://diary-4u-default-rtdb.firebaseio.com';

const InsertDiary = () => {

  const history = useHistory();

    const params = useParams();
    // console.log(params.diaryId);
    const diaryId = params.diaryId;

    const diaryCtx = useContext(DiaryContext);
    const [diaryData, setDiaryData] = useState({title:'', content:'',id:null});

    const [isSubmitting, setIsSubmitting] = useState(false);

    useEffect(()=>{
      const loadDiaryData = async ()=>{
        const response = await fetch(`${FIREBASE_DOMAIN}/diary/${diaryId}.json`);
        if(!response.ok){
          throw new Error('Error in loading data');
        }

        const responseData = await response.json();

        setDiaryData({
          ...responseData,
          id: diaryId
        })
        console.log(responseData);
      }

      if(diaryId){
        try{
          loadDiaryData();
        }catch(error){
          console.log('error');
        }
       
      }
    },[]);

    const bgUrl = diaryData.bgUrl? diaryData.bgUrl : 'https://images.unsplash.com/photo-1529035669594-2eb2080f1585?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxzZWFyY2h8MXx8c3Vuc2V0JTIwY2xvdWR8ZW58MHx8MHx8&w=1000&q=80';//'https://images.unsplash.com/photo-1556139943-4bdca53adf1e?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxzZWFyY2h8Mjh8fHZlY3RvcnxlbnwwfHwwfHw%3D&auto=format&fit=crop&w=500&q=60';
    const finalDiaryData = {...diaryData, bgUrl:bgUrl};

  return (
    <Fragment>
      <InsertDiaryForm diaryData={finalDiaryData}/>
    </Fragment>
  );
};

export default InsertDiary;