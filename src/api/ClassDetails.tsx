import {  List, Text } from "@fluentui/react-components";
import { apiItems, contextFlags } from "../api/chemical";
import MethodListItem from "../api/MethodListItem";
import ContextFlagListItem from "../api/ContextFlagListItem";
import { IApiItem, IHashItem } from "./interfaces";

interface IProps {
    description: string;
    macrosRequired: string[];
    api: IApiItem[];
    contextFlags: IHashItem[];
}

function ClassDetails({description, macrosRequired, api, contextFlags}: IProps) {
    
    return (
        <>
            <h2>Description</h2>
            <Text>
                {description}
            </Text>

            <h2>Macros Required</h2>
            {macrosRequired.map((macro) => (
                <Text>{macro}</Text>
            ))}
            

            <h2>API</h2>
            <h3>Constructor</h3>
            <List>
                {api.filter((x)=>x.name === "constructor").map((item) => (
                    <MethodListItem item={item} isConstructor={true} />
                ))}
            </List>
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

export default ClassDetails;
