import { ExpandMore } from "@mui/icons-material";
import {
    Accordion,
    AccordionDetails,
    AccordionSummary,
    Box,
    Paper,
    Typography
} from "@mui/material";
import { List, RowComponentProps } from "react-window";

interface JsonViewerProps {
    structure: Object | null;
}

const JsonViewer = (props: JsonViewerProps) => {
    const json = JSON.stringify(props.structure, null, 2);  // オブジェクトをJSONに変換
    const jsonLines = json.split("\n");                     // 改行で分割
    const fontSize = 13;

    return (
        <>
            {props.structure && (
                <Accordion
                    disableGutters
                    elevation={0}
                    sx={{
                        border: "1px solid",
                        borderColor: "divider",
                        "&:before": {
                            display: "none"
                        },
                    }}
                >
                    <AccordionSummary expandIcon={<ExpandMore />}>
                        <Typography variant="body2">
                            {`Jsonプレビュー (${jsonLines.length.toLocaleString()} 行)`}
                        </Typography>
                    </AccordionSummary>
                    <AccordionDetails sx={{
                        backgroundColor: "#f8f8f8",
                    }}>
                        <Paper
                            variant="outlined"
                            sx={{
                                height: 600,
                                overflow: "hidden",
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
