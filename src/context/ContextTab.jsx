import { createContext, useState } from 'react';
import PropTypes from 'prop-types';

const TabContext = createContext();

function TabProvider({ children }) {
    const [activeTab, setActiveTab] = useState(0);

    const handleTabClick = (tabId) => {
        setActiveTab(tabId);
    };

    return (
        <TabContext.Provider value={{ activeTab, handleTabClick }}>
            {children}
        </TabContext.Provider>
    );
}
export {TabContext}
export default TabProvider;
TabProvider.propTypes = {
    children: PropTypes.oneOfType([
        PropTypes.node,
        PropTypes.arrayOf(PropTypes.element),
    ]).isRequired
}
