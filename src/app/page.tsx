"use client"

import FileUploader from "@/features/itemlist/components/FileUploader";
import ItemList from "@/features/itemlist/components/ItemList";
import JsonViewer from "@/features/itemlist/components/JsonViewer";
import PageTitle from "@/features/itemlist/components/PageTitle";
import { Mcstructure } from "@/features/itemlist/types/McstructureNbt";
import { parseMcstructure } from "@/features/itemlist/utils/parseMcstructure";
import { Container, Stack } from "@mui/material";
import { useState } from "react";

export default function Home() {
    const [mcstructure, setStructure] = useState<Mcstructure | null>(null);

    const handleFileSelect = async (file: File) => {
        const obj = await parseMcstructure(file);
        setStructure(obj);
    }

    return (
        <Container fixed>
            <Stack
                spacing={2}
                useFlexGap
                sx={{
                    mt: 2,
                    mb: 8,
                }}
            >
                <PageTitle />
                <FileUploader onSelect={handleFileSelect} />
                <JsonViewer mcstructure={mcstructure} />
                <ItemList mcstructure={mcstructure} />
            </Stack>
        </Container>
    );
}
