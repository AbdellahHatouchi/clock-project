import TabProvider from "../context/ContextTab"
import AnalogClock from "./AnalogClock"
import CountDown from "./CountDown"
import { TabContent, Tabs } from "./Tabs"


const ClockTabs = () => {
  return (
    <TabProvider>
        <div className="flex items-center justify-center">
        <div className="max-w-md mx-auto p-4">
          <div className="flex space-x-4">
            <Tabs id={0} label="Analog Clock" />
            <Tabs id={1} label="Clock Down" />
          </div>
          <div className="mt-4">
            <TabContent id={0}>
                {/* analog clock */}
                <AnalogClock />
            </TabContent>
            <TabContent id={1}>
                {/* count down timer */}
                <CountDown />
            </TabContent>
          </div>
        </div>
      </div>
    </TabProvider>
  )
}

export default ClockTabs