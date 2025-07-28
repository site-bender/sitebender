import type Thing from "../../index.ts"
import type { MedicalEntityProps } from "../index.ts"

import MedicalIntangibleComponent from "../../../../../components/Thing/MedicalEntity/MedicalIntangible/index.tsx"

export interface MedicalIntangibleProps {
}

type MedicalIntangible =
	& Thing
	& MedicalEntityProps
	& MedicalIntangibleProps

export default MedicalIntangible
