import { useState } from "react";
import "./App.css";
import CircularProgress from "./components/circularIndicator";
import ToggleSwitch from "./components/toggle";
import SummaryBoard from "./components/summary";

function App() {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(false);
  const [isOn, setIsOn] = useState(false);
  const [fetchData, setFetch] = useState(false);
  const [isTermsPage, setIsTermsPage] = useState(true);

  // // Load state from chrome.storage (in your React component)
  // const loadStateFromStorage = () => {
  //   chrome.storage.local.get("extensionState", (result) => {
  //     if (result.extensionState) {
  //       console.log("Loaded state:", result.extensionState);
  //         // Use the loaded state to set your React component's state
  //     }
  //   });
  // };

  // useEffect(() => {
  //   loadStateFromStorage();
  // }, []);

  // const saveStateToStorage = (state: any) => {
  //   chrome.storage.local.set({ extensionState: state }, () => {
  //     console.log("State saved to storage:", state);
  //   });
  // };

  // Function to fetch data

  // const backendCall = async () => {
  //   setLoading(true);
  //   const pageText = await sendMessageToContentScript("readTC");
  //   console.log(pageText);
  //   const reqestoptions = {
  //     method: "POST",
  //     body: JSON.stringify({
  //       content: pageText,
  //     }),
  //   };
  //   try {
  //     const response = await fetch(
  //       "http://127.0.0.1:8000/exBack/",
  //       reqestoptions
  //     );
  //     const result = await response.json();
  //     setData(result);
  //   } catch (error) {
  //     console.error("Error fetching data:", error);
  //     setData(null);
  //   } finally {
  //     setLoading(false);
  //   }
  // };
  // //Content.js Communication
  // const sendMessageToContentScript = async (message: string) => {
  //   try {
  //     await chrome.tabs.query(
  //       { active: true, currentWindow: true },
  //       async (tabs) => {
  //         if (tabs[0]?.id) {
  //           await chrome.tabs.sendMessage(
  //             tabs[0].id,
  //             { action: message },
  //             (pageText) => {
  //               console.log("Response from content script:", pageText);
  //               return pageText;
  //             }
  //           );
  //         }
  //       }
  //     );
  //   } catch (error) {
  //     console.error("Error communicating with content script:", error);
  //     return null;
  //   }
  // };

  const backendCall = async () => {
    setLoading(true); // Set loading state first
    try {
      const pageText = await sendMessageToContentScript("readTC");
      console.log(pageText);
      if (pageText === null) {
        setIsTermsPage(false);
        return null;
      }
      const requestOptions = {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          content: pageText,
        }),
      };

      const response = await fetch(
        "http://127.0.0.1:8000/exBack/",
        requestOptions
      );
      const result = await response.json();
      setData(result);
    } catch (error) {
      console.error("Error fetching data:", error);
      setData(null);
    } finally {
      setLoading(false);
    }
  };

  // Content.js Communication
  const sendMessageToContentScript = (message: string) => {
    return new Promise((resolve, reject) => {
      chrome.tabs.query({ active: true, currentWindow: true }, (tabs) => {
        if (tabs[0]?.id) {
          chrome.tabs.sendMessage(
            tabs[0].id,
            { action: message },
            (pageText) => {
              if (chrome.runtime.lastError) {
                console.error(
                  "Error communicating with content script:",
                  chrome.runtime.lastError
                );
                reject(chrome.runtime.lastError);
              } else {
                resolve(pageText);
              }
            }
          );
        } else {
          reject(new Error("No active tab found"));
        }
      });
    });
  };

  if (loading) {
    return (
      <>
        <h1 className="font-bold text-6xl font-abang fixed top-0 left-0 bg-[#242424]  py-6 w-full ">
          HARPO
          <span className="text-[0px]">read between the lines</span>
        </h1>
        <h1 className="font-bold pt-28">Loading...</h1>
      </>
    );
  }
  if (!fetchData) {
    return (
      <>
        <h1 className="font-bold text-6xl font-abang fixed top-0 left-0 bg-[#242424]  py-6 w-full ">
          HARPO
          <span className="text-[0px]">read between the lines</span>
        </h1>
        <div className={` py-[12rem] ${fetchData ? "hidden" : ""}`}>
          <button
            className="px-4 py-4 text-lg font-semibold font-mono"
            onClick={() => {
              backendCall();
              setFetch(true);
            }}
          >
            Check Terms and conditions
          </button>
        </div>
      </>
    );
  } else {
    if (isTermsPage) {
      return (
        <>
          <h1 className="font-bold text-6xl font-abang fixed top-0 left-0 bg-[#242424]  py-6 w-full ">
            HARPO
            <span className="text-[0px]">read between the lines</span>
          </h1>

          <div>
            <div className="fixed left-0 right-0 top-24 hover:scale-110 duration-500 transition-all ease-in-out  bg-[#242424] py-2 ">
              <ToggleSwitch isOn={isOn} setIsOn={setIsOn} />
            </div>
            <div
              className={`pt-32 flex justify-center items-center ${
                isOn ? "hidden" : ""
              }`}
            >
              <CircularProgress
                percentage={
                  data != null && data["score"] != null ? data["score"] : 0
                }
              />
            </div>
            <div className={`py-20 mt-16 px-[-8] ${!isOn ? "hidden" : ""}`}>
              <SummaryBoard
                summary={
                  data != null && data["short_summary"] != null
                    ? data["short_summary"]
                    : "There seems to be an issue.\n Please check your cconnection or try again"
                }
              />
            </div>
          </div>
        </>
      );
    } else {
      return (
        <h1 className="font-semibold font-mono text-xl">
          Terms not found <br /> Please retry on a Terms Page{" "}
        </h1>
      );
    }
  }
  // Toggle the switch
}

export default App;
