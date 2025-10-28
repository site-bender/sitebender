import type Thing from "../../index.ts"
import type { MedicalEntityProps } from "../index.ts"
import type { DietType } from "./Diet/index.ts"
import type { PhysicalActivityType } from "./PhysicalActivity/index.ts"

export type LifestyleModificationType =
	| "LifestyleModification"
	| PhysicalActivityType
	| DietType

export interface LifestyleModificationProps {
	"@type"?: LifestyleModificationType
}

type LifestyleModification =
	& Thing
	& MedicalEntityProps
	& LifestyleModificationProps

export default LifestyleModification
