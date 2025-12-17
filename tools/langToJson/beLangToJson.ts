import fs from "fs"

function beLangToJson(langText: string): Record<string, string> {
    const result: Record<string, string> = {};

    const lines = langText.split(/\r?\n/);

    for (const line of lines) {
        const trimmed = line.trim();

        if (!trimmed) continue;
        if (trimmed.startsWith("#")) continue;

        const idx = trimmed.indexOf("=");
        if (idx === -1) continue;

        const key = trimmed.slice(0, idx).trim();
        const value = trimmed.slice(idx + 1).trim();

        result[key] = value;
    }

    return result;
}

// 実行例
const lang = fs.readFileSync("ja_JP.lang", "utf-8");
const json = beLangToJson(lang);
const fileName = "ja_JP_be.json";

fs.writeFileSync(
    fileName,
    JSON.stringify(json, null, 4),
    "utf-8"
);

fs.writeFileSync(
    `../../src/assets/${fileName}`,
    JSON.stringify(json, null, 4),
    "utf-8"
);
