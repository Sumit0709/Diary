import React from "react";

const DiaryContext = React.createContext({
    allDiary: [],
    bgURL: "",
    isOpenCalander: false,
    setIsOpenCalander: ()=>{},
    setBgURL: ()=>{},
    insertDiary: ()=>{},
    removeDiary: ()=>{}

});

export default DiaryContext;