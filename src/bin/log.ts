const PREFIX = "[nuxt-loaders-cli]"

export const logWarnCli = (...log: any[]) => {
    console.warn(`${PREFIX}:warn`, ...log)
}

export const logErrorCli = (...log: any[]) => {
    console.error(`${PREFIX}:error`, ...log)
}

export const logInfoCli = (...log: any[]) => {
    console.log(`${PREFIX}:info`, ...log)
}