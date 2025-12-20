import { Box, Chip, Divider, List, ListItem, ListItemText, Paper, Stack, Typography } from "@mui/material";
import { Mcstructure } from "../types/McstructureNbt";
import { generateItemList } from "../utils/generateItemList";
import { BlockItem } from "../types/BlockItem";

interface ItemListProps {
    mcstructure: Mcstructure | null;
}

const ItemList = (props: ItemListProps) => {
    var items: BlockItem[] | null;
    if (!props.mcstructure) {
        items = null;
    }
    else {
        items = generateItemList(props.mcstructure);
    }

    return (
        <>
            {items && (
                <Paper
                    variant="outlined"
                    sx={{
                        minWidth: "max-content",
                        overflowY: "hidden",
                        WebkitOverflowScrolling: "touch",
                    }}
                >
                    <Box p={2}>
                        <Typography variant="h6" gutterBottom>
                            ブロック一覧
                        </Typography>

                        <Typography
                            variant="body2"
                            color="text.secondary"
                            gutterBottom
                        >
                            全 {items.length} 種類
                        </Typography>
                    </Box>

                    <Divider />

                    <List dense>
                        {items.map((item) => (
                            <ListItem
                                key={item.nameJa}
                                divider
                                secondaryAction={
                                    <Stack direction={"row"}>
                                        <Typography fontWeight="bold">
                                            {"×"}
                                        </Typography>
                                        <Typography
                                            fontWeight="bold"
                                            width={40}
                                            textAlign="right"
                                        >
                                            {item.count}
                                        </Typography>
                                    </Stack>
                                }
                            >
                                <ListItemText
                                    primary={item.nameJa ?? "＊＊＊＊＊＊"}
                                    secondary={Array.from(item.blockIds).join(", ")}
                                />
                            </ListItem>
                        ))}
                    </List>
                </Paper>
            )}
        </>
    );
}

export default ItemList;
