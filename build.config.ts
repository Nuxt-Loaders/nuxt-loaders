import { defineBuildConfig } from 'unbuild';

export default defineBuildConfig({
    entries: [
        { input: "src/module" },
        {
            input: "src/bin/loaders.ts", outDir: "dist/bin"
        }
    ]
}

)

