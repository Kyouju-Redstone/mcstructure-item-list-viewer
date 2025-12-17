import { ContentCopy, ExpandMore } from "@mui/icons-material";
import {
    Accordion,
    AccordionDetails,
    AccordionSummary,
    Box,
    IconButton,
    Paper,
    Tooltip,
    Typography
} from "@mui/material";
import { List, RowComponentProps } from "react-window";
import { Mcstructure } from "../types/McstructureNbt";

interface JsonViewerProps {
    mcstructure: Mcstructure | null;
}

const JsonViewer = (props: JsonViewerProps) => {
    const json = JSON.stringify(props.mcstructure, null, 2);  // オブジェクトをJSONに変換
    const jsonLines = json.split("\n");                     // 改行で分割
    const fontSize = 13;

    const handleCopy = () => {
        navigator.clipboard.writeText(json);
        alert("コピーされました");
    }

    return (
        <>
            {props.mcstructure && (
                <Accordion
                    disableGutters
                    elevation={0}
                    sx={{
                        border: "1px solid",
                        borderColor: "divider",
                        alignItems: "center",
                        "&:before": {
                            display: "none",
                        },
                        '& .MuiAccordionSummary-content': {
                            alignItems: "center",          // ← 中身も中央
                            margin: 0,                     // ← 上寄せ防止
                        },
                    }}
                >
                    <AccordionSummary expandIcon={<ExpandMore />}>
                        <Typography variant="body2">
                            {`Jsonプレビュー (${jsonLines.length.toLocaleString()} 行)`}
                        </Typography>

                        {/* コピー */}
                        <Box
                            mr={1}
                            flex={1}
                            display="flex"
                            justifyContent="flex-end"
                            alignItems="center"
                        >
                            <Tooltip title="コピー">
                                <IconButton
                                    size="small"
                                    onClick={(e) => {
                                        e.stopPropagation();
                                        handleCopy();
                                    }}
                                >
                                    <ContentCopy fontSize="small" />
                                </IconButton>
                            </Tooltip>
                        </Box>
                    </AccordionSummary>
                    <AccordionDetails sx={{
                        backgroundColor: "#f8f8f8",
                    }}>
                        <Paper
                            variant="outlined"
                            sx={{
                                minWidth: "max-content",
                                height: 600,
                                overflowY: "hidden",
                                WebkitOverflowScrolling: "touch"
                            }}
                        >
                            <List
                                rowHeight={fontSize}
                                rowComponent={(props: RowComponentProps<{}>) => (
                                    <Box
                                        display="flex"
                                        fontSize={fontSize}
                                        style={{
                                            ...props.style,
                                        }}
                                    >
                                        {/* 行番号 */}
                                        <Box
                                            width={60}
                                            paddingRight={1}
                                            textAlign="right"
                                            color="#888888"
                                            borderRight="1px solid #888888"
                                            fontFamily="consolas"
                                            flexShrink={0}
                                            sx={{
                                                userSelect: "none"
                                            }}
                                        >
                                            {props.index + 1}
                                        </Box>

                                        {/* JSON本体 */}
                                        <Box
                                            component="pre"
                                            margin={0}
                                            paddingLeft={1}
                                            paddingRight={4}
                                            whiteSpace="pre"
                                            fontFamily="consolas"
                                        >
                                            {jsonLines[props.index]}
                                        </Box>
                                    </Box>
                                )}
                                rowProps={{ jsonLines }}
                                rowCount={jsonLines.length}
                            />
                        </Paper>
                    </AccordionDetails>
                </Accordion>
            )}
        </>
    );
}

export default JsonViewer;
