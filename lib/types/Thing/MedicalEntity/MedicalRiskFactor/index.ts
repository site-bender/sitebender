import type Thing from "../../index.ts"
import type { MedicalEntityProps } from "../index.ts"
import type MedicalEntity from "../index.ts"

export interface MedicalRiskFactorProps {
	increasesRiskOf?: MedicalEntity
}

type MedicalRiskFactor =
	& Thing
	& MedicalEntityProps
	& MedicalRiskFactorProps

export default MedicalRiskFactor
