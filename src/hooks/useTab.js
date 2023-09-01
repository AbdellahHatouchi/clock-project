import { useContext } from "react";
import { TabContext } from "../context/ContextTab";

function useTab() {
    return useContext(TabContext);
}

export default useTab;