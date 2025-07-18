import type { Text } from "../../../../DataType/index.ts"
import type MedicalEntity from "../../index.ts"
import type AnatomicalStructure from "../index.ts"

export default interface Joint extends AnatomicalStructure {
	/** The biomechanical properties of the bone. */
	biomechnicalClass?: Text
	/** The degree of mobility the joint allows. */
	functionalClass?: Text | MedicalEntity
	/** The name given to how bone physically connects to each other. */
	structuralClass?: Text
}
