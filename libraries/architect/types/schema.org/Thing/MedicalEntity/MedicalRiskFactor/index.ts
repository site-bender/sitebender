import type Thing from "../../index.ts"
import type MedicalEntity from "../index.ts"
import type { MedicalEntityProps } from "../index.ts"

import MedicalEntityComponent from "../../../../../../codewright/src/define/Thing/MedicalEntity/index.tsx"

export type MedicalRiskFactorType = "MedicalRiskFactor"

export interface MedicalRiskFactorProps {
	"@type"?: MedicalRiskFactorType
	increasesRiskOf?: MedicalEntity | ReturnType<typeof MedicalEntityComponent>
}

type MedicalRiskFactor = Thing & MedicalEntityProps & MedicalRiskFactorProps

export default MedicalRiskFactor
