import type Thing from "../../index.ts"
import type Drug from "../../Product/Drug/index.ts"
import type { MedicalEntityProps } from "../index.ts"

import DrugComponent from "../../../../../src/define/Thing/Product/Drug/index.tsx"

export type DrugClassType = "DrugClass"

export interface DrugClassProps {
	"@type"?: DrugClassType
	drug?: Drug | ReturnType<typeof DrugComponent>
}

type DrugClass = Thing & MedicalEntityProps & DrugClassProps

export default DrugClass
