import updateTitle from "./updateTitle.js";

function populateForm(formId, jsonData) {
  const form = document.getElementById(formId);

  form.reset(); // clear text fields

  Array.from(form.elements).forEach((field) => {
    if (field.type == "radio") {
      field.checked = !!(
        jsonData[field.name] !== undefined &&
        jsonData[field.name] == field.value
      );
    } else if (field.type == "checkbox") {
      if (jsonData[field.name] === undefined) {
        field.checked = false;
      } else if (Array.isArray(jsonData[field.name])) {
        field.checked = !!jsonData[field.name].includes(field.value);
      } else {
        // Is a string
        field.checked = !!(jsonData[field.name] == field.value);
      }
    } else if (field.type == "text" || field.type == "textarea") {
      if (field.id == "data_version") {
        if (field.value != jsonData["data_version"]) {
          alert(
            "Data file version does not match. I will do my best but some data may not appear."
          );
        }
      } else if (!field.readOnly && jsonData[field.id] !== undefined) {
        field.value = jsonData[field.id];
      }
    }
  });
  // Set page title
  const msgNum = document.getElementById("dest_msg_num");
  if (msgNum !== undefined) {
    updateTitle(msgNum.value);
  }
}

export default function loadData(e) {
  const fileSelected = document.getElementById("select_files");
  const fileExtension = /json.*/; // Select JSON file extension
  const fileTobeRead = fileSelected.files[0];

  // Canceling from the file picker behaves as expected

  if (fileTobeRead.type.match(fileExtension)) {
    // Use the FileReader API
    const fileReader = new FileReader();
    fileReader.onload = function (e) {
      const tmpTextArea = document.getElementById("parseme");
      tmpTextArea.value = fileReader.result;
      const jsonData = JSON.parse(tmpTextArea.value);
      populateForm("fema_form", jsonData);
    };
    fileReader.readAsText(fileTobeRead);
  } else {
    // Browsers on Mac do not let us get there
    alert("Please select .json file");
  }
}
