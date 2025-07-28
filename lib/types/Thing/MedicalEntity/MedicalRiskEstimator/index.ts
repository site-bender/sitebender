import type Thing from "../../index.ts"
import type MedicalEntity from "../index.ts"
import type { MedicalEntityProps } from "../index.ts"
import type MedicalRiskFactor from "../MedicalRiskFactor/index.ts"

import MedicalEntityComponent from "../../../../components/Thing/MedicalEntity/index.ts"
import MedicalRiskFactorComponent from "../../../../components/Thing/MedicalEntity/MedicalRiskFactor/index.ts"

export interface MedicalRiskEstimatorProps {
	estimatesRiskOf?: MedicalEntity | ReturnType<typeof MedicalEntityComponent>
	includedRiskFactor?:
		| MedicalRiskFactor
		| ReturnType<typeof MedicalRiskFactorComponent>
}

type MedicalRiskEstimator =
	& Thing
	& MedicalEntityProps
	& MedicalRiskEstimatorProps

export default MedicalRiskEstimator
