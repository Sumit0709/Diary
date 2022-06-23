import classes from './MyDate.module.css';

const MONTH = [
    "Jan",
    "Feb",
    "Mar",
    "Apr",
    "May",
    "Jun",
    "Jul",
    "Aug",
    "Sep",
    "Oct",
    "Nov",
    "Dec",
  ];
  
  const DAY = [
    "Sunday",
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday",
  ];

const MyDate = (props) => {

    const dateValue = props.dateValue; 

  return (
    <div className={classes.dateParent} onClick={props.onClick}>
      <section className={classes.date}>{dateValue.getDate()}</section>
      <div>
        <section className={classes.day}>{DAY[dateValue.getDay()]}</section>

        <div className={classes.belowDay}>
          <section className={classes.month}>
            {MONTH[dateValue.getMonth()]}
          </section>

          <section className={classes.year}>{dateValue.getFullYear()}</section>
        </div>
      </div>
    </div>
  );
};

export const getMonthInAlp = (date) =>{
    return MONTH[date];
}

export default MyDate;