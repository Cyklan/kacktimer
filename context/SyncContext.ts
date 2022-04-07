import { createContext } from "react";

const SyncContext = createContext<Function>(() => {});

export default SyncContext;