import { useContext } from "react";
import { AlarmContext } from "../context/ContextAlarm";

function DigitalClock() {
  const { currentHour, currentMinutes, amPm, currentDay, currentMonth, currentYear } =
    useContext(AlarmContext);

  return (
    !currentHour ? <div>Loading...</div> :
      <div>
        <div className="flex justify-center">
          <div className="font-medium text-5xl">{`${currentHour}:`}</div>
          <div className="font-medium text-5xl">{currentMinutes}</div>
          <div className="font-medium text-sm justify-self-start">{amPm}</div>
        </div>

        <div className="text-center font-medium text-sm">
          <span>{`${currentDay} `}</span>
          <span>{`${currentMonth} , `}</span>
          <span>{currentYear}</span>
        </div>
      </div>

  );
}

export default DigitalClock;