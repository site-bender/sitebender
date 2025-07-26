import type Thing from "../../index.ts"
import type { MedicalEntityProps } from "../index.ts"
import type MedicalEntity from "../index.ts"

export interface MedicalCauseProps {
	causeOf?: MedicalEntity
}

type MedicalCause =
	& Thing
	& MedicalEntityProps
	& MedicalCauseProps

export default MedicalCause
