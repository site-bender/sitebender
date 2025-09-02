import type { Boolean, Text } from "../../../DataType/index.ts"
import type Thing from "../../index.ts"
import type MedicalEnumeration from "../../Intangible/Enumeration/MedicalEnumeration/index.ts"
import type { MedicalEntityProps } from "../../MedicalEntity/index.ts"
import type MaximumDoseSchedule from "../../MedicalEntity/MedicalIntangible/DoseSchedule/MaximumDoseSchedule/index.ts"
import type RecommendedDoseSchedule from "../../MedicalEntity/MedicalIntangible/DoseSchedule/RecommendedDoseSchedule/index.ts"
import type DrugLegalStatus from "../../MedicalEntity/MedicalIntangible/DrugLegalStatus/index.ts"
import type { SubstanceProps } from "../../MedicalEntity/Substance/index.ts"
import type { ProductProps } from "../index.ts"

import { DrugLegalStatus as DrugLegalStatusComponent } from "../../../../../components/index.tsx"
import { MaximumDoseSchedule as MaximumDoseScheduleComponent } from "../../../../../components/index.tsx"
import { MedicalEnumeration as MedicalEnumerationComponent } from "../../../../../components/index.tsx"
import { RecommendedDoseSchedule as RecommendedDoseScheduleComponent } from "../../../../../components/index.tsx"

export type DietarySupplementType = "DietarySupplement"

export interface DietarySupplementProps {
	"@type"?: DietarySupplementType
	activeIngredient?: Text
	isProprietary?: Boolean
	legalStatus?:
		| DrugLegalStatus
		| MedicalEnumeration
		| Text
		| ReturnType<typeof DrugLegalStatusComponent>
		| ReturnType<typeof MedicalEnumerationComponent>
	maximumIntake?:
		| MaximumDoseSchedule
		| ReturnType<typeof MaximumDoseScheduleComponent>
	mechanismOfAction?: Text
	nonProprietaryName?: Text
	proprietaryName?: Text
	recommendedIntake?:
		| RecommendedDoseSchedule
		| ReturnType<typeof RecommendedDoseScheduleComponent>
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
