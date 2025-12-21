import { cp, readFile } from 'fs/promises';
import { fileURLToPath } from 'url';
import { dirname, join } from 'path';
import type { LoadersIndex } from './types';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

let templatesIndexJSON: string = '';
try {
    templatesIndexJSON = await readFile(join(__dirname, '../templates/index.json'), "utf-8");
} catch (error) {
    console.error('[nuxt-loaders-cli]:error Failed to read templates index:', error);
    process.exit(1);
}

if (templatesIndexJSON.trim() === '') {
    console.error('[nuxt-loaders-cli]:error Templates index is empty');
    process.exit(1);
}


let templatesIndex: LoadersIndex = {};

try {
    templatesIndex = JSON.parse(templatesIndexJSON);
} catch (error) {
    console.error('[nuxt-loaders-cli]:error Failed to parse templates index:', error);
    process.exit(1);
}

const sourceDir = join(__dirname, `../templates/${templatesIndex["basic"]}.vue`);

console.log(sourceDir);

const destDir = join(process.cwd(), 'BasicLoader.vue');

await cp(sourceDir, destDir, { recursive: true, force: true });
console.log('Copied to ./BasicLoader.vue');