import { IApiItem, IHashItem } from "./interfaces";

export const contextFlags: IHashItem[] = [
    {
        key: "requireFormula",
        type: "boolean",
        default: 0,
        optional: true,
        description: `Needed for an answer checker to require a formula ONLY as an answer.  Otherwise, either are fine.  Cannot set both this and requireName to 1.`,
    },
    {
        key: "requireName",
        type: "boolean",
        default: 0,
        optional: true,
        description: `Needed for an answer checker to require a name ONLY as an answer.  Otherwise, either are fine.  Cannot set both this and requireFormula to 1.`,
    },
];

export const apiItems: IApiItem[] = [
    {
        type: "static",
        name: "constructor",
        access: "public",
        description: "Creates a new Chemical object.",
        overloads: [
            {
                parameters: [
                    {
                        name: "value",
                        type: "string",
                        description: "The string representation of the formula or name of an element or compound. Name translation limited to binary compounds.",
                    },
                ],
                returns: "Chemical",
                description: "Creates a new Chemical object according to the input string.",
                examples: [
                    {
                        example: 'Chemical("C_6H_{12}O_6")',
                        description: "Creates a new Chemical object that has 6 carbons, 12 hydrogens, and 6 oxygens all neutral charged.",
                    },
                    {
                        example: 'Chemical("Ca(NO3)_2")',
                        description: "Creates a new Chemical object that has 1 calcium ion and 2 nitrate ions and is named calcium nitrate.",
                    },
                    {
                        example: 'Chemical("iron (III) chloride")',
                        description: "Creates a new Chemical object that has 1 iron 3+ ion and 3 chloride ions.",
                    },
                ],
            },
        ],
    },
    {
        type: "static",
        name: "parseValue",
        access: "private",
        overloads: [
            {
                parameters: [
                    {
                        name: "value",
                        type: "string",
                        description: "The value to parse.",
                    },
                ],
                returns: "Chemical",
                description: "Parses the value into the Chemical object.  Can parse most formulas and names limited to binary compounds, elements, and polyatomic ions. ",
            },
        ],
    },
    {
        type: "static",
        name: "lcm",
        access: "private",
        overloads: [
            {
                parameters: [
                    {
                        name: "value",
                        type: "number",
                        description: "The first value.",
                    },
                    {
                        name: "value",
                        type: "number",
                        description: "The second value.",
                    },
                ],
                returns: "number",
                description: "Gets the least common multiple between two numbers.",
            },
        ],
    },
    {
        type: "static",
        name: "gcd",
        access: "private",
        overloads: [
            {
                parameters: [
                    {
                        name: "value",
                        type: "number",
                        description: "The first value.",
                    },
                    {
                        name: "value",
                        type: "number",
                        description: "The second value.",
                    },
                ],
                returns: "number",
                description: "Gets the greatest common divisor between two numbers.  Needed for lcm.",
            },
        ],
    },
    {
        type: "method",
        name: "guid",
        access: "private",
        overloads: [
            {
                parameters: [],
                returns: "string",
                description: "Gets a guid based on the formula represented as a string.  Won't work when isomers are supported.",
            },
        ],
    },
    {
        type: "method",
        name: "isElement",
        access: "public",
        overloads: [
            {
                parameters: [{
                    name: "options",
                    type: "hash",
                    keys: [
                        {
                            key: "returnElement",
                            type: "boolean",
                            default: 0,
                            optional: true,
                            description: "Returns element object instead of boolean. Needed in standardState method.",
                        }],
                    description: "Options for isElement method."
                }],
                returns: "boolean",
                description: "Determines whether the Chemical object is an element.",
                examples: [
                    {
                        example: "$val = Chemical('O_2'); $val->isElement();",
                        description: "Returns 1.",
                    },
                    {
                        example: "$val = Chemical('sodium nitrate'); $val->isElement();",
                        description: "Returns 0.",
                    },

                ],
            },
        ],
    },
    {
        type: "method",
        name: "standardState",
        access: "public",
        overloads: [
            {
                parameters: [],
                returns: "string",
                description: "Determines the standard state of an element. Returns 'solid', 'liquid', 'gas', or 'unknown'.  Returns 'unknown' always for compounds.",
            }
        ],
    },
    {
        type: "method",
        name: "meltingPoint",
        access: "public",
        overloads: [
            {
                parameters: [],
                returns: "number",
                description: "Returns the melting point of an element in Kelvin. Return -1 if unknown or compound.",
            }
        ],
    },
    {
        type: "method",
        name: "boilingPoint",
        access: "public",
        overloads: [
            {
                parameters: [],
                returns: "number",
                description: "Returns the boiling point of an element in Kelvin. Return -1 if unknown or compound.",
            }
        ],
    },
    {
        type: "method",
        name: "molarMass",
        access: "public",
        overloads: [
            {
                parameters: [],
                returns: "InexactValue",
                description: `Returns the molar mass of an element as an InexactValue.  Warning!  Ensure the student has access to these values 
                if you use them or else you will see rounding or precision errors due to variations in periodic tables.`,
            }
        ],
    },
    {
        type: "static",
        name: "compareAtomNums",
        access: "private",
        overloads: [
            {
                parameters: [{
                    name: "first",
                    type: "array",
                    description: "Array of atom numbers for the first Chemical object. i.e. H_2O would be [1,1,6]."
                },
                {
                    name: "second",
                    type: "array",
                    description: "Array of atom numbers for the second Chemical object."
                }],
                returns: "string",
                description: `Returns in the rounded value of the InexactValue as a string in scientific notation (1e-3) according to its number of significant figures.
                This method is a shortcut to the string method with specific parameters to express computer-readable values, but forced into scientific notation.`,
            },
        ],
    },
    {
        type: "method",
        name: "asNameString",
        access: "public",
        overloads: [
            {
                parameters: [],
                returns: "string",
                description: `Shortcut to the string method to return the name of the Chemical object.`
            },
        ],
    },
    {
        type: "method",
        name: "asNameTeX",
        access: "public",
        overloads: [
            {
                parameters: [],
                returns: "latex",
                description: `Shortcut to the TeX method to return the name of the Chemical object.`
            },
        ],
    },
    {
        type: "method",
        name: "asFormulaString",
        access: "public",
        overloads: [
            {
                parameters: [],
                returns: "string",
                description: `Shortcut to the string method to return the formula of the Chemical object.  Outputs unicode subscripts and superscripts, not HTML.`
            },
        ],
    },
    {
        type: "method",
        name: "asFormulaTeX",
        access: "public",
        overloads: [
            {
                parameters: [],
                returns: "latex",
                description: `Shortcut to the TeX method to return the formula of the Chemical object.`
            },
        ],
    },
    {
        type: "method",
        name: "string",
        access: "public",
        overloads: [
            {
                parameters: [
                    {
                        name: "options",
                        type: "hash",
                        keys: [
                            {
                                key: "asFormula",
                                type: "boolean",
                                optional: true,
                                description: "Force formula output.",
                            },
                            {
                                key: "asName",
                                type: "boolean",
                                optional: true,
                                description: "Force name output.",
                            },
                        ],
                        optional: true,
                        description: "Options for the method.",
                    }
                ],
                returns: "string",
                description: `Returns the string representation of the Chemical object.  Outputs unicode subscripts and superscripts, not HTML.  Without options,
                the output will match how the object was created.  i.e. if created with a formula, a formula is returned. `
            },
        ],
    },
    {
        type: "method",
        name: "TeX",
        access: "public",
        overloads: [
            {
                parameters: [
                    {
                        name: "options",
                        type: "hash",
                        keys: [
                            {
                                key: "asFormula",
                                type: "boolean",
                                optional: true,
                                description: "Force formula output.",
                            },
                            {
                                key: "asName",
                                type: "boolean",
                                optional: true,
                                description: "Force name output.",
                            },
                        ],
                        optional: true,
                        description: "Options for the method.",
                    }
                ],
                returns: "latex",
                description: `Returns the latex representation of the Chemical object.  Without options,
                the output will match how the object was created.  i.e. if created with a formula, a formula is returned. `
            },
        ],
    },
    {
        type: "static",
        name: "subscript",
        access: "private",
        overloads: [
            {
                parameters: [
                    {
                        name: "value",
                        type: "number",
                        description: "The value needed for subscript. Single digits only.",
                    },
                ],
                returns: "string",
                description: `Returns unicode subscript version of the number provided.`,
            },
        ],
    },
    {
        type: "static",
        name: "subscriptReverse",
        access: "private",
        overloads: [
            {
                parameters: [
                    {
                        name: "value",
                        type: "number",
                        description: "The unicode subscript value. Single digits only.",
                    },
                ],
                returns: "string",
                description: `Returns the plain value of the unicode subscript provided.`,
            },
        ],
    },
    {
        type: "static",
        name: "superscript",
        access: "private",
        overloads: [
            {
                parameters: [
                    {
                        name: "value",
                        type: "number",
                        description: "The value needed for superscript. Single digits only.",
                    },
                ],
                returns: "string",
                description: `Returns unicode superscript version of the number provided.`,
            },
        ],
    },
    {
        type: "static",
        name: "superscriptReverse",
        access: "private",
        overloads: [
            {
                parameters: [
                    {
                        name: "value",
                        type: "number",
                        description: "The unicode superscript value. Single digits only.",
                    },
                ],
                returns: "string",
                description: `Returns the plain value of the unicode superscript provided.`,
            },
        ],
    },
    
];
