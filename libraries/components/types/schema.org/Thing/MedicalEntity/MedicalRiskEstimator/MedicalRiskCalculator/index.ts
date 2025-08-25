import type Thing from "../../../index.ts"
import type { MedicalEntityProps } from "../../index.ts"
import type { MedicalRiskEstimatorProps } from "../index.ts"

export type MedicalRiskCalculatorType = "MedicalRiskCalculator"

export interface MedicalRiskCalculatorProps {
	"@type"?: MedicalRiskCalculatorType
}

type MedicalRiskCalculator =
	& Thing
	& MedicalEntityProps
	& MedicalRiskEstimatorProps
	& MedicalRiskCalculatorProps

export default MedicalRiskCalculator
