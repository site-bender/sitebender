import type { Text } from "../../../../DataType/index.ts"
import type Thing from "../../../index.ts"
import type MedicalEntity from "../../index.ts"
import type { MedicalEntityProps } from "../../index.ts"
import type { AnatomicalStructureProps } from "../index.ts"

export interface JointProps {
	/** The biomechanical properties of the bone. */
	biomechnicalClass?: Text
	/** The degree of mobility the joint allows. */
	functionalClass?: Text | MedicalEntity
	/** The name given to how bone physically connects to each other. */
	structuralClass?: Text
}

type Joint =
	& Thing
	& AnatomicalStructureProps
	& MedicalEntityProps
	& JointProps

export default Joint
