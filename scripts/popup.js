function saveCheckboxState(checkbox, key) {
  const checkedState = checkbox.checked;

  const data = {};
  data[key] = checkedState;

  chrome.storage.local.set(data, function () {
    if (chrome.runtime.lastError) {
      console.error(chrome.runtime.lastError);
    }
  });
}

function loadCheckboxState(checkbox, key) {
  chrome.storage.local.get([key], function (result) {
    const checkedState = result[key];
    checkbox.checked = checkedState;
  });
}

const promotedCheckbox = document.getElementById("promoted");
const suggestedCheckbox = document.getElementById("suggested");

if (promotedCheckbox) {
  promotedCheckbox.addEventListener("click", function () {
    saveCheckboxState(promotedCheckbox, "promotedChecked");
  });
}

if (suggestedCheckbox) {
  suggestedCheckbox.addEventListener("click", function () {
    saveCheckboxState(suggestedCheckbox, "suggestedChecked");
  });
}

loadCheckboxState(promotedCheckbox, "promotedChecked");
loadCheckboxState(suggestedCheckbox, "suggestedChecked");
