import type Thing from "../../index.ts"
import type MedicalEntity from "../index.ts"
import type { MedicalEntityProps } from "../index.ts"
import type MedicalRiskFactor from "../MedicalRiskFactor/index.ts"

export interface MedicalRiskEstimatorProps {
	/** The condition, complication, or symptom whose risk is being estimated. */
	estimatesRiskOf?: MedicalEntity
	/** A modifiable or non-modifiable risk factor included in the calculation, e.g. age, coexisting condition. */
	includedRiskFactor?: MedicalRiskFactor
}

type MedicalRiskEstimator =
	& Thing
	& MedicalEntityProps
	& MedicalRiskEstimatorProps

export default MedicalRiskEstimator
