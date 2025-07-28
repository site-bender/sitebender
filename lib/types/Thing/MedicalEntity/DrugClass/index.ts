import type Thing from "../../index.ts"
import type { MedicalEntityProps } from "../index.ts"
import type Drug from "../../Product/Drug/index.ts"

import DrugClassComponent from "../../../../../components/Thing/MedicalEntity/DrugClass/index.tsx"

export interface DrugClassProps {
	drug?: Drug
}

type DrugClass =
	& Thing
	& MedicalEntityProps
	& DrugClassProps

export default DrugClass
