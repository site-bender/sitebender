import type Thing from "../../index.ts"
import type MedicalEntity from "../index.ts"
import type { MedicalEntityProps } from "../index.ts"

export interface MedicalCauseProps {
	/** The condition, complication, symptom, sign, etc. caused. */
	causeOf?: MedicalEntity
}

type MedicalCause =
	& Thing
	& MedicalEntityProps
	& MedicalCauseProps

export default MedicalCause
