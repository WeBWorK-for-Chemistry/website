import { apiItems, contextFlags } from "../api/dimensionalAnalysis";
import ClassDetails from "../api/ClassDetails";

function DimensionalAnalysis() {
    return (
        <>
            <ClassDetails
                api={apiItems}
                contextFlags={contextFlags}
                description={`The DimensionalAnalysis macro provides a way to grade multiple InexactValueWithUnits that are connected in a single problem. 
                These are all extension methods of the MultiAnswer class for grading multiple answers at the same time.`}
                macrosRequired={["parserDimensionalAnalysis.pl", "contextInexactValueWithUnits.pl", "contextInexactValue.pl", "contextChemical.pl (optional)"]}
            ></ClassDetails>
        </>
    );
}

export default DimensionalAnalysis;
