import { existsSync, mkdirSync, unlinkSync } from "node:fs";
import { readFile, writeFile } from "node:fs/promises";
import { join } from "node:path";
import type { LoadersConfig, LoadersIndex } from "./types";
import { logErrorCli, logWarnCli, logInfoCli } from "./log";
import { omitKey } from "./utils";

const ALLOWED_OPERATIONS = ["add", "remove"];
const REMOTE_TEMPLATE_STORE =
  "https://raw.githubusercontent.com/haileabt/nuxt-loaders/feat/cli/src/templates";

export const operationAllowed = (operation: string) => {
  if (!ALLOWED_OPERATIONS.includes(operation)) {
    logErrorCli(`Invalid operation: ${operation}`);
    return false;
  }

  return true;
};

export const getLoadersConfig = async () => {
  const path = join(process.cwd(), "loaders.config.json");

  if (!existsSync(path)) {
    logErrorCli(`No loaders.config.json found at ${path}`);
    return null;
  }

  const config = await readFile(path, "utf-8");
  return JSON.parse(config) as LoadersConfig;
};

export const addLoaderToConfig = async (
  slug: string,
  loaderName: string,
  version: string
) => {
  const path = join(process.cwd(), "loaders.config.json");

  if (!existsSync(path)) {
    logErrorCli(`No loaders.config.json found at ${path}`);
    return null;
  }

  const configFile = await readFile(path, "utf-8");
  const config = JSON.parse(configFile) as LoadersConfig;

  const newInstalledLoaders = {
    ...config.installedLoaders,
    [slug]: {
      file: loaderName,
      version: version,
    },
  };

  const newConfig = {
    ...config,
    installedLoaders: { ...newInstalledLoaders },
  };

  const newConfigFile = JSON.stringify(newConfig);
  await writeFile(path, newConfigFile);
};

export const removeLoaderFromConfig = async (slug: string) => {
  const path = join(process.cwd(), "loaders.config.json");

  if (!existsSync(path)) {
    logErrorCli(`No loaders.config.json found at ${path}`);
    return null;
  }

  const configFile = await readFile(path, "utf-8");
  const config = JSON.parse(configFile) as LoadersConfig;

  config.installedLoaders = omitKey(config.installedLoaders, slug);

  const newConfigFile = JSON.stringify(config);
  await writeFile(path, newConfigFile);

  return;
};

export const getRemoteLoader = async (slug: string, index: LoadersIndex) => {
  const loader = index[slug];
  if (!loader) {
    logErrorCli(`No loader found for slug: ${slug}`);
    return null;
  }

  const res = await fetch(`${REMOTE_TEMPLATE_STORE}/${loader.file}`);
  if (!res.ok) {
    logErrorCli(`Failed to read remote loader: ${slug}`);
    return null;
  }

  return res.text();
};

export const getTemplatesIndex = async () => {
  const res = await fetch(`${REMOTE_TEMPLATE_STORE}/index.json`);
  if (!res.ok) {
    logErrorCli(`Failed to read remote loader index`);
    return null;
  }

  const indexJson = await res.text();

  return JSON.parse(indexJson) as LoadersIndex;
};

export const handleAddLoader = async (
  slug: string,
  loadersConfig: LoadersConfig,
  index: LoadersIndex
) => {
  logInfoCli(`Adding loader: ${slug}...`);
  let configSync = true;

  if (!index[slug]) {
    logErrorCli(`No loader found for slug: ${slug}`);
    return;
  }

  const loadersPath = join(process.cwd(), loadersConfig.loadersDir);

  if (!existsSync(loadersPath)) {
    mkdirSync(loadersPath);
    logInfoCli(`Created loaders directory at ${loadersPath}`);
  }

  const loader = loadersConfig.installedLoaders[slug];
  if (loader) {
    if (existsSync(`${loadersPath}/${loader.file}`)) {
      logErrorCli(`Loader already installed: ${slug}`);
      return;
    }
    configSync = false;
  }

  const remoteLoader = await getRemoteLoader(slug, index);
  if (!remoteLoader) {
    logErrorCli("Error finding loader", slug);
    return;
  }

  const loaderPath = join(loadersPath, index[slug]!.file);

  if (!configSync && loader) {
    await addLoaderToConfig(slug, index[slug]!.file, index[slug]!.version);
    logInfoCli(`Updated config for loader: ${slug}`);
  } else if (!loader) {
    await addLoaderToConfig(slug, index[slug]!.file, index[slug]!.version);
    logInfoCli(`Updated config for loader: ${slug}`);
  }

  await writeFile(loaderPath, remoteLoader);
  logInfoCli(`Successfully added loader: ${slug}`);
};

export const handleRemoveLoader = async (
  slug: string,
  loadersConfig: LoadersConfig,
  index: LoadersIndex
) => {
  logInfoCli(`Removing loader: ${slug}...`);
  let configSync = true;

  const loadersPath = join(process.cwd(), loadersConfig.loadersDir);

  if (!existsSync(loadersPath)) {
    logWarnCli(
      `Loaders path '${loadersPath}' not found. Skipping loader deletion.`
    );
  }

  const loader = loadersConfig.installedLoaders[slug];
  if (!loader) {
    if (existsSync(`${loadersPath}/${index[slug]?.file}`)) {
      configSync = false;
    } else {
      logWarnCli(`Loader '${slug}' not found in config or file system.`);
      return;
    }
  }

  if (loader && existsSync(`${loadersPath}/${loader.file}`)) {
    await removeLoaderFromConfig(slug);
    logInfoCli(`Removed loader '${slug}' from config.`);
    unlinkSync(`${loadersPath}/${loader.file}`);
    logInfoCli(`Deleted loader file: ${loader.file}`);
  } else {
    const res = await removeLoaderFromConfig(slug);
    logInfoCli(`Removed loader '${slug}' from config.`);
  }
  logInfoCli(`Successfully removed loader: ${slug}`);
};
