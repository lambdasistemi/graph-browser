import fs from "node:fs";
import path from "node:path";

export const getArgv = () => process.argv.slice(2);

export const readTextFile = (filePath) => () =>
  fs.readFileSync(filePath, "utf8");

export const writeTextFile = (filePath) => (contents) => () =>
  fs.writeFileSync(filePath, contents, "utf8");

export const makeDirectory = (dirPath) => () =>
  fs.mkdirSync(dirPath, { recursive: true });

export const joinPath = (parts) => () => path.join(...parts);

export const setExitCode = (code) => () => {
  process.exitCode = code;
};
