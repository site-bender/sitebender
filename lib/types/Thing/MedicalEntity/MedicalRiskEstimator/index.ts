import type Thing from "../../index.ts"
import type { MedicalEntityProps } from "../index.ts"
import type MedicalEntity from "../index.ts"
import type MedicalRiskFactor from "../MedicalRiskFactor/index.ts"

import MedicalRiskEstimatorComponent from "../../../../../components/Thing/MedicalEntity/MedicalRiskEstimator/index.tsx"

export interface MedicalRiskEstimatorProps {
	estimatesRiskOf?: MedicalEntity
	includedRiskFactor?: MedicalRiskFactor
}

type MedicalRiskEstimator =
	& Thing
	& MedicalEntityProps
	& MedicalRiskEstimatorProps

export default MedicalRiskEstimator
