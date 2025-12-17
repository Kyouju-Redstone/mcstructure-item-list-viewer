import * as nbt from 'prismarine-nbt';
import { Mcstructure } from '../types/McstructureNbt';

export async function parseMcstructure(file: File): Promise<Mcstructure> {
    const arrayBuffer = await file.arrayBuffer();
    const buffer = Buffer.from(arrayBuffer);
    const { parsed } = await nbt.parse(buffer);
    const mcstructureNbt = nbt.simplify(parsed) as Mcstructure;

    console.log(mcstructureNbt);
    return mcstructureNbt;
}
