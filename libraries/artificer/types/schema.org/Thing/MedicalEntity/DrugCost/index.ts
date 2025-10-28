import type { Number, Text } from "../../../DataType/index.ts"
import type Thing from "../../index.ts"
import type DrugCostCategory from "../../Intangible/Enumeration/MedicalEnumeration/DrugCostCategory/index.ts"
import type QualitativeValue from "../../Intangible/Enumeration/QualitativeValue/index.ts"
import type AdministrativeArea from "../../Place/AdministrativeArea/index.ts"
import type { MedicalEntityProps } from "../index.ts"

import DrugCostCategoryComponent from "../../../../../../architect/src/define/Thing/Intangible/Enumeration/MedicalEnumeration/DrugCostCategory/index.tsx"
import QualitativeValueComponent from "../../../../../../architect/src/define/Thing/Intangible/Enumeration/QualitativeValue/index.tsx"
import AdministrativeAreaComponent from "../../../../../../architect/src/define/Thing/Place/AdministrativeArea/index.tsx"

export type DrugCostType = "DrugCost"

export interface DrugCostProps {
	"@type"?: DrugCostType
	applicableLocation?:
		| AdministrativeArea
		| ReturnType<typeof AdministrativeAreaComponent>
	costCategory?:
		| DrugCostCategory
		| ReturnType<typeof DrugCostCategoryComponent>
	costCurrency?: Text
	costOrigin?: Text
	costPerUnit?:
		| Number
		| QualitativeValue
		| Text
		| ReturnType<typeof QualitativeValueComponent>
	drugUnit?: Text
}

type DrugCost = Thing & MedicalEntityProps & DrugCostProps

export default DrugCost
