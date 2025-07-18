import type MedicalEntity from "../index.ts"

export default interface MedicalRiskFactor extends MedicalEntity {
	/** The condition, complication, etc. influenced by this factor. */
	increasesRiskOf?: MedicalEntity
}
