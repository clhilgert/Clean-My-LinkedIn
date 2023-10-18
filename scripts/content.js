const promotedCheckbox = document.getElementById("promoted");
const suggestedCheckbox = document.getElementById("suggested");

function saveState() {
  chrome.storage.sync.set({
    promotedChecked: promotedCheckbox.checked,
    suggestedChecked: suggestedCheckbox.checked,
  });
}

function loadState() {
  chrome.storage.sync.get({
    promotedChecked: false,
    suggestedChecked: false,
  }, (items) => {
    if (promotedCheckbox) {
      promotedCheckbox.checked = items.promotedChecked;
    }
    if (suggestedCheckbox) {
      suggestedCheckbox.checked = items.suggestedChecked;
    }
  });
}

if (promotedCheckbox) {
  promotedCheckbox.addEventListener("click", () => {
    findAndDeleteRelative(document);
    saveState();
  });
}

if (suggestedCheckbox) {
  suggestedCheckbox.addEventListener("click", () => {
    saveState();
  });
}

window.addEventListener('load', () => {
  loadState();
});

chrome.runtime.onMessage.addListener((message, sender, sendResponse) => {
  if (message === "popupOpened") {
    loadState();
  }
});

function findAndDeleteRelative(targetNode) {
  const spans = targetNode.querySelectorAll('span');

  if (promotedCheckbox.checked) {
    console.log(promotedCheckbox, " in function");
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
}

window.addEventListener('load', () => {
  console.log(promotedCheckbox, " outside function");
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