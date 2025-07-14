import { Text } from "../../../../DataType/index.ts"
import MedicalRiskEstimator from "../index.ts"

export default interface MedicalRiskScore extends MedicalRiskEstimator {
	/** The algorithm or rules to follow to compute the score. */
	algorithm?: Text
}
