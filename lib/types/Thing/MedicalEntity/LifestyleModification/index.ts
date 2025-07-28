import type Thing from "../../index.ts"
import type { MedicalEntityProps } from "../index.ts"

import LifestyleModificationComponent from "../../../../../components/Thing/MedicalEntity/LifestyleModification/index.tsx"

export interface LifestyleModificationProps {
}

type LifestyleModification =
	& Thing
	& MedicalEntityProps
	& LifestyleModificationProps

export default LifestyleModification
