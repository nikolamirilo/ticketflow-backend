import { exec } from "child_process";

// Execute the Python script
export async function pythonScript(req, res) {
  exec("python ./python/scrapping.py", (error, stdout, stderr) => {
    if (error) {
      console.error(`Error executing Python script: ${error.message}`);
      return;
    }
    console.log(stdout);
  });
}
