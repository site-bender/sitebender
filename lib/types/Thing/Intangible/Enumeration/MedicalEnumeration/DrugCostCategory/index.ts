import type Thing from "../../../../index.ts"
import type { IntangibleProps } from "../../../index.ts"
import type { EnumerationProps } from "../../index.ts"
import type { MedicalEnumerationProps } from "../index.ts"

import DrugCostCategoryComponent from "../../../../../../../components/Thing/Intangible/Enumeration/MedicalEnumeration/DrugCostCategory/index.tsx"

export interface DrugCostCategoryProps {
}

type DrugCostCategory =
	& Thing
	& IntangibleProps
	& EnumerationProps
	& MedicalEnumerationProps
	& DrugCostCategoryProps

export default DrugCostCategory
