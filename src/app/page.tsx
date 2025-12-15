"use client"

import FileUploader from "@/features/itemlist/components/FileUploader";
import ItemList from "@/features/itemlist/components/ItemList";
import JsonViewer from "@/features/itemlist/components/JsonViewer";
import PageTitle from "@/features/itemlist/components/PageTitle";
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
        <Stack
            spacing={2}
            my={2}
            useFlexGap
        >
            <PageTitle />
            <FileUploader onSelect={handleFileSelect} />
            <JsonViewer structure={structure} />
            <ItemList structure={structure}/>
        </Stack>
    );
}
