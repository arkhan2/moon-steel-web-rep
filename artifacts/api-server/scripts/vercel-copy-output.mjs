import { cp, mkdir, rm } from "node:fs/promises";
import path from "node:path";
import { fileURLToPath } from "node:url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// This script is intended for Vercel projects rooted at artifacts/api-server.
const apiServerRoot = path.resolve(__dirname, "..");
const sourceDir = path.resolve(apiServerRoot, "..", "moonsteel", "dist", "public");
const targetDir = path.join(apiServerRoot, "public");

await rm(targetDir, { recursive: true, force: true });
await mkdir(targetDir, { recursive: true });
await cp(sourceDir, targetDir, { recursive: true });

console.log(`Copied Vercel output from ${sourceDir} to ${targetDir}`);
