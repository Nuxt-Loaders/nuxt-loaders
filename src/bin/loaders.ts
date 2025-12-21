import { readdir } from "node:fs/promises";
import {
  getLoadersConfig,
  getTemplatesIndex,
  handleAddLoader,
  handleRemoveLoader,
  operationAllowed,
} from "./lib";
import { logErrorCli, logInfoCli } from "./log";

const dir = await readdir(process.cwd());

if (!dir.includes("nuxt.config.ts") && !dir.includes("nuxt.config.js")) {
  logErrorCli(
    "Not a Nuxt project. Please run this command in the root directory of your Nuxt project."
  );
  process.exit(1);
}

if (process.argv.length < 3) {
  logErrorCli(
    'No operation specified. Please use "nuxt-loaders add <loader>" or "nuxt-loaders remove <loader>"'
  );
  process.exit(1);
}

const args = process.argv.slice(2);
if (args.length < 1) {
  logErrorCli(
    'No loader specified. Please use "nuxt-loaders add <loader>" or "nuxt-loaders remove <loader>"'
  );
  process.exit(1);
}

const operation = args[0];
if (!operationAllowed(operation || "")) {
  logErrorCli("Invalid operation: " + operation, "User 'add' or 'remove'");
  process.exit(1);
}

const loaders = args.slice(1);
if (loaders.length < 1) {
  logErrorCli(
    'No loader specified. Please use "nuxt-loaders add <loader>" or "nuxt-loaders remove <loader>"'
  );
  process.exit(1);
}

logInfoCli(`Starting nuxt-loaders CLI...`);

const loadersConfig = await getLoadersConfig();
if (!loadersConfig) {
  logErrorCli("Could not find loaders config. Please initialize the module.");
  process.exit(1);
}

const templatesIndex = await getTemplatesIndex();
if (!templatesIndex) {
  logErrorCli(
    "Could not find any loader templates. Please stay tuned for some."
  );
  process.exit(1);
}

for (const loader of loaders) {
  if (!templatesIndex[loader]) {
    logErrorCli(`No loader found for slug: ${loader}`);
    process.exit(1);
  }

  if (operation === "add") {
    await handleAddLoader(loader, loadersConfig, templatesIndex);
  } else if (operation === "remove") {
    await handleRemoveLoader(loader, loadersConfig, templatesIndex);
  } else {
    logErrorCli(`Invalid operation: ${operation}`);
    process.exit(1);
  }
}

logInfoCli(`Operation ${operation} completed successfully.`);
