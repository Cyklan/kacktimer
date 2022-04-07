import { useEffect } from "react";
import toast from "react-hot-toast";
import LocalStorageKeys from "../model/LocalStorageKeys";
import Poop from "../model/Poop";
import { SyncResponsePayload } from "../pages/api/sync";
import useLocalStorage from "./useLocalStorage";

export interface SyncPayload {
  localOnlyPoops: Poop[];
  localPoopsInDB: string[];
}

export default function useDataSync() {
  const [poops, setPoops] = useLocalStorage<Poop[]>(LocalStorageKeys.poops, []);

  function getSyncPayload() {
    const localOnlyPoops = poops.filter(x => !x.inDatabase);
    const localPoopsInDB = poops.filter(x => x.inDatabase);

    const payload: SyncPayload = {
      localOnlyPoops,
      localPoopsInDB: localPoopsInDB.map(x => x.id)
    };
  }

  function syncData() {
    const payload = getSyncPayload();
    return fetch("/api/sync", {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify(payload)
    })
      .then(response => response.json())
      .then((response: SyncResponsePayload) => {
        const newPoops = response.cloudOnlyPoops;
        const insertedPoopIds = response.insertedPoops;

        const uploadedPoops: Poop[] = poops.filter(x => !x.inDatabase).map(x => ({
          inDatabase: insertedPoopIds.includes(x.id),
          ...x
        }));

        setPoops([...uploadedPoops, ...newPoops]);
      })
      .catch(error => console.error(error));
  }

  function toastedSync() {
    toast.promise(syncData(), {
      error: "Konnte Daten nicht synchronisieren",
      loading: "Synchronisiere Daten...",
      success: "Daten wurden synchronisiert"
    });
  }

  useEffect(() => {
    // register scheduled task, every 10 minutes
    const interval = setInterval(() => toastedSync(), 10 * 60 * 1000);

    return () => {
      clearInterval(interval);
    };
  }, []);

  return toastedSync;
}