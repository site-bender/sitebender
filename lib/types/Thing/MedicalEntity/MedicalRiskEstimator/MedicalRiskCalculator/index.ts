import type Thing from "../../../index.ts"
import type { MedicalEntityProps } from "../../index.ts"
import type { MedicalRiskEstimatorProps } from "../index.ts"

export interface MedicalRiskCalculatorProps {
}

type MedicalRiskCalculator =
	& Thing
	& MedicalEntityProps
	& MedicalRiskEstimatorProps
	& MedicalRiskCalculatorProps

export default MedicalRiskCalculator
