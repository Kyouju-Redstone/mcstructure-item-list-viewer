import jaJava from "@/assets/ja_jp.json";
import jaBedrock from "@/assets/ja_JP_be.json";

const langJava: Record<string, string> = jaJava;
const langBedrock: Record<string, string> = jaBedrock;

export function getBlockNameJa(blockId: string): string | undefined {
    var blockName: string | undefined;

    // 不要文字列を削除
    const pure = blockId.replace(
        /minecraft:|(un|)powered_|standing_|wall_|(un|)lit_/g,
        "",
    );

    // Java版の翻訳ファイルからブロック名を取得
    const javaKey = `block.minecraft.${pure}`;
    blockName = langJava[javaKey];

    if (!blockName) {
        // 統合版の翻訳ファイルからブロック名を取得
        const bedrockKeyCandidates = [
            `tile.${pure}.${pure}.name`,
            `tile.${pure}.name`,
            `item.${pure}.name`,
        ];

        for (const key of bedrockKeyCandidates) {
            if (key in langBedrock) {
                blockName = langBedrock[key];
                break;
            }
        }
    }

    return blockName;
};
