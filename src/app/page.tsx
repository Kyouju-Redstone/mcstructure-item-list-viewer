"use client"

import FileUploader from "@/features/itemlist/components/FileUploader";
import JsonViewer from "@/features/itemlist/components/JsonViewer";
import { parseMcstructure } from "@/features/itemlist/utils/convert";
import { Stack } from "@mui/material";
import { useState } from "react";

export default function Home() {
    const [structure, setStructure] = useState<Object | null>(null);

    const handleFileSelect = async (file: File) => {
        const obj = await parseMcstructure(file);
        setStructure(obj);
    }

    return (
        <Stack spacing={2} useFlexGap>
            <FileUploader onSelect={handleFileSelect}/>
            <JsonViewer structure={structure}/>
        </Stack>
    );
}
