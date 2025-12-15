import * as nbt from 'prismarine-nbt';

export async function convertMcstructureToJson(file: File): Promise<string> {
    const arrayBuffer = await file.arrayBuffer();
    const buffer = Buffer.from(arrayBuffer);
    const { parsed } = await nbt.parse(buffer);
    const json = JSON.stringify(parsed, null, 2);

    console.log(json);
    return json;
}
