import { useState,useEffect, useContext } from 'react';
import Clock from "react-clock"
import { AlarmContext } from '../context/ContextAlarm';


const AnalogClock = () => {
    const [value, setValue] = useState(new Date());
    const {alarm} = useContext(AlarmContext);
    useEffect(() => {
        const interval = setInterval(() => setValue(new Date()), 1000);
        return () => {
            clearInterval(interval);
        };
    }, []);

    useEffect(() => {
        const currentDate = new Date();
        const currentHours12 = (currentDate.getHours() % 12 || 12);
        if (currentDate.getSeconds() === currentHours12) {
            alarm.play();
            document.body.classList.add('active');
            alarm.loop = true;
        } else if (currentDate.getSeconds() == 0) {
            alarm.pause();
            document.body.classList.remove('active');
        }
    }, [alarm,value])
    return (
        <Clock value={value} className={"text-white border-white"} />
    )
}

export default AnalogClock