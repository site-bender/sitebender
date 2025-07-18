import type MedicalEntity from "../index.ts"

export default interface MedicalCause extends MedicalEntity {
	/** The condition, complication, symptom, sign, etc. caused. */
	causeOf?: MedicalEntity
}
