const promotedCheckbox = document.getElementById("promoted");

function saveCheckboxState() {
  const promotedChecked = promotedCheckbox.checked;

  chrome.storage.local.set({
    "promotedChecked": promotedChecked,
  }, function () {
    if (chrome.runtime.lastError) {
      console.error(chrome.runtime.lastError);
    }
  });
}


function loadCheckboxState() {
  chrome.storage.local.get(["promotedChecked", "suggestedChecked"], function (result) {
    const promotedChecked = result.promotedChecked;
    promotedCheckbox.checked = promotedChecked;
  });
}


if (promotedCheckbox) {
  promotedCheckbox.addEventListener("click", saveCheckboxState);
}

loadCheckboxState();
