import { IApiItem, IHashItem } from "./interfaces";

export const contextFlags: IHashItem[]=[
    {
        key: "tolerance",
        type: "number",
        default: 0,
        optional: true,
        description: `Tolerance defines how close an InexactValue's value needs to be to another one to be considered equal.
        Ideally, this would be zero for pure signficant figures calculations.  However, if a student is measuring something 
        (like a length on a ruler), their last digit will can vary from the programmed answer by a small amount.  This is 
        when it would be appropriate to set a tolerance of greater than zero.`
    },
    {
        key: "tolType",
        type: "string",
        default: "absolute",
        optional: true,
        description: `("absolute" | "relative") When tolerance is non-zero, this flag determines if the tolerance is absolute or relative.`
    },
    {
        key: "scientificNotationThreshold",
        type: "number",
        default: 6,
        optional: true,
        description: `Defines at what magnitude (positive or negative) the software will force scientific notation for string or latex output.` 
    },
];

export const apiItems: IApiItem[] = [
    {
        type: "static",
        name: "constructor",
        access: "public",
        description: "Creates a new InexactValue object.",
        overloads: [
            {
                parameters: [
                    {
                        name: "value",
                        type: "string",
                        description: "The string literal of the inexact value.",
                    },
                ],
                returns: "InexactValue",
                description: "Creates a new InexactValue object using signficant figures rules according to the input string.",
                examples: [
                    {
                        example: 'InexactValue("1.2300")',
                        description: "Creates a new InexactValue object with a value of 1.2300 and 5 significant figures.",
                    },
                ],
            },
            {
                parameters: [
                    {
                        name: "value, signficiant figures",
                        type: "array",
                        description: "First item is the value of the inexact value.  Trailing zeros are ignored by the software. Second value is the total number of significant figures the value should have.",
                    },
                ],
                returns: "InexactValue",
                description: "Creates a new InexactValue object using a simple value and a literal number of significant figures.",
                examples: [
                    {
                        example: "InexactValue([1.23, 5])",
                        description: "Creates a new InexactValue object with a value of 1.2300 and 5 significant figures.",
                    },
                ],
            },
        ],
    },
    {
        type: "static",
        access: "private",
        name: "getValue",
    },
    {
        type: "static",
        access: "private",
        name: "countSigFigsFromString",
    },
    {
        type: "method",
        name: "uncertainty",
        access: "public",
        overloads: [
            {
                parameters: [],
                returns: "number",
                description: "Gets the uncertainty of the InexactValue object.",
            },
            {
                parameters: [
                    {
                        name: "value",
                        type: "number",
                        description: "The uncertainty of the InexactValue object.",
                    },
                ],
                returns: "number",
                description: "Sets the uncertainty of the InexactValue object.",
            },
        ],
    },
    {
        type: "method",
        name: "relativeUncertainty",
        access: "public",
        overloads: [
            {
                parameters: [],
                returns: "number",
                description: "Gets the relative uncertainty of the InexactValue object.",
            },
            {
                parameters: [
                    {
                        name: "value",
                        type: "number",
                        description: "The relative uncertainty of the InexactValue object.",
                    },
                ],
                returns: "number",
                description: "Sets the relative uncertainty of the InexactValue object.",
            },
        ],
    },
    {
        type: "method",
        name: "absoluteUncertainty",
        access: "public",
        overloads: [
            {
                parameters: [],
                returns: "number",
                description: "Gets the absolute uncertainty of the InexactValue object.",
            },
            {
                parameters: [
                    {
                        name: "value",
                        type: "number",
                        description: "The absolute uncertainty of the InexactValue object.",
                    },
                ],
                returns: "number",
                description: "Sets the absolute uncertainty of the InexactValue object.",
            },
        ],
    },
    {
        type: "method",
        name: "sigFigs",
        access: "public",
        overloads: [
            {
                parameters: [],
                returns: "number",
                description: "Gets the number of significant figures in the InexactValue object.",
                examples: [
                    {
                        example: "$val = InexactValue('4.00'); $val->sigFigs();",
                        description: "Returns 3."
                    }
                ]
            },
            {
                parameters: [
                    {
                        name: "value",
                        type: "number",
                        description: "The number of significant figures in the InexactValue object.",
                    },
                ],
                returns: "number",
                description: "Sets the number of significant figures in the InexactValue object.",
                examples: [
                    {
                        example: "$val = InexactValue('2.0'); $val->sigFigs(4); $val->string();",
                        description: "Returns \"2.000\", a value with 4 significant figures."
                    }
                ]
            },
        ],
    },
    {
        type: "method",
        name: "preferScientificNotation",
        access: "public",
        overloads: [
            {
                parameters: [],
                returns: "boolean",
                description: "Gets the flag for prefering scientific notation.",
            },
            {
                parameters: [
                    {
                        name: "value",
                        type: "boolean",
                        description: "The flag for prefering scientific notation.",
                    },
                ],
                returns: "boolean",
                description: "Sets the flag for prefering scientific notation.",
            },
        ],
    },
    {
        type: "method",
        name: "valueAsNumber",
        access: "public",
        overloads: [
            {
                parameters: [],
                returns: "string",
                description: `Returns in the internal value of the InexactValue as a number.  
                This will be identical to the value passed to the constructor if generated that way.  
                If the result of math operations, the internal value will be the unrounded result before applying significant figures.`,
            },
        ],
    },
    {
        type: "method",
        name: "valueAsRoundedNumber",
        access: "public",
        overloads: [
            {
                parameters: [],
                returns: "string",
                description: `Returns in the rounded value of the InexactValue as a number according to its number of significant figures.
                This method is a shortcut to the string method with specific parameters to express computer-readable values.`,
            },
        ],
    },
    {
        type: "method",
        name: "valueAsRoundedScientific",
        access: "public",
        overloads: [
            {
                parameters: [],
                returns: "string",
                description: `Returns in the rounded value of the InexactValue as a string in scientific notation (1e-3) according to its number of significant figures.
                This method is a shortcut to the string method with specific parameters to express computer-readable values, but forced into scientific notation.`,
            },
        ],
    },
    {
        type: "method",
        name: "unroundedValueMarked",
        access: "public",
        overloads: [
            {
                parameters: [],
                returns: "latex",
                description: `Returns internal unrounded value of InexactValue but the last significant position is marked with an underline.`,
            },
        ],
    },
    {
        type: "method",
        name: "formatScientific",
        access: "private",
        description: ``,
    },
    {
        type: "method",
        name: "stringWithUncertainty",
        access: "public",
        description: `Returns string representation of the InexactValue with uncertainty.`,
        overloads: [
            {
                parameters: [
                    {
                        name: "preventClean",
                        type: "boolean",
                        optional: true,
                        description: "Prevent conversion to human readable. i.e. 1.23e-3 does not become 1.23x10^-3",
                    },
                    {
                        name: "forceScientific",
                        type: "boolean",
                        optional: true,
                        description: "Force scientific for even easy to read numbers.",
                    },
                ],
                returns: "string",
                description: `Returns string representation of the InexactValue with uncertainty.`,
            },
        ],
    },
    {
        type: "method",
        name: "string",
        access: "public",
        description: `Returns string representation of the InexactValue.  By default, the value is human readable (1.23e-3 becomes 1.23x10^-3) 
        and scientific notation is only forced if a context flag is set or past scientificNotationThreshold option.`,
        overloads: [
            {
                parameters: [
                    {
                        name: "preventClean",
                        type: "boolean",
                        optional: true,
                        description: "Prevent conversion to human readable. i.e. 1.23e-3 does not become 1.23x10^-3",
                    },
                    {
                        name: "forceScientific",
                        type: "boolean",
                        optional: true,
                        description: "Force scientific for even easy to read numbers.",
                    },
                ],
                returns: "string",
                description: `Returns string representation of the InexactValue rounded to correct signficant figures.`,
            },
        ],
    },
    {
        type: "static",
        name: "cleanSciText",
        access: "public",
        description: `Converts scientific notation (1e3) to human readable text (1x10^3).`,
        overloads: [
            {
                parameters: [
                    {
                        name: "value",
                        type: "string/number",
                        description: "Value to convert.",
                    },
                    {
                        name: "options",
                        type: "hash",
                        keys: [
                            {
                                key: "trimZeros",
                                type: "boolean",
                                optional: true,
                                description: "Trim trailing zeros. Some 'exact' values like 1e5 get output to 1.00000e5 by sprintf.  Trimming these zeros would be necessary.",
                            },
                        ],
                        optional: true,
                        description: "Force scientific for even easy to read numbers.",
                    },
                ],
                returns: "string",
                description: `Returns string representation of the InexactValue rounded to correct signficant figures.`,
            },
        ],
    },
    {
        type: "method",
        name: "TeX",
        access: "public",
        description: `Returns latex representation of the InexactValue.  By default, the value is human readable (1.23e-3 becomes 1.23x10^-3) 
        and scientific notation is only forced if a context flag is set or past scientificNotationThreshold option.`,
        overloads: [
            {
                parameters: [
                    {
                        name: "preventClean",
                        type: "boolean",
                        optional: true,
                        description: "Prevent conversion to human readable. i.e. 1.23e-3 does not become 1.23x10^-3",
                    },
                    {
                        name: "forceScientific",
                        type: "boolean",
                        optional: true,
                        description: "Force scientific for even easy to read numbers.",
                    },
                ],
                returns: "latex",
                description: `Returns latex representation of the InexactValue rounded to correct signficant figures.`,
            },
        ],
    },
    {
        type: "method",
        name: "generateSfCountingExplanation",
        access: "public",
        description: `Returns explanation of how the significant figures were counted using latex (default) or plain text.`,
        overloads: [
            {
                parameters: [
                    {
                        name: "options",
                        type: "hash",
                        keys: [
                            {
                                key: "plainText",
                                type: "boolean",
                                optional: true,
                                description: "Force plain text output instead of latex.",
                            },
                        ],
                        optional: true,
                        description: "Options for the method.",
                    },
                ],
                returns: "latex or string",
                description: `Returns explanation of how the significant figures were counted.`,
            },
        ],
    },
    {
        type: "static",
        name: "roundUp",
        access: "private",
        description: `Rounds up the input value recursively and leaves trailing zeros if needed.  Required for generateSfCountingExplanation method.`,
        overloads: [
            {
                parameters: [
                    {
                        name: "value",
                        type: "string/number",
                        description: "Value to round up.",
                    },
                ],
                returns: "string",
            },
        ],
    },
    {
        type: "method",
        name: "generateSfRoundingExplanation",
        access: "public",
        description: `Returns explanation of how the significant figures were rounded using latex (default) or plain text.  Uses the internally stored value
        to generate the explanation instead of the rounded value according to the internal signficant figures.`,
        overloads: [
            {
                parameters: [
                    {
                        name: "roundTo",
                        type: "number",
                        description: "Number of significant figures to round to.",
                    },
                    {
                        name: "options",
                        type: "hash",
                        keys: [
                            {
                                key: "suppressStart",
                                type: "boolean",
                                optional: true,
                                description: "Removes the start of the explanation that usually indicates the value and number of significant figures.",
                            },
                            {
                                key: "plainText",
                                type: "boolean",
                                optional: true,
                                description: "Force plain text output instead of latex.",
                            },
                        ],
                        optional: true,
                        description: "Options for the method.",
                    },
                ],
                returns: "latex or string",
            },
        ],
    },
    {
        type: "method",
        name: "generateAddSubtractExplanation",
        access: "public",
        description: `Returns explanation of how two InexactValues are added or subtracted using latex (default) or plain text.  While this is a method, it should have been
        a static function. :(`,
        overloads: [
            {
                parameters: [
                    {
                        name: "first",
                        type: "InexactValue",
                        description: "First InexactValue object.",
                    },
                    {
                        name: "second",
                        type: "InexactValue",
                        description: "Second InexactValue object.",
                    },
                    {
                        name: "operation",
                        type: "number",
                        description: "1 indicates addition, -1 indicates subtraction.",
                    },
                    {
                        name: "options",
                        type: "hash",
                        keys: [
                            {
                                key: "useUnroundedFirst",
                                type: "boolean",
                                optional: true,
                                description: "Use the unrounded, internal value of the first InexactValue object.",
                            },
                            {
                                key: "useUnroundedSecond",
                                type: "boolean",
                                optional: true,
                                description: "Use the unrounded, internal value of the second InexactValue object.",
                            },
                            {
                                key: "leaveUnrounded",
                                type: "boolean",
                                optional: true,
                                description: "Do not round the result of the operation.",
                            },
                            {
                                key: "plainText",
                                type: "boolean",
                                optional: true,
                                description: "Force plain text output instead of latex.",
                            },
                        ],
                        optional: true,
                        description: "Options for the method.",
                    },
                ],
                returns: "latex or string",
            },
        ],
    },
    {
        type: "method",
        name: "generateMultiplyDivideExplanation",
        access: "public",
        description: `Returns explanation of how two InexactValues are multiplied or divided using latex (default) or plain text.  While this is a method, it should have been
        a static function. :(`,
        overloads: [
            {
                parameters: [
                    {
                        name: "first",
                        type: "InexactValue",
                        description: "First InexactValue object.",
                    },
                    {
                        name: "second",
                        type: "InexactValue",
                        description: "Second InexactValue object.",
                    },
                    {
                        name: "operation",
                        type: "number",
                        description: "1 indicates multiplication, -1 indicates division.",
                    },
                    {
                        name: "options",
                        type: "hash",
                        keys: [
                            {
                                key: "useUnroundedFirst",
                                type: "boolean",
                                optional: true,
                                description: "Use the unrounded, internal value of the first InexactValue object.",
                            },
                            {
                                key: "useUnroundedSecond",
                                type: "boolean",
                                optional: true,
                                description: "Use the unrounded, internal value of the second InexactValue object.",
                            },
                            {
                                key: "leaveUnrounded",
                                type: "boolean",
                                optional: true,
                                description: "Do not round the result of the operation.",
                            },
                            {
                                key: "plainText",
                                type: "boolean",
                                optional: true,
                                description: "Force plain text output instead of latex.",
                            },
                        ],
                        optional: true,
                        description: "Options for the method.",
                    },
                ],
                returns: "latex or string",
            },
        ],
    },
    {
        type: "method",
        name: "getNameOfPosition",
        access: "public",
        description: `Returns name (i.e. tenths, hundreds) of the position in the value of the InexactValue object.  
        Beyond a certain point, instead of a name a description of how many places before or after the decimal point is returned.`,
        overloads: [
            {
                parameters: [
                    {
                        name: "digit",
                        type: "number",
                        description: `Positive values indicate the position to the right of the decimal, 
                        zero and negative values indicate the position to the left of the decimal.
                        For example, 1 would return "tenths" and -1 would return "tens". 0 is the ones place.`,
                    },
                ],
                returns: "string",
            },
        ],
    },
    {
        type: "method",
        name: "simpleUncertainty",
        access: "public",
        description: `Returns the simplistic (chemistry) uncertainty of the InexactValue object by assuming the last significant digit is plus or minus 1.`,
        overloads: [
            {
                parameters: [],
                returns: "string",
            },
        ],
    },
    {
        type: "static",
        name: "minSigFigs",
        access: "private",
        description: `Returns the smaller number of signficant figures between two InexactValues.`,
        overloads: [
            {
                parameters: [
                    {
                        name: "first",
                        type: "InexactValue",
                        description: "First InexactValue object.",
                    },
                    {
                        name: "second",
                        type: "InexactValue",
                        description: "Second InexactValue object.",
                    },
                ],
                returns: "number",
            },
        ],
    },
    {
        type: "static",
        name: "basicMin",
        access: "private",
        description: `Returns the smaller value of two numbers.`,
        overloads: [
            {
                parameters: [
                    {
                        name: "first",
                        type: "number",
                        description: "First number.",
                    },
                    {
                        name: "second",
                        type: "number",
                        description: "Second number.",
                    },
                ],
                returns: "number",
            },
        ],
    },
    {
        type: "method",
        name: "isExactZero",
        access: "private",
        description: `Returns 1 if number is exact and zero... i.e. value = 0 with Infinite significant figures.`,
        overloads: [
            {
                parameters: [],
                returns: "boolean",
            },
        ],
    },
    {
        type: "method",
        name: "isOne",
        access: "private",
        description: `Returns 1 if internal value is 1.  This is useful for dimensional analysis when students enter 1 in a blank.`,
        overloads: [
            {
                parameters: [],
                returns: "boolean",
            },
        ],
    },
    {
        type: "method",
        name: "leastSignificantPosition",
        access: "private",
        description: `Returns a value to indicate the least significant position.  
        Positive values indicate the position to the right of the decimal, 
        zero and negative values indicate the position to the left of the decimal.
        For example, 1 is "tenths" and -1 is "tens". 0 is the "ones" place.`,
        overloads: [
            {
                parameters: [
                    {
                        name: "options",
                        type: "hash",
                        keys: [
                            {
                                key: "useStringPosition",
                                type: "boolean",
                                optional: true,
                                description: "Convert to a string before determining the position.",
                            },
                        ],
                        optional: true,
                        description: "Options for the method.",
                    },
                ],
                returns: "string",
            },
        ],
    },
    {
        type: "method",
        name: "leastSignificantPositionLiteral",
        access: "private",
        description: `Returns a value to indicate the least significant position.  
        Positive values indicate the position to the right of the decimal, 
        zero and negative values indicate the position to the left of the decimal.
        For example, 1 is "tenths" and -1 is "tens". 0 is the "ones" place.
        SAME AS leastSignificantPosition with option useStringPosition.`,
        overloads: [
            {
                parameters: [],
                returns: "string",
            },
        ],
    },
    {
        type: "static",
        name: "highestDigitPosition",
        access: "private",
        description: `Returns a value to indicate the highest significant digit's position.  
        Positive values indicate the position to the right of the decimal, 
        zero and negative values indicate the position to the left of the decimal.
        For example, 1 is "tenths" and -1 is "tens". 0 is the "ones" place.`,
        overloads: [
            {
                parameters: [
                    {
                        name: "value",
                        type: "number",
                        description: "The number to analyze.",
                    },
                ],
                returns: "number",
            },
        ],
    },
    {
        type: "static",
        name: "calculateSigFigsForPosition",
        access: "private",
        description: `Returns the total number of significant figures for a value given the position of the last significant digit.`,
        overloads: [
            {
                parameters: [
                    {
                        name: "value",
                        type: "number",
                        description: "The number to analyze.",
                    },
                    {
                        name: "position",
                        type: "number",
                        description: `Positive values indicate the position to the right of the decimal, 
        zero and negative values indicate the position to the left of the decimal.
        For example, 1 is "tenths" and -1 is "tens". 0 is the "ones" place.`,
                    },
                ],
                returns: "number",
            },
        ],
    },
    {
        type: "method",
        name: "promote",
        access: "private",
        description: `Converts a plain value MathObject to an InexactValue object that has infinite significant figures.`,
        overloads: [
            {
                parameters: [],
                returns: "InexactValue",
            },
        ],
    },
    {
        type: "method",
        name: "checkOpOrderWithPromote",
        access: "private",
        description: `Used in Math Object operations to make numbers compatible for operations. If the other object is not an InexactValue, it is promoted to one.`,
        overloads: [
            {
                parameters: [],
                returns: "array",
            },
        ],
    },
    {
        type: "static",
        name: "addSubtractUncertainties",
        access: "private",
        description: `Calculate new uncertainty for addition or subtraction of two InexactValues and adds it to the result of the operation.`,
        overloads: [
            {
                parameters: [
                    {
                        name: "first",
                        type: "InexactValue",
                        description: "First InexactValue object.",
                    },
                    {
                        name: "second",
                        type: "InexactValue",
                        description: "Second InexactValue object.",
                    },
                    {
                        name: "resultToModify",
                        type: "InexactValue",
                        description: "Resulting InexactValue object from operation.",
                    },
                    {
                        name: "options",
                        type: "hash",
                        keys: [
                            {
                                key: "method",
                                type: "string",
                                optional: true,
                                description: "'quadrature' is the default method for calculating uncertainty.  Currently, no other methods are supported.",
                            }
                        ],
                        optional: true,
                        description: "Options for the method.",
                    },
                ],
                returns: "number",
            },
        ],
    },
    {
        type: "static",
        name: "multiplyDivideUncertainties",
        access: "private",
        description: `Calculate new uncertainty for multiplication or division of two InexactValues and adds it to the result of the operation.`,
        overloads: [
            {
                parameters: [
                    {
                        name: "first",
                        type: "InexactValue",
                        description: "First InexactValue object.",
                    },
                    {
                        name: "second",
                        type: "InexactValue",
                        description: "Second InexactValue object.",
                    },
                    {
                        name: "resultToModify",
                        type: "InexactValue",
                        description: "Resulting InexactValue object from operation.",
                    },
                    {
                        name: "options",
                        type: "hash",
                        keys: [
                            {
                                key: "method",
                                type: "string",
                                optional: true,
                                description: "'quadrature' is the default method for calculating uncertainty.  Currently, no other methods are supported.",
                            }
                        ],
                        optional: true,
                        description: "Options for the method.",
                    },
                ],
                returns: "number",
            },
        ],
    }
];
