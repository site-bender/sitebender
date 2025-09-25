import type Thing from "../../index.ts"
import type MedicalEntity from "../index.ts"
import type { MedicalEntityProps } from "../index.ts"
import type MedicalRiskFactor from "../MedicalRiskFactor/index.ts"
import type { MedicalRiskCalculatorType } from "./MedicalRiskCalculator/index.ts"
import type { MedicalRiskScoreType } from "./MedicalRiskScore/index.ts"

import MedicalEntityComponent from "../../../../../../pagewright/src/define/Thing/MedicalEntity/index.tsx"
import MedicalRiskFactorComponent from "../../../../../../pagewright/src/define/Thing/MedicalEntity/MedicalRiskFactor/index.tsx"

export type MedicalRiskEstimatorType =
	| "MedicalRiskEstimator"
	| MedicalRiskScoreType
	| MedicalRiskCalculatorType

export interface MedicalRiskEstimatorProps {
	"@type"?: MedicalRiskEstimatorType
	estimatesRiskOf?: MedicalEntity | ReturnType<typeof MedicalEntityComponent>
	includedRiskFactor?:
		| MedicalRiskFactor
		| ReturnType<typeof MedicalRiskFactorComponent>
}

type MedicalRiskEstimator =
	& Thing
	& MedicalEntityProps
	& MedicalRiskEstimatorProps

export default MedicalRiskEstimator
