import loadData from "./loadData.js";
import saveData from "./saveData.js";
import { getCookie, clearCookies } from "./cookies.js";
import updateTitle from "./updateTitle.js";

function msgNumChanged(e) {
  updateTitle(e.target.value);
}

function getTimeStr() {
  const date = new Date();
  let s = date.toLocaleTimeString("en-GB");
  s = s.slice(0, 5).replace(":", "");
  return s;
}

// Get date string in SCCo format
function getDateStr() {
  const date = new Date();

  const mm = ("0" + (date.getMonth() + 1)).slice(-2);
  const dd = ("0" + date.getDate()).slice(-2);
  const yy = date.getYear() - 100;

  return mm + "/" + dd + "/" + yy;
}

// Set date and time in Message area
function setDateTime() {
  document.getElementById("msg_date").value = getDateStr();
  document.getElementById("msg_time").value = getTimeStr();
}

function initializeFields() {
  document.getElementById("operator_date").value = getDateStr();
  document.getElementById("operator_time").value = getTimeStr();

  ["operator_callsign", "operator_name"].forEach((key) => {
    const value = getCookie(key);
    if (value !== undefined) {
      const field = document.getElementById(key);
      if (field !== undefined) {
        field.value = value;
      }
    }
  });
}

export default function intialize() {
  // This code is based on the Winlink ICS-213 form.

  // Load data button
  document.getElementById("select_files").addEventListener("change", loadData);

  // Button to set date and time in Message area
  document.getElementById("set_time").addEventListener("click", setDateTime);

  // Clear cookies button
  document
    .getElementById("clear_cookies")
    .addEventListener("click", clearCookies);

  // Add Destination Message Number to document title
  document
    .getElementById("dest_msg_num")
    .addEventListener("change", msgNumChanged);

  // https://developer.mozilla.org/en-US/docs/Web/API/XMLHttpRequest_API/Using_FormData_Objects
  // Save data button
  const saveButton = document.querySelector("form");
  saveButton.addEventListener("submit", (e) => {
    // on form submission, prevent default
    e.preventDefault();
    // construct a FormData object, which fires the formdata event
    new FormData(saveButton);
  });
  saveButton.addEventListener("formdata", saveData);

  initializeFields();
}
