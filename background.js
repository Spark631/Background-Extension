let message = "Hello";

chrome.runtime.onInstalled.addListener(() => {
    chrome.storage.sync.set({key: message});
    console.log("The message has been set");
});