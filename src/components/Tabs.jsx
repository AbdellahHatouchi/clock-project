import useTab from "../hooks/useTab";
import PropTypes from 'prop-types';


function Tabs({ id, label }) {
  const { activeTab, handleTabClick } = useTab();
  return (
    <button
      onClick={() => handleTabClick(id)}
      className={`px-4 py-2 rounded ${
        activeTab === id ? 'bg-blue-500 text-white' : 'bg-gray-200 text-gray-700'
      }`}
    >
      {label}
    </button>
  );
}

function TabContent({ id,children }) {
    const { activeTab } = useTab();
  return <div className={`p-4 w-md h-56 border rounded duration-300 flex justify-center items-center ${activeTab != id ? "hidden" : ""}`}>{children}</div>;
}
Tabs.propTypes = {
    id : PropTypes.number.isRequired,
    label : PropTypes.string.isRequired
}
TabContent.propTypes = {
    id : PropTypes.number.isRequired,
    children: PropTypes.oneOfType([
      PropTypes.node,
      PropTypes.arrayOf(PropTypes.element),
    ]).isRequired
  }
export { Tabs, TabContent };
