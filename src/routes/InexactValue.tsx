import { accordionClassNames, Button, List, ListItem, Text } from "@fluentui/react-components";
import { useState } from "react";
import { apiItems } from "../api/inexactValue";

function InexactValue() {
    const [count, setCount] = useState(0);

    const api = apiItems;

    return (
        <>
            <h2>API</h2>

            <h3>Methods</h3>
            <List>
                {api
                    .filter((x) => x.access === "public" && x.type === "method")
                    .map((item) => (
                        <ListItem key={item.name}>
                            <Text as="h2" size={500}>
                                {item.name}
                            </Text>
                            {item.description && (
                                <>
                                    <br />
                                    <Text>{item.description}</Text>
                                </>
                            )}
                            {item.overloads?.map((overload) => (
                                <>
                                    <div style={{ marginLeft: 20 }}>
                                        {item.name + "("}
                                        {overload.parameters?.map((param, i) => (
                                            <code>{(i > 0 ? ", " : "") +param.name + ": " + param.type }</code>
                                        ))}
                                        {")"} : {overload.returns}
                                        <br />
                                        <Text as="h3" size={400}>
                                            {overload.description} <br />
                                            {overload.examples && overload.examples.length>0 && (<Text>Examples:</Text>)}
                                            {overload.examples?.map((example) => (
                                                <div style={{ marginLeft: 20 }}>
                                                    <code>{example.example}</code>
                                                    <br />
                                                    <i>{example.description}</i>
                                                    <br />
                                                </div>
                                            ))}
                                        </Text>
                                        <br />
                                    </div>
                                </>
                            ))}
                        </ListItem>
                    ))}
            </List>
        </>
    );
}

export default InexactValue;
