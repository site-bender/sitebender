import type Thing from "../../index.ts"
import type MedicalEntity from "../index.ts"
import type { MedicalEntityProps } from "../index.ts"

export interface MedicalRiskFactorProps {
	/** The condition, complication, etc. influenced by this factor. */
	increasesRiskOf?: MedicalEntity
}

type MedicalRiskFactor =
	& Thing
	& MedicalEntityProps
	& MedicalRiskFactorProps

export default MedicalRiskFactor
