export interface LoadersIndex {
    [key: string]: {
        file: string;
        version: string;
    };
}


export interface InstalledLoader {
    file: string;
    version: string;
}

export interface LoadersConfig {
    loadersDir: string;
    installedLoaders: Record<string, InstalledLoader>
}