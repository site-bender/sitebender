import type Thing from "../../../../index.ts"
import type { IntangibleProps } from "../../../index.ts"
import type { EnumerationProps } from "../../index.ts"
import type { MedicalEnumerationProps } from "../index.ts"

export type DrugCostCategoryType = "DrugCostCategory"

export interface DrugCostCategoryProps {
	"@type"?: DrugCostCategoryType
}

type DrugCostCategory =
	& Thing
	& IntangibleProps
	& EnumerationProps
	& MedicalEnumerationProps
	& DrugCostCategoryProps

export default DrugCostCategory
