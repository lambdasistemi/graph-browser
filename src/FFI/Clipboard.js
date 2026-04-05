export const writeClipboard = (text) => () =>
  navigator.clipboard.writeText(text);
