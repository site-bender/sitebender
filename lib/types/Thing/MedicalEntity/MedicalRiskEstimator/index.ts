import MedicalEntity from "../index.ts"
import MedicalRiskFactor from "../MedicalRiskFactor/index.ts"

export default interface MedicalRiskEstimator extends MedicalEntity {
	/** The condition, complication, or symptom whose risk is being estimated. */
	estimatesRiskOf?: MedicalEntity
	/** A modifiable or non-modifiable risk factor included in the calculation, e.g. age, coexisting condition. */
	includedRiskFactor?: MedicalRiskFactor
}
