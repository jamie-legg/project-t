  import axios from "axios";
import { Tab } from "./page";

  export const idGenerator = () => {
    return Math.random().toString(36).substr(2, 9);
  };

  export const classNames = (...classes: string[]) => classes.filter(Boolean).join(" ");

  export const sendTab = async (tab: Tab) => {

    // use axios to send a request
    const response = await axios.post('http://localhost:3300/tab', { tab })
    return response.data;
    
  }