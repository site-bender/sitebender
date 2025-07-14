import { Text } from "../../../../DataType/index.ts"
import MedicalEntity from "../..//index.ts"
import AnatomicalStructure from "../index.ts"

export default interface Joint extends AnatomicalStructure {
	/** The biomechanical properties of the bone. */
	biomechnicalClass?: Text
	/** The degree of mobility the joint allows. */
	functionalClass?: Text | MedicalEntity
	/** The name given to how bone physically connects to each other. */
	structuralClass?: Text
}
