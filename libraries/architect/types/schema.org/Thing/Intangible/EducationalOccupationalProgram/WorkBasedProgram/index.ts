import type { Text } from "../../../../DataType/index.ts"
import type Thing from "../../../index.ts"
import type CategoryCode from "../../DefinedTerm/CategoryCode/index.ts"
import type { IntangibleProps } from "../../index.ts"
import type MonetaryAmountDistribution from "../../StructuredValue/QuantitativeValueDistribution/MonetaryAmountDistribution/index.ts"
import type { EducationalOccupationalProgramProps } from "../index.ts"

import CategoryCodeComponent from "../../../../../../../codewright/src/define/Thing/Intangible/DefinedTerm/CategoryCode/index.tsx"
import MonetaryAmountDistributionComponent from "../../../../../../../codewright/src/define/Thing/Intangible/StructuredValue/QuantitativeValueDistribution/MonetaryAmountDistribution/index.tsx"

export type WorkBasedProgramType = "WorkBasedProgram"

export interface WorkBasedProgramProps {
	"@type"?: WorkBasedProgramType
	occupationalCategory?:
		| CategoryCode
		| Text
		| ReturnType<typeof CategoryCodeComponent>
	trainingSalary?:
		| MonetaryAmountDistribution
		| ReturnType<typeof MonetaryAmountDistributionComponent>
}

type WorkBasedProgram =
	& Thing
	& IntangibleProps
	& EducationalOccupationalProgramProps
	& WorkBasedProgramProps

export default WorkBasedProgram
