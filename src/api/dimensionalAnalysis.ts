import { IApiItem, IHashItem } from "./interfaces";

export const contextFlags: IHashItem[] = [];

export const apiItems: IApiItem[] = [
    {
        type: "method",
        access: "public",
        name: "asDimensionalAnalysis",
        description: `Grades the answers in the MultiAnswer object as a series of dimensional analysis blanks.`,
        overloads: [
            {
                parameters: [
                    {
                        name: "given",
                        type: "InexactValueWithUnits",
                        description: "The starting value for a dimensional analysis problem.",
                    },
                    {
                        name: "options",
                        type: "hash",
                        keys:[
                            {
                                key: "gradeGiven",
                                default: 0,
                                type: "boolean",
                                description: "If true, the given (starting) value should also be graded as it was included in the MultiAnswer object.",
                            }
                        ],
                        description: "Options",
                    },
                ],
                returns: "MultiAnswer",
                description: `Grades the answers in the MultiAnswer object as a series of dimensional analysis blanks.  
                Each pair of answers in the MultiAnswer is treated as the numerator and denominator of each conversion factor in the problem.
                The last odd answer is treated as the final answer for the problem.`,
                examples: [
                    {
                        example: `$ma = MultiAnswer($n1,$d1,$answer)->asDimensionalAnalysis($given);

BEGIN_PGML

Convert [$given] to milliliters using the fact that 1 pt = 473.176 mL.

[@conversionEQ($given,[ans_rule(10),ans_rule(10)],ans_rule(10));@]*

END_PGML

ANS($ma->cmp);
`,
                        description: `$given is the starting value for the dimensional analysis problem.
                        $n1 and $d1 are numerator and denominator of the conversion factor needed to solve the problem.
                        $answer is the final answer to the problem.  In this example, each blank is equally weighted for grading.
                        @conversionEQ is a custom macro that formats the problem for the student.`,
                    },
                    {
                        example: `$ma = MultiAnswer($given,$n1,$d1,$answer)->asDimensionalAnalysis($given, {gradeGiven: 1});

BEGIN_PGML

Find the volume of an object if it has a mass of 2.440g and a density of 1.45g/cm^3.

[@conversionEQ(ans_rule,[ans_rule(10),ans_rule(10)],ans_rule(10));@]*

END_PGML

ANS($ma->cmp);
`,
                        description: `$given is the starting value (2.440g) for the dimensional analysis problem.
                        $n1 and $d1 are numerator and denominator of the conversion factor needed to solve the problem.
                        $answer is the final answer to the problem.  The given value is also graded in this example.
                        Notice the extra ans_rule in the conversionEQ function instead of the given value.`,
                    },
                ],
            },
            
        ],
    },
    {
        type: "method",
        access: "public",
        name: "asConversionFactor",
        description: `Grades a pair of answers in the MultiAnswer object as a specific conversion factor.  
        This requires correct units in the correct spots, but the values only need to have the correct ratio, not the correct values.
        i.e. 100cm/1m is just as valid as 1cm/0.01m.`,
        overloads: [
            {
                parameters: [],
                returns: "MultiAnswer",
                description: `Grades a pair of answers in the MultiAnswer object as a specific conversion factor.  
        This requires correct units in the correct spots, but the values only need to have the correct ratio, not the correct values.
        i.e. 100cm/1m is just as valid as 1cm/0.01m.`,
                examples: [
                    {
                        example: `$ma = MultiAnswer($n1,$d1)->asConversionFactor();

BEGIN_PGML

Write the conversion factor that gives a conversion from meters to centimeters.

[@ conversionFactor(ans_rule(10), ans_rule(10)) @]*

END_PGML

ANS($ma->cmp);
`,
                        description: `$n1 and $d1 are numerator and denominator of the conversion factor needed to solve the problem.
                        @conversionFactor is a custom macro that formats the problem for the student.  A student can provide either
                        100cm/1m or 1cm/0.01m and both will be graded as correct.  Incorrect units or bad ratios will be marked as incorrect.`,
                    },
                ],
            },
        ],
    },
    {
        type: "method",
        access: "public",
        name: "asEquality",
        overloads: [
            {
                parameters: [],
                returns: "MultiAnswer",
                description: `Grades a pair of answers in the MultiAnswer object as an equality.  Order does NOT matter.  
                i.e. 100cm = 1m is just as valid as 1cm = 0.01m.  1m = 100cm is also valid.`,
                examples: [
                    {
                        example: `# using 1 kg = 1000 g
$inf = 9**9**9;
$n1 = InexactValueWithUnits([1000, inf], 'g'); 
$d1 = InexactValueWithUnits([1, $inf], 'kg'); # make this exact (infinite s.f., 9**9**9 is a shortcut for infinity)

$equalityMultiAnswer1 = MultiAnswer($n1,$d1)->asEquality();

# Equality Statement Checker
ANS($equalityMultiAnswer1->cmp);
`,
                        description: `$n1 and $d1 are two sides of the equality. The question would likely ask the student to write 
                        an equality statement that relates g to kg.  Units can go on either side of the equality, and values don't have
                        to be specific as long as the equality is valid.`,
                    },
                ],
            },
        ],
    },
    {
        type: "method",
        access: "public",
        name: "asPairOfConversionFactors",
        overloads: [
            {
                parameters: [],
                returns: "MultiAnswer",
                description: `Grades 4 answers in the MultiAnswer object as a pair of conversion factors.  This would only be used
                to force students to write the conversion factors generated from a single equality statement.  Order does not matter.`,
                examples: [
                    {
                        example: `$conversionFactorsMultiAnswer = MultiAnswer($n1,$d1,$d1,$n1)->asPairOfConversionFactors();`,
                        description: `$n1 and $d1 are numerator and denominator of the conversion factor needed to solve the problem.
                        They both appear twice in the MultiAnswer object because the student is filling in 4 different blanks.`,
                    },
                ],
            },
        ],
    },
];
