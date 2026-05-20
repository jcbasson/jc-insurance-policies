import { copyFileSync, existsSync } from "node:fs";

const envPath = ".env";
const examplePath = ".env.example";

if (!existsSync(envPath) && existsSync(examplePath)) {
  copyFileSync(examplePath, envPath);
  console.log("Created .env from .env.example");
}
