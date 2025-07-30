import type { Text } from "../../../../DataType/index.ts"
import type Thing from "../../../index.ts"
import type CategoryCode from "../../DefinedTerm/CategoryCode/index.ts"
import type { IntangibleProps } from "../../index.ts"
import type MonetaryAmountDistribution from "../../StructuredValue/QuantitativeValueDistribution/MonetaryAmountDistribution/index.ts"
import type { EducationalOccupationalProgramProps } from "../index.ts"

import CategoryCodeComponent from "../../../../../components/Thing/Intangible/DefinedTerm/CategoryCode/index.ts"
import MonetaryAmountDistributionComponent from "../../../../../components/Thing/Intangible/StructuredValue/QuantitativeValueDistribution/MonetaryAmountDistribution/index.ts"

export interface WorkBasedProgramProps {
	"@type"?: "WorkBasedProgram"
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
