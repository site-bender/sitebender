import type { Text } from "../../../../DataType/index.ts"
import type Thing from "../../../index.ts"
import type { MedicalEntityProps } from "../../index.ts"
import type { MedicalRiskEstimatorProps } from "../index.ts"

export interface MedicalRiskScoreProps {
	algorithm?: Text
}

type MedicalRiskScore =
	& Thing
	& MedicalEntityProps
	& MedicalRiskEstimatorProps
	& MedicalRiskScoreProps

export default MedicalRiskScore
