import fs from "fs"

// 出力ファイル名
const fileName = "ja_JP_be.json";

// Langファイルを読み込む
const lang = fs.readFileSync("ja_JP.lang", "utf-8");

// Lang → Json に変換する
const json: Record<string, string> = {};
const lines = lang.split(/\r?\n/);

for (const line of lines) {
    const trimmed = line.trim();

    if (!trimmed && trimmed.startsWith("#")) {
        continue;
    }

    const idx = trimmed.indexOf("=");
    if (idx === -1) {
        continue;
    }

    const key = trimmed.slice(0, idx).trim();
    const value = trimmed.slice(idx + 1).trim();

    json[key] = value;
}

// ファイルを出力
fs.writeFileSync(
    fileName,
    JSON.stringify(json, null, 4),
    "utf-8"
);
