export type BlockItem = {
    nameJa: string | undefined; // アイテム名(日本語)
    count: number;              // アイテム数
    blockIds: Set<string>;      // ID　例：minecraft:stone
};
