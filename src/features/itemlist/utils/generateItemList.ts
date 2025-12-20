import hiddenItems from "../constants/hiddenItems";
import { BlockItem } from "../types/BlockItem";
import { Mcstructure } from "../types/McstructureNbt";
import { getBlockNameJa } from "./getBlockNameJa";

export function generateItemList(mcstructure: Mcstructure) {
    const blockIndices = mcstructure.structure.block_indices[0];
    const blockPalette = mcstructure.structure.palette.default.block_palette;
    const counter = new Map<string, BlockItem>();

    // ブロックIDを取得
    const blockIds = blockIndices
        .map<string>((i) => blockPalette[i]?.name)
        .filter((e) => e && !hiddenItems.includes(e));

    for (const id of blockIds) {
        // 日本語のブロック名を取得
        const nameJa = getBlockNameJa(id);

        // 日本語ブロック名をKeyに数をカウント
        const key = nameJa ?? id;
        const blockItem = counter.get(key);
        if (blockItem) {
            blockItem.count++;
            blockItem.blockIds.add(id);
        }
        else {
            counter.set(key, {
                nameJa,
                count: 1,
                blockIds: new Set([id]),
            });
        }
    }

    return Array.from(counter.values());
}
