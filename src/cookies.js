export function setCookie(key, value) {
  if (!value) {
    value = "";
  }
  document.cookie = `${key}=${value}; SameSite=Strict`;
}

export function getCookie(key) {
  const cookieName = `${key}=`;
  const cookie = document.cookie
    .split("; ")
    .find((row) => row.startsWith(cookieName))
    ?.split("=")[1];
  return cookie;
}

export function clearCookies() {
  document.cookie.split(";").forEach((cookie) => {
    const key = cookie.split("=")[0].trim();
    if (key) {
      // Found valid cookie
      setCookie(key, "");
      const field = document.getElementById(key);
      if (field !== null) {
        field.value = "";
      }
    }
  });
}
