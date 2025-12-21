import hiddenItemBlockIds from "../constants/hiddenItems";
import { BlockItem } from "../types/BlockItem";
import { Mcstructure } from "../types/McstructureNbt";
import { getBlockNameJa } from "./getBlockNameJa";

export function generateItemList(mcstructure: Mcstructure): BlockItem[] {
    const blockPalette = mcstructure.structure.palette.default.block_palette;
    const blockIndices = mcstructure.structure.block_indices[0];

    const counter = new Map<string, BlockItem>();
    for (const index of blockIndices) {
        const paletteItem = blockPalette[index];
        const blockId = paletteItem.name;
        if (hiddenItemBlockIds.includes(blockId)) {
            continue;
        }

        const increment = paletteItem.states?.upper_block_bit === undefined ? 1 : 0.5;
        const nameJa = getBlockNameJa(blockId) ?? blockId;

        const blockItem = counter.get(nameJa);
        if (blockItem) {
            // アイテムが既にある場合
            blockItem.count += increment;
            blockItem.blockIds.add(blockId);
        }
        else {
            // アイテムがまだない場合
            counter.set(nameJa, {
                nameJa: nameJa,
                blockIds: new Set([blockId]),
                count: increment,
            });
        }
    }

    return Array.from(counter.values());
}
