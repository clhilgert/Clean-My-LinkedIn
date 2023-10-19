chrome.storage.local.get(["promotedChecked"], function (result) {
  if (chrome.runtime.lastError) {
    console.error(chrome.runtime.lastError);
  } else {
    const promotedChecked = result.promotedChecked;
  }
});