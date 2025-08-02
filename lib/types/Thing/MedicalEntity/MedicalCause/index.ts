import type Thing from "../../index.ts"
import type MedicalEntity from "../index.ts"
import type { MedicalEntityProps } from "../index.ts"

import MedicalEntityComponent from "../../../../components/Thing/MedicalEntity/index.ts"

export type MedicalCauseType = "MedicalCause"

export interface MedicalCauseProps {
	"@type"?: MedicalCauseType
	causeOf?: MedicalEntity | ReturnType<typeof MedicalEntityComponent>
}

type MedicalCause = Thing & MedicalEntityProps & MedicalCauseProps

export default MedicalCause
