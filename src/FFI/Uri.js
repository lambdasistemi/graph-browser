export const decodeUriComponent = decodeURIComponent;
export const encodeUriComponent = encodeURIComponent;
export const absoluteUrl = (path) => () =>
  new URL(path, window.location.href).href;
