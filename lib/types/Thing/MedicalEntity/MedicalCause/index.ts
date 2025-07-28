import type Thing from "../../index.ts"
import type { MedicalEntityProps } from "../index.ts"
import type MedicalEntity from "../index.ts"

import MedicalCauseComponent from "../../../../../components/Thing/MedicalEntity/MedicalCause/index.tsx"

export interface MedicalCauseProps {
	causeOf?: MedicalEntity
}

type MedicalCause =
	& Thing
	& MedicalEntityProps
	& MedicalCauseProps

export default MedicalCause
