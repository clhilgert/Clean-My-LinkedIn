chrome.storage.local.get(["promotedChecked", "suggestedChecked"], function (result) {
  if (chrome.runtime.lastError) {
    console.error(chrome.runtime.lastError);
  } else {
    const promotedChecked = result.promotedChecked;
    const suggestedChecked = result.suggestedChecked;
    if (promotedChecked || suggestedChecked) {
      runScripts();
    }
  }
});

function runScripts() {

  function findAndDeleteRelative(targetNode) {
    const spans = targetNode.querySelectorAll('span');

    for (const span of spans) {
      if (span.textContent.includes("Promoted")) {
        let currentNode = span.parentElement;
        while (currentNode) {
          if (currentNode.classList.contains("full-height")) {
            if (currentNode.parentNode) {
              currentNode.parentNode.removeChild(currentNode);
            }
            break;
          }
          currentNode = currentNode.parentElement;
        }
      }
    }
  }

  window.addEventListener('load', () => {
    findAndDeleteRelative(document);

    const observer = new MutationObserver((mutationsList, observer) => {
      for (const mutation of mutationsList) {
        if (mutation.type === 'childList') {
          for (const addedNode of mutation.addedNodes) {
            if (addedNode.nodeType === Node.ELEMENT_NODE) {
              findAndDeleteRelative(addedNode);
            }
          }
        }
      }
    });

    observer.observe(document, { childList: true, subtree: true });
  });
}


