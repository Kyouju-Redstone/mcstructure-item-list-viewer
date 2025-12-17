import { BlockItem } from "../types/BlockItem";
import { Mcstructure } from "../types/McstructureNbt";
import { getBlockNameJa } from "./getBlockNameJa";

export function generateItemList(mcstructure: Mcstructure) {
    const blockIndices = mcstructure.structure.block_indices[0];
    const blockPalette = mcstructure.structure.palette.default.block_palette;
    const counter = new Map<string, number>();

    // ブロックIDを取得
    const blockIds = blockIndices
        .map<string>((i) => blockPalette[i]?.name)
        .filter((e) => e !== "minecraft:air")

    // 各ブロックの数を算出
    for (var i = 0; i < blockIds.length; i++) {
        counter.set(blockIds[i], (counter.get(blockIds[i]) ?? 0) + 1);
    }

    // アイテムリストに変換
    const items: BlockItem[] = Array.from(counter.entries()).map(
        ([id, count]): BlockItem => ({
            nameJa: getBlockNameJa(id),
            count: count,
            blockIds: [id],
        })
    );

    return items;
}
