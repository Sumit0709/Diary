import React, { Fragment, useEffect, useState } from "react";

import { useHistory, useParams } from "react-router-dom";

import classes from "./Unsplash.module.css";
import Image from "./Image";
import { unsplashApi } from "./unsplash-api";
import { MdOutlineClose,MdSearch } from "react-icons/md";


const FIREBASE_DOMAIN = "https://diary-4u-default-rtdb.firebaseio.com";


const Unsplash = (props) => {

  const history = useHistory();
  const params = useParams();
  const diaryId = params.diaryId;

  const [urlList, setUrlList] = useState([]);
  const [search, setSearch] = useState("");
  const [diaryData, setDiaryData] = useState({});


  useEffect(() => {
    let urls = [];
    const fetchData = async () => {
      urls = await unsplashApi({ search: null });
      setUrlList(urls);
    };
    fetchData();
  }, [setUrlList]);

  useEffect(()=>{
    const startFectching = async () => {
      const fetchedDiaryData = await fetchDiaryData();
      setDiaryData(fetchedDiaryData);
    }

    startFectching();
  },[]);

  const searchImageHandler = () => {
      let urls = [];
      const fetchData = async () => {
        urls = await unsplashApi({ search: search });
        setUrlList(urls);
      };
      fetchData();
  }

  const searchBoxChangeHandler = (e) => {
      setSearch(e.target.value);
  }
  
  const fetchDiaryData = async () => {
    let diaryData = {};

    const fetchData = async () => {
      const response = await fetch(
        `${FIREBASE_DOMAIN}/diary/${diaryId}.json`
      );

      if (!response.ok) {
        throw new Error("Error in fetching data from server");
      }

      const responseData = await response.json();

      diaryData = {
        title: responseData.title,
        content: responseData.content,
        dateValue: responseData.dateValue,
        bgUrl: responseData.bgUrl,
        color: responseData.color
      };
    };

    try {
      await fetchData();
      return diaryData;
    } catch (error) {
      console.log(error);
    }
  };
  

  const closeBackgroundHandler = () => {
    history.replace(`/diary/${diaryId}`);
  }


  const uploadBgUrl = async (diaryData,bg) => {
    const uploadUrl = async () => {
      const response = await fetch(
        `${FIREBASE_DOMAIN}/diary/${diaryId}.json`,
        {
          method: "PUT",
          body: JSON.stringify({

            ...diaryData,
            bgUrl: bg
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

    try {
      await uploadUrl();
      history.replace(`/diary/${diaryId}`)
    } catch (error) {
      console.log(error);
    }
  };

  const imageClickHandler = async (bg) => {
    await uploadBgUrl(diaryData,bg);
  };

  return (
    <Fragment>
      
      
        <div className={classes.bg}>
            <div className={classes.title}>Choose background</div>
            <div className={classes.close}>
              <div className={classes.search}>
                <input className={classes.searchBox} type="text" onChange={searchBoxChangeHandler}/>
                <MdSearch size={25} onClick={searchImageHandler}/>
              </div>
              <MdOutlineClose size={25} onClick={closeBackgroundHandler}/>
            </div>
            
            <div className={classes.imgList}>

              {urlList.map((imgUrl) => (
                <div className={classes.gridItem} key={imgUrl.id}>
                  <Image imgUrl={imgUrl} diaryId={diaryId} diaryData={diaryData} clickHandler={imageClickHandler} />
                </div>
              ))}
            </div>
      </div>
    </Fragment>
  );
};

export default Unsplash;
