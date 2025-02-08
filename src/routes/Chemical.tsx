import { apiItems, contextFlags } from "../api/chemical";
import ClassDetails from "../api/ClassDetails";

function Chemical() {
    return (
        <>
            <ClassDetails
                api={apiItems}
                contextFlags={contextFlags}
                description="The Chemical module provides methods for working with chemical
                substances."
                macrosRequired={["contextChemical.pl"]}
            ></ClassDetails>
        </>
    );
}

export default Chemical;
