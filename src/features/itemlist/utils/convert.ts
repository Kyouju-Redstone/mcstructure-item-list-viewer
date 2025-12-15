import * as nbt from 'prismarine-nbt';

export async function parseMcstructure(file: File): Promise<Object> {
    const arrayBuffer = await file.arrayBuffer();
    const buffer = Buffer.from(arrayBuffer);
    const { parsed } = await nbt.parse(buffer);
    const obj = nbt.simplify(parsed);

    console.log(obj);
    return obj;
}
