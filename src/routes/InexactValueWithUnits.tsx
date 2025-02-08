import { accordionClassNames, Button, List, ListItem, Text, Tooltip } from "@fluentui/react-components";
import { useState } from "react";
import { apiItems, contextFlags } from "../api/inexactValueWithUnits";
import MethodListItem from "../api/MethodListItem";
import ContextFlagListItem from "../api/ContextFlagListItem";

function InexactValueWithUnits() {
    const api = apiItems;

    return (
        <>
            <h2>API</h2>
            <h3>Context Flags</h3>
            <List>
                {contextFlags.map((item) => (
                    <ContextFlagListItem item={item} />
                ))}
            </List>
            <h3>Public Methods</h3>
            <List>
                {api
                    .filter((x) => x.access === "public" && x.type === "method")
                    .map((item) => (
                        <MethodListItem item={item} />
                    ))}
            </List>
        </>
    );
}

export default InexactValueWithUnits;
