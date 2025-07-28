import type Thing from "../../index.ts"
import type { MedicalEntityProps } from "../index.ts"

export interface LifestyleModificationProps {}

type LifestyleModification =
	& Thing
	& MedicalEntityProps
	& LifestyleModificationProps

export default LifestyleModification
