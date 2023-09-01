import { useContext, useState, useEffect, useRef, useMemo } from 'react';
import { AlarmContext } from '../context/ContextAlarm';

function CountdownTimer() {
  const { alarmTime,setHasAlarm,setAlarmTime,hasAlarm } = useContext(AlarmContext);
  const { hour, minutes, amPm } = alarmTime;
  const currentDate = new Date();

  const targetDate = useMemo(() => {
    // Calculate the target date based on alarmTime
    const newTargetDate = new Date(currentDate);
    if (hour || minutes) {
      newTargetDate.setHours(
        +hour + (amPm === 'PM' && +hour !== 12 ? 12 : 0),
        +minutes,
        0,
        0
      );
      // Check if the selected time is in the past, if so, add 1 day
      if (newTargetDate < currentDate) {
        newTargetDate.setDate(newTargetDate.getDate() + 1);
      }
    }
    return newTargetDate;
  }, [hour, minutes, amPm, currentDate]);
  const differenceRef = useRef(targetDate - new Date());
  const [delay, setDelay] = useState(differenceRef.current);

  const h = !hour ? '00' : Math.floor((differenceRef.current / (1000 * 60 * 60)) % 24).toString().padStart(2, '0');
  const m = !minutes ? '00' : Math.floor((differenceRef.current / 1000 / 60) % 60).toString().padStart(2, '0');
  const s = !hour ? '00' : Math.floor((differenceRef.current / 1000) % 60).toString().padStart(2, '0');
  useEffect(() => {
    let timerID;
    timerID = setInterval(() => {
      const newDifference = targetDate - new Date(currentDate);
      differenceRef.current = newDifference; // Update the useRef value
      setDelay(newDifference); // Update delay based on the new difference
      if (newDifference <= 0) {
        clearInterval(timerID);
        setAlarmTime({hour:"",minutes:"",amPm:""});
        setHasAlarm(false);
        return;
      }
    }, 1000);

    // Clear the interval when the component unmounts
    return () => {
      clearInterval(timerID);
    };
  }, [targetDate,delay,currentDate,setAlarmTime,setHasAlarm]);
  return (
    <div>
      <span className="font-bold text-5xl text-yellow-300">
        {h}:{m}:{s}
      </span>
      {!hasAlarm && <span className='text-white text-xs block mt-2'>Let`s get started by configuring the alarm</span>}
    </div>
  );
}

export default CountdownTimer;
