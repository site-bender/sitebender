import type { Text } from "../../../../DataType/index.ts"
import type Thing from "../../../index.ts"
import type { MedicalEntityProps } from "../../index.ts"
import type { MedicalRiskEstimatorProps } from "../index.ts"

export interface MedicalRiskScoreProps {
	/** The algorithm or rules to follow to compute the score. */
	algorithm?: Text
}

type MedicalRiskScore =
	& Thing
	& MedicalEntityProps
	& MedicalRiskEstimatorProps
	& MedicalRiskScoreProps

export default MedicalRiskScore
