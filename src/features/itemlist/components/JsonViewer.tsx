import { Typography } from "@mui/material";

interface JsonViewerProps {
    json: string;
}

const JsonViewer = (props: JsonViewerProps) => {
    return (
        <Typography>
            {props.json}
        </Typography>
    );
}

export default JsonViewer;
