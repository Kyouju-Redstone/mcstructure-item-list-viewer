export type Mcstructure = {
    format_version: number;
    size: [number, number, number];
    structure: Structure;
    structure_world_origin: [number, number, number];
};

export type Structure = {
    block_indices: [
        number[],
        number[]
    ];
    entities: Entity[];
    palette: Palette;
};

export type Palette = {
    default: {
        block_palette: BlockPaletteItem[];
        block_position_data: Record<
            string,
            {
                block_entity_data: BlockEntityData;
            }
        >;
    };
};

export type BlockPaletteItem = {
    name: string; // "minecraft:stone" など
    states: Record<string, string | number | boolean>;
    version: number;
};

export type BlockEntityData = {
    id: string;
    isMovable: number;
    x: number;
    y: number;
    z: number;

    // 追加データはブロックごとに異なる
    [key: string]: unknown;
};

export type Entity = {
    identifier: string;
    Pos: [number, number, number];
    Rotation: [number, number];
    Motion: [number, number, number];
    OnGround: number;
    UniqueID: [number, number];
    definitions: string[];
    Tags: string[];
    internalComponents: Record<string, unknown>;

    // Entity固有NBT
    [key: string]: unknown;
};

export type ChestItem = {
    Name: string;
    Count: number;
    Damage: number;
    Slot: number;
    WasPickedUp: number;
    Block?: {
        name: string;
        states: Record<string, unknown>;
        version: number;
    };
};
