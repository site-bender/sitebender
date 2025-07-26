import type { Text } from "../../../../DataType/index.ts"
import type Thing from "../../../index.ts"
import type { IntangibleProps } from "../../index.ts"
import type { EducationalOccupationalProgramProps } from "../index.ts"
import type CategoryCode from "../../DefinedTerm/CategoryCode/index.ts"
import type MonetaryAmountDistribution from "../../StructuredValue/QuantitativeValueDistribution/MonetaryAmountDistribution/index.ts"

export interface WorkBasedProgramProps {
	occupationalCategory?: CategoryCode | Text
	trainingSalary?: MonetaryAmountDistribution
}

type WorkBasedProgram =
	& Thing
	& IntangibleProps
	& EducationalOccupationalProgramProps
	& WorkBasedProgramProps

export default WorkBasedProgram
