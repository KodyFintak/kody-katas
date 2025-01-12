import {readdirSync, statSync} from "fs";
import {join} from "path";

export function allFilesIn(directory: string): any[] {
    const files: any[] = [];

    const items = readdirSync(directory);

    for (const item of items) {
        const fullPath = join(directory, item);
        const stats = statSync(fullPath);

        if (stats.isDirectory()) {
            files.push(...allFilesIn(fullPath));
        }

        if (stats.isFile()) {
            files.push(fullPath);
        }
    }

    return files;
}