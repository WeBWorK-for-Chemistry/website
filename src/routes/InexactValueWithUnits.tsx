import { apiItems, contextFlags } from "../api/inexactValueWithUnits";
import ClassDetails from "../api/ClassDetails";

function InexactValueWithUnits() {
    return (
        <>
            <ClassDetails api={apiItems} contextFlags={contextFlags} description="The InexactValueWithUnits macro provides a way to track significant figures in values along with units." macrosRequired={["contextInexactValueWithUnits.pl", "contextInexactValue.pl"]}></ClassDetails>
        </>
    );
}

export default InexactValueWithUnits;
