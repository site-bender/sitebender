import type { Text } from "../../../../DataType/index.ts"
import type MedicalRiskEstimator from "../index.ts"

export default interface MedicalRiskScore extends MedicalRiskEstimator {
	/** The algorithm or rules to follow to compute the score. */
	algorithm?: Text
}
