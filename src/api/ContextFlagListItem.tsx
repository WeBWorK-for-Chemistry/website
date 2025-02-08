import { accordionClassNames, Button, List, ListItem, Text, Tooltip } from "@fluentui/react-components";
import { IApiItem, IHashItem } from "./interfaces";

interface IContextFlagListItem {
    item: IHashItem;
}

function ContextFlagListItem({ item }: IContextFlagListItem) {
    return (
        <>
            <ListItem key={item.key} style={{ marginBottom: 10 }}>
                <Text as="h3" size={500}>
                    {item.key}
                </Text>
                <br />
                <Text as="h4" size={300}>
                    type: {item.type}
                </Text>
                <br />
                <Text as="h4" size={300}>
                    default: {item.default}
                </Text>
                {item.description && (
                    <div style={{marginLeft:10}}>
                        <Text>{item.description}</Text>
                    </div>
                )}
            </ListItem>
        </>
    );
}

export default ContextFlagListItem;
