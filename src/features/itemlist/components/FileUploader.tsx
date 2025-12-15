"use client"

import { Box, Typography } from "@mui/material";
import React, { useRef, useState } from "react";

interface FileUploaderProps {
    onSelect: (file: File) => void;
}

const FileUploader = (props: FileUploaderProps) => {
    const inputRef = useRef<HTMLInputElement>(null);
    const [isDragOver, setIsDragOver] = useState<boolean>(false);

    const handleChange = (files: FileList | null) => {
        if (files && files?.length !== 0) {
            const file = files[0];
            if (file.name.endsWith(".mcstructure")) {
                props.onSelect(file);
            }
            else {
                alert("mcstructureファイルを選択してください");
            }
        }
    }

    return (
        <>
            <input
                ref={inputRef}
                type="file"
                accept=".mcstructure"
                hidden
                onChange={(e) => handleChange(e.target.files)}
            />

            <Box
                onClick={() => inputRef.current?.click()}
                onDragOver={(e) => {
                    e.preventDefault();
                    setIsDragOver(true);
                }}
                onDragLeave={() => setIsDragOver(false)}
                onDrop={(e) => {
                    e.preventDefault();
                    setIsDragOver(false);
                    handleChange(e.dataTransfer.files);
                }}
                sx={{
                    border: "2px dashed",
                    borderColor: isDragOver ? "primary.main" : "grey.400",
                    borderRadius: 2,
                    p: 4,
                    textAlign: "center",
                    cursor: "pointer",
                    bgcolor: isDragOver ? "action.hover" : "transparent",
                    transition: "0.2s",
                }}
            >
                <Typography variant="h6">
                    ファイルをドラッグ＆ドロップ
                </Typography>
                <Typography variant="body2" color="text.secondary">
                    またはクリックして選択
                </Typography>
            </Box>
        </>
        // <input
        //     type="file"
        //     accept=".mcstructure"
        //     required
        //     onChange={handleChange}
        // />
    );
}

export default FileUploader;
