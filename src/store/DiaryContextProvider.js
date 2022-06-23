import React, { useState, useReducer } from 'react';

import DiaryContext from './diary-context'

const DiaryContextProvider = (props) => {

    const [allDiary, setAllDiary] = useState([]);
    const [openCalander, setOpenCalander] = useState(false);
    const [url,setURL] = useState("");

    const isOpenCalanderHandler = () => {
        setOpenCalander(!openCalander);
        console.log(openCalander);
    }

    const insertDiaryHandler = (notes) => {
        const diaryAfterInsertion = allDiary
        diaryAfterInsertion.push(notes);
        console.log(diaryAfterInsertion);
        setAllDiary(diaryAfterInsertion);
    }
    const removeDiaryHandler = (id) => {
        const diaryAfterRemoval = allDiary.filter((diary)=>diary.id != id);
        setAllDiary(diaryAfterRemoval);
    }

    const setBgURLHandler = (url) => {
        setURL(url);
    }

    const contextValues = {
        allDiary: allDiary,
        isOpenCalander: openCalander,
        bgURL: url,
        setIsOpenCalander: isOpenCalanderHandler,
        insertDiary: insertDiaryHandler,
        removeDiary: removeDiaryHandler,
        setBgURL: setBgURLHandler
    }

    return <DiaryContext.Provider value={contextValues}>
        {props.children}
    </DiaryContext.Provider>
}

export default DiaryContextProvider;