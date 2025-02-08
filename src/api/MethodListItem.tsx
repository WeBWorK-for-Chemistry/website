import { ListItem, Text } from "@fluentui/react-components";
import { IApiItem } from "./interfaces";

interface IMethodListItem {
    item: IApiItem;
    isConstructor?: boolean;
}

function MethodListItem({item}:IMethodListItem) {
    

    return (
        <>
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
                                <code>{(i > 0 ? ", " : "") + param.name + ": " + param.type}</code>
                            ))}
                            {")"} : {overload.returns}
                            <br />
                            <Text as="h3" size={400}>
                                {overload.description} <br />
                                {overload.parameters && overload.parameters.length > 0 && <Text>Parameters:</Text>}
                                {overload.parameters?.map((param) => (
                                    <div style={{ marginLeft: 20 }}>
                                        {param.name}: ({param.type}) {param.description} <br />
                                    </div>
                                ))}
                                {overload.examples && overload.examples.length > 0 && <Text>Examples:</Text>}
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
        </>
    );
}

export default MethodListItem;
