export default function updateTitle(s) {
  if (s) {
    document.title = "Msg " + s + ", Form ICS-213";
  } else {
    document.title = "ICS-213 Message Form";
  }
}
