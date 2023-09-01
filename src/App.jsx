import ContextAlarm from './context/ContextAlarm';
import DigitalClock from './components/DigitalClock';
import AlarmOption from './components/AlarmOption';
import ClockTabs from './components/ClockTabs';
import './App.css'
import 'react-clock/dist/Clock.css';
import 'react-toastify/dist/ReactToastify.css';

function App() {
  return (
    <ContextAlarm>
      <ClockTabs />
      {/* this is the digital clock */}
      <DigitalClock />
      {/* this for config alarm */}
      <AlarmOption />
    </ContextAlarm>
  )
}

export default App
