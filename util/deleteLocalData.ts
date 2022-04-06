export default function deleteLocalData() {
  if (typeof window === "undefined") {
    return;
  }

  window.localStorage.removeItem("startTime")
  window.localStorage.removeItem("endTime")
  window.localStorage.removeItem("showResultScreen")
  window.localStorage.removeItem("poops")
}