import { List, Text } from "@fluentui/react-components";
import MethodListItem from "../api/MethodListItem";
import ContextFlagListItem from "../api/ContextFlagListItem";
import { IApiItem, IHashItem } from "./interfaces";
import "./ClassDetails.css";

interface IProps {
    description: string;
    macrosRequired: string[];
    api: IApiItem[];
    contextFlags: IHashItem[];
}

function ClassDetails({ description, macrosRequired, api, contextFlags }: IProps) {
    const constructor = api.filter((x) => x.name === "constructor");

    return (
        <>
            <h2>Description</h2>
            <Text>{description}</Text>

            <h2>Macros Required</h2>
            {macrosRequired.map((macro) => (
                <div >
                    <code>{macro}</code>
                    <br />
                </div>
            ))}

            <h2>API</h2>
            {constructor.length > 0 && (
                <>
                    <h3>Constructor</h3>
                    <List>
                        {constructor?.map((item) => (
                            <MethodListItem item={item} isConstructor={true} />
                        ))}
                    </List>
                </>
            )}
            {contextFlags && contextFlags.length > 0 && (
                <>
                    <h3>Context Flags</h3>
                    <List>
                        {contextFlags.map((item) => (
                            <ContextFlagListItem item={item} />
                        ))}
                    </List>
                </>
            )}
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

export default ClassDetails;
