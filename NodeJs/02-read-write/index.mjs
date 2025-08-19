import { writeFile, unlink, access, mkdir, appendFile } from "fs/promises";
import path from "path";

const checkIfDirExistsOrCreate = async (path) => {
  try {
    await access(path);
    console.log("file exists");
  } catch (error) {
    await mkdir(path);
  }
};

const createFileWithMessage = async (message) => {
  const date = new Date();
  const dirName = `${date.getFullYear()}-${(date.getMonth() + 1)
    .toString()
    .padStart(2, "0")}-${date.getDate().toString().padStart(2, "0")}/`;

  await checkIfDirExistsOrCreate(dirName);

  const fileName = `/${date.getHours().toString().padStart(2, "0")}-${date
    .getMinutes()
    .toString()
    .padStart(2, "0")}-${date.getSeconds().toString().padStart(2, "0")}.txt`;

  await writeFile(path.join(dirName, fileName), message);
};

const deleteFileByName = async (path) => {
  try {
    access(path);
    await unlink(path);
  } catch (error) {
    console.log(error);
  }
};

const command = process.argv[2];
const argument = process.argv[3];

if (command === "create") {
  createFileWithMessage(argument);
} else if (command === "delete") {
  deleteFileByName(argument);
} else {
  console.log("Invalid Command, Accepts only create and delete");
}
