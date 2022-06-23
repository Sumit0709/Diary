import React, { useEffect, useState } from "react";

import DetailDiary from "./DetailDiary";
import classes from "./AllDiary.module.css";
import LoadingSpinner from "../ui/LoadingSpinner";
import GoToTop from "../layout/GoToTop";

const AllDiary = (props) => {
  const [diaryAllData, setDiaryAllData] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    const fetchDiaryData = async () => {
      setIsLoading(true);
      const response = await fetch(
        "https://diary-4u-default-rtdb.firebaseio.com/diary.json",
        {
          method: "GET",
        }
      );

      if (!response.ok) {
        console.log("Error in fetching");
        throw new Error("Can't fetch data! An error occured");
      }

      const responseData = await response.json();

      const allDiary = [];
      for (const diary in responseData) {
        allDiary.push({
          id: diary,
          title: responseData[diary].title,
          content: responseData[diary].content,
          dateValue: responseData[diary].dateValue,
          bgUrl: responseData[diary].bgUrl,
        });
      }
      allDiary.reverse();
      setDiaryAllData(allDiary);
      setIsLoading(false);
    };

    fetchDiaryData().catch((error) => {
      setIsLoading(false);
      console.log(error);
    });
  }, [setDiaryAllData]);

  if (isLoading) {
    return (
      <div className="centered">
        <LoadingSpinner />
      </div>
    );
  }

  return (
    <div>
      <div className={classes.heading}></div>
      <div className={classes.allDiaryPreview}>
        {diaryAllData.map((diary) => (
          <div className={classes.allDiaryPreviewItem} key={diary.id}>
          <DetailDiary diary={diary} />
          </div>
        ))}
      </div>
      <GoToTop />
    </div>
  );
};

export default AllDiary;
