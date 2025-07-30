import type Thing from "../../index.ts"
import type MedicalEntity from "../index.ts"
import type { MedicalEntityProps } from "../index.ts"

import MedicalEntityComponent from "../../../../components/Thing/MedicalEntity/index.ts"

export interface MedicalRiskFactorProps {
	"@type"?: "MedicalRiskFactor"
	increasesRiskOf?: MedicalEntity | ReturnType<typeof MedicalEntityComponent>
}

type MedicalRiskFactor = Thing & MedicalEntityProps & MedicalRiskFactorProps

export default MedicalRiskFactor
