// MedicalRiskCalculator extends MedicalRiskEstimator but adds no additional properties
import type Thing from "../../../index.ts"
import type { MedicalEntityProps } from "../../index.ts"
import type { MedicalRiskEstimatorProps } from "../index.ts"

// deno-lint-ignore no-empty-interface
export interface MedicalRiskCalculatorProps {}

type MedicalRiskCalculator =
	& Thing
	& MedicalEntityProps
	& MedicalRiskEstimatorProps
	& MedicalRiskCalculatorProps

export default MedicalRiskCalculator
