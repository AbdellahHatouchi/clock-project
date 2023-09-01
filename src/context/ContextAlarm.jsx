import { createContext, useEffect, useState } from "react";
import PropTypes from 'prop-types';
import { MONTHS } from "../data";
import Sound from "../alarm-clock.mp3";

const alarm = new Audio(Sound);
export const AlarmContext = createContext();

function ContextAlarm({ children }) {
  const [currentHour, setCurrentHour] = useState("");
  const [currentMinutes, setCurrentMinutes] = useState("");
  const [amPm, setAmPm] = useState("");
  const [currentDay, setCurrentDay] = useState("");
  const [currentMonth, setCurrentMonth] = useState("");
  const [currentYear, setCurrentYear] = useState("");
  // Initialize alarmTime and hasAlarm state from local storage, if available
  const [alarmTime, setAlarmTime] = useState(() => {
    const storedAlarmTime = localStorage.getItem('alarmTime');
    return storedAlarmTime ? JSON.parse(storedAlarmTime) : { hour: '', minutes: '', amPm: '' };
  });

  const [hasAlarm, setHasAlarm] = useState(() => {
    const storedHasAlarm = localStorage.getItem('hasAlarm');
    return storedHasAlarm ? JSON.parse(storedHasAlarm) : false;
  });

  useEffect(() => {
    const intervalID = setInterval(() => {
      let date = new Date();

      let HH = date.getHours(),
        MM = date.getMinutes(),
        day = date.getDate(),
        month = date.getMonth(),
        year = date.getFullYear(),
        ampm = (HH >= 12) ? "PM" : "AM";



      setCurrentHour((HH % 12 || 12).toString().padStart(2, '0'));
      setCurrentMinutes(MM.toString().padStart(2, '0'));
      setAmPm(ampm);
      setCurrentDay(day.toString().padStart(2, '0'));
      setCurrentMonth(MONTHS[month]);
      setCurrentYear(year);
    }, 1000);
    return () => {
      clearInterval(intervalID);
    }
  }, []);

  if (`${alarmTime.hour}:${alarmTime.minutes} ${alarmTime.amPm}` === `${currentHour}:${currentMinutes} ${amPm}`) {
    alarm.play();
    document.body.classList.add('active');
    alarm.loop = true;
  }

  const pauseAlarm = () => {
    alarm.pause();
    document.body.classList.remove('active');
    setAlarmTime({hour:"",minutes:"",amPm:""});
  };

  // Save alarmTime and hasAlarm to local storage whenever they change
  useEffect(() => {
    localStorage.setItem('alarmTime', JSON.stringify(alarmTime));
  }, [alarmTime]);

  useEffect(() => {
    localStorage.setItem('hasAlarm', JSON.stringify(hasAlarm));
  }, [hasAlarm]);

  return (
    <AlarmContext.Provider
      value={{
        alarm,
        currentHour,
        currentMinutes,
        amPm,
        currentDay,
        currentMonth,
        currentYear,
        alarmTime,
        setAlarmTime,
        pauseAlarm,
        hasAlarm,
        setHasAlarm,
      }}
    >
      {children}
    </AlarmContext.Provider>
  );
}

ContextAlarm.propTypes = {
  children: PropTypes.oneOfType([
    PropTypes.node,
    PropTypes.arrayOf(PropTypes.element),
  ]).isRequired
}

export default ContextAlarm;
