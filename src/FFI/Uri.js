export const decodeUriComponent = decodeURIComponent;
export const encodeUriComponent = encodeURIComponent;
export const hostnameFromUrl = (url) => {
  try {
    return new URL(url).hostname;
  } catch (_) {
    return "";
  }
};
export const absoluteUrl = (path) => () =>
  new URL(path, window.location.href).href;
