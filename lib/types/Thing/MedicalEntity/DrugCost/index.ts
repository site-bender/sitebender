import type { Number, Text } from "../../../DataType/index.ts"
import type Thing from "../../index.ts"
import type { MedicalEntityProps } from "../index.ts"
import type AdministrativeArea from "../../Place/AdministrativeArea/index.ts"
import type DrugCostCategory from "../../Intangible/Enumeration/MedicalEnumeration/DrugCostCategory/index.ts"
import type QualitativeValue from "../../Intangible/Enumeration/QualitativeValue/index.ts"

import DrugCostComponent from "../../../../../components/Thing/MedicalEntity/DrugCost/index.tsx"

export interface DrugCostProps {
	applicableLocation?: AdministrativeArea
	costCategory?: DrugCostCategory
	costCurrency?: Text
	costOrigin?: Text
	costPerUnit?: Number | QualitativeValue | Text
	drugUnit?: Text
}

type DrugCost =
	& Thing
	& MedicalEntityProps
	& DrugCostProps

export default DrugCost
