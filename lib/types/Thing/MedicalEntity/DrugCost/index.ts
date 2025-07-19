import type { Number, Text } from "../../../DataType/index.ts"
import type Thing from "../../index.ts"
import type DrugCostCategory from "../../Intangible/Enumeration/MedicalEnumeration/DrugCostCategory/index.ts"
import type QualitativeValue from "../../Intangible/Enumeration/QualitativeValue/index.ts"
import type AdministrativeArea from "../../Place/AdministrativeArea/index.ts"
import type { MedicalEntityProps } from "../index.ts"

export interface DrugCostProps {
	/** The location in which the status applies. */
	applicableLocation?: AdministrativeArea
	/** The category of cost, such as wholesale, retail, reimbursement cap, etc. */
	costCategory?: DrugCostCategory
	/** The currency (in 3-letter) of the drug cost. See: http://en.wikipedia.org/wiki/ISO_4217. */
	costCurrency?: Text
	/** Additional details to capture the origin of the cost data. For example, 'Medicare Part B'. */
	costOrigin?: Text
	/** The cost per unit of the drug. */
	costPerUnit?: Number | QualitativeValue | Text
	/** The unit in which the drug is measured, e.g. '5 mg tablet'. */
	drugUnit?: Text
}

type DrugCost =
	& Thing
	& MedicalEntityProps
	& DrugCostProps

export default DrugCost
