import type Thing from "../../index.ts"
import type MedicalEntity from "../index.ts"
import type { MedicalEntityProps } from "../index.ts"

import { MedicalEntity as MedicalEntityComponent } from "../../../../../components/index.tsx"

export type MedicalCauseType = "MedicalCause"

export interface MedicalCauseProps {
	"@type"?: MedicalCauseType
	causeOf?: MedicalEntity | ReturnType<typeof MedicalEntityComponent>
}

type MedicalCause = Thing & MedicalEntityProps & MedicalCauseProps

export default MedicalCause
