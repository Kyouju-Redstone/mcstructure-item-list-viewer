"use client"

import FileUploader from "@/features/itemlist/components/FileUploader";
import JsonViewer from "@/features/itemlist/components/JsonViewer";
import { convertMcstructureToJson } from "@/features/itemlist/utils/convert";
import { useState } from "react";

export default function Home() {
    const [json, setJson] = useState<string>("");

    const handleFileSelect = async (file: File) => {
        const json = await convertMcstructureToJson(file);
        setJson(json);
    }

    return (
        <>
            <FileUploader onSelect={handleFileSelect}/>
            <JsonViewer json={json}/>
        </>
    );
}
