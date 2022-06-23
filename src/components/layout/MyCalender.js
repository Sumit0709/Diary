import { useContext, useState } from 'react';

import Calendar from 'react-calendar';
import Modal from '../ui/Modal';
import DiaryContext from '../../store/diary-context';

const MyCalendar = (props) => {

    const diaryCtx = useContext(DiaryContext);
    const [dateValue, setDateValue] = useState(new Date());

    const closeCalanderHandler = () => {
        diaryCtx.setIsOpenCalander(false);
      };

      const dateChangeHandler = (value) => {
          props.onChange(value);
      };

    return (
        <Modal onClose={closeCalanderHandler}>
            <Calendar
              onChange={dateChangeHandler}
              value={dateValue}
              maxDate={new Date()}
              clearIcon={null}
              isOpen={diaryCtx.isOpenCalander}
              onCalendarClose={closeCalanderHandler}
            />
          </Modal>
    );
}

export default MyCalendar;