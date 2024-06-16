import { setCookie } from "./cookies.js";

// Get date string similar to SCCo format
function getDateStr() {
  const date = new Date();

  const mm = ("0" + (date.getMonth() + 1)).slice(-2);
  const dd = ("0" + date.getDate()).slice(-2);
  const hhmm = date.toLocaleTimeString("en-GB").slice(0, 5).replace(":", "-");

  return mm + "-" + dd + "T" + hhmm;
}

// https://www.30secondsofcode.org/js/s/json-to-file/
function downloadJSON(obj, filename) {
  const blob = new Blob([JSON.stringify(obj, null, 2)], {
    type: "application/json",
  });
  const url = URL.createObjectURL(blob);
  const a = document.createElement("a");
  a.href = url;
  a.download = `${filename}.json`;
  a.click();
  URL.revokeObjectURL(url);
}

// https://stackoverflow.com/questions/67607305/filter-the-json-object-where-value-is-not-empty-or-not-null-on-created-function
function removeEmpties(input) {
  const nonEmptyOrNull = Object.entries(input).filter(
    ([key, val]) => val !== "" && val !== null
  );
  return Object.fromEntries(nonEmptyOrNull);
}

export default function saveData(e) {
  // Convert form entries to a plain JS object
  //
  // https://stackoverflow.com/questions/41431322/how-to-convert-formdata-html5-object-to-json/76188183
  // Search for answer from OpSocket, May 25, 2020

  let json_entries = Object.fromEntries(
    Array.from(e.formData.keys()).map((key) => [
      key,
      e.formData.getAll(key).length > 1
        ? e.formData.getAll(key)
        : e.formData.get(key),
    ])
  );

  // formData misses this field
  const modeOther = e.formData.get("transmission-mode-text");
  if (modeOther !== undefined) {
    json_entries.modeOther = modeOther;
  }

  json_entries = removeEmpties(json_entries);

  // build basename for output file
  const date_s = getDateStr();
  let msgId_s = "";
  const s = e.formData.get("dest_msg_num");
  if (s) {
    msgId_s = s + " ";
  }
  const filename = msgId_s + "ICS-213 " + date_s;

  downloadJSON(json_entries, filename);
  setCookie("operator_callsign", json_entries["operator_callsign"]);
  setCookie("operator_name", json_entries["operator_name"]);
}
