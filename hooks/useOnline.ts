import { createContext, useEffect, useState } from "react";


export default function useOnline() {
  
  const [online, setOnline] = useState(window.navigator.onLine);
  const OnlineContext = createContext(online);

  useEffect(() => {
    window.addEventListener("online", () => {
      setOnline(true);
    })
  
    window.addEventListener("offline", () => {
      setOnline(false);
    })
    
    return () => {
      window.removeEventListener("online", () => {
        setOnline(true);
      })
    
      window.removeEventListener("offline", () => {
        setOnline(false);
      })
    }
  }, [])

  return OnlineContext;
  
}