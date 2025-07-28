import type { Boolean, Text } from "../../../DataType/index.ts"
import type Thing from "../../index.ts"
import type { MedicalEntityProps } from "../../MedicalEntity/index.ts"
import type { SubstanceProps } from "../../MedicalEntity/Substance/index.ts"
import type { ProductProps } from "../index.ts"
import type DrugLegalStatus from "../../MedicalEntity/MedicalIntangible/DrugLegalStatus/index.ts"
import type MaximumDoseSchedule from "../../MedicalEntity/MedicalIntangible/DoseSchedule/MaximumDoseSchedule/index.ts"
import type MedicalEnumeration from "../../Intangible/Enumeration/MedicalEnumeration/index.ts"
import type RecommendedDoseSchedule from "../../MedicalEntity/MedicalIntangible/DoseSchedule/RecommendedDoseSchedule/index.ts"

import DietarySupplementComponent from "../../../../../components/Thing/Product/DietarySupplement/index.tsx"

export interface DietarySupplementProps {
	activeIngredient?: Text
	isProprietary?: Boolean
	legalStatus?: DrugLegalStatus | MedicalEnumeration | Text
	maximumIntake?: MaximumDoseSchedule
	mechanismOfAction?: Text
	nonProprietaryName?: Text
	proprietaryName?: Text
	recommendedIntake?: RecommendedDoseSchedule
	safetyConsideration?: Text
	targetPopulation?: Text
}

type DietarySupplement =
	& Thing
	& MedicalEntityProps
	& SubstanceProps
	& ProductProps
	& DietarySupplementProps

export default DietarySupplement
