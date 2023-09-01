import { useContext } from "react";
import useSelect from "../hooks/useSelect";
import { AlarmContext } from "../context/ContextAlarm";
import { hourNumbers, minutesNumbers } from "../data";
import { ToastContainer, toast } from 'react-toastify';

function AlarmOption() {
  const [hour, setHour] = useSelect("Hour");
  const [minutes, setMinutes] = useSelect("Minutes");
  const [amPmOption, setAmPmOption] = useSelect("Am-Pm");
  const { setAlarmTime, pauseAlarm, hasAlarm, setHasAlarm } =
    useContext(AlarmContext);

  const setAlarm = () => {
    if (hasAlarm) {
      pauseAlarm();
      setHasAlarm(false);
      return;
    }

    if (
      !hour.includes("Hour") &&
      !minutes.includes("Minutes") &&
      !amPmOption.includes("Am-Pm")
    ) {
      setHasAlarm(true);
      setAlarmTime({ hour, minutes, amPm: amPmOption });
    } else {
      toast.error('Please Set your alarm time.', {
        position: "top-right",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "light",
      });
    }
  };

  const selectClasses = "bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"


  return (
    <div className="flex flex-col gap-4 p-4">
      <div className={`flex gap-3 ${hasAlarm && "disable"}`}>
        <select className={selectClasses} {...setHour}>
          <option disabled value="Hour">
            Hour
          </option>
          {hourNumbers.map((hour, index) => (
            <option key={index} value={hour}>
              {hour}
            </option>
          ))}
        </select>
        <select className={selectClasses} {...setMinutes}>
          <option disabled value="Minutes">
            Minutes
          </option>
          {minutesNumbers.map((minutes, index) => (
            <option key={index} value={minutes}>
              {minutes}
            </option>
          ))}
        </select>
        <select className={selectClasses} {...setAmPmOption}>
          <option disabled value="Am-Pm">
            Am/Pm
          </option>
          <option value="AM">Am</option>
          <option value="PM">Pm</option>
        </select>
      </div>
      <button
        onClick={setAlarm}
        className={`focus:outline-none text-white bg-purple-700 hover:bg-purple-800 focus:ring-4 focus:ring-purple-300 font-medium rounded-lg text-sm px-5 py-2.5 mb-2 dark:bg-purple-600 dark:hover:bg-purple-700 dark:focus:ring-purple-900 ${hasAlarm && "play"}`}
      >
        {hasAlarm ? "Clear Alarm" : "Set Alarm"}
      </button>
      <ToastContainer />
    </div>
  );
}

export default AlarmOption;
