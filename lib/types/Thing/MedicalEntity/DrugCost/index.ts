import { Number, Text } from "../../../DataType/index.ts"
import DrugCostCategory from "../../Intangible/Enumeration/MedicalEnumeration/DrugCostCategory/index.ts"
import QualitativeValue from "../../Intangible/Enumeration/QualitativeValue/index.ts"
import AdministrativeArea from "../../Place/AdministrativeArea/index.ts"
import MedicalEntity from "../index.ts"

export default interface DrugCost extends MedicalEntity {
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
