"use client"

import React from "react";

interface FileUploaderProps {
    onSelect: (file: File) => void;
}

const FileUploader = (props: FileUploaderProps) => {
    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0];
        if (file) {
            props.onSelect(file);
        }
    }

    return (
        <input
            type="file"
            accept=".mcstructure"
            required
            onChange={handleChange}
        />
    );
}

export default FileUploader;
