import { apiItems, contextFlags } from "../api/inexactValue";
import ClassDetails from "../api/ClassDetails";

function InexactValue() {
    return (
        <>
            <ClassDetails
                api={apiItems}
                contextFlags={contextFlags}
                description="The InexactValue macro provides a way to track significant figures in values."
                macrosRequired={["contextInexactValue.pl"]}
            ></ClassDetails>
        </>
    );
}

export default InexactValue;
