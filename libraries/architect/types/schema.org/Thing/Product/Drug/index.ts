import type { Boolean, Text, URL } from "../../../DataType/index.ts"
import type Thing from "../../index.ts"
import type DrugPregnancyCategory from "../../Intangible/Enumeration/MedicalEnumeration/DrugPregnancyCategory/index.ts"
import type DrugPrescriptionStatus from "../../Intangible/Enumeration/MedicalEnumeration/DrugPrescriptionStatus/index.ts"
import type MedicalEnumeration from "../../Intangible/Enumeration/MedicalEnumeration/index.ts"
import type HealthInsurancePlan from "../../Intangible/HealthInsurancePlan/index.ts"
import type DrugClass from "../../MedicalEntity/DrugClass/index.ts"
import type { MedicalEntityProps } from "../../MedicalEntity/index.ts"
import type DoseSchedule from "../../MedicalEntity/MedicalIntangible/DoseSchedule/index.ts"
import type MaximumDoseSchedule from "../../MedicalEntity/MedicalIntangible/DoseSchedule/MaximumDoseSchedule/index.ts"
import type DrugLegalStatus from "../../MedicalEntity/MedicalIntangible/DrugLegalStatus/index.ts"
import type DrugStrength from "../../MedicalEntity/MedicalIntangible/DrugStrength/index.ts"
import type { SubstanceProps } from "../../MedicalEntity/Substance/index.ts"
import type { ProductProps } from "../index.ts"

import DrugPregnancyCategoryComponent from "../../../../../../pagewright/src/define/Thing/Intangible/Enumeration/MedicalEnumeration/DrugPregnancyCategory/index.tsx"
import DrugPrescriptionStatusComponent from "../../../../../../pagewright/src/define/Thing/Intangible/Enumeration/MedicalEnumeration/DrugPrescriptionStatus/index.tsx"
import MedicalEnumerationComponent from "../../../../../../pagewright/src/define/Thing/Intangible/Enumeration/MedicalEnumeration/index.tsx"
import HealthInsurancePlanComponent from "../../../../../../pagewright/src/define/Thing/Intangible/HealthInsurancePlan/index.tsx"
import DrugClassComponent from "../../../../../../pagewright/src/define/Thing/MedicalEntity/DrugClass/index.tsx"
import DoseScheduleComponent from "../../../../../../pagewright/src/define/Thing/MedicalEntity/MedicalIntangible/DoseSchedule/index.tsx"
import MaximumDoseScheduleComponent from "../../../../../../pagewright/src/define/Thing/MedicalEntity/MedicalIntangible/DoseSchedule/MaximumDoseSchedule/index.tsx"
import DrugLegalStatusComponent from "../../../../../../pagewright/src/define/Thing/MedicalEntity/MedicalIntangible/DrugLegalStatus/index.tsx"
import DrugStrengthComponent from "../../../../../../pagewright/src/define/Thing/MedicalEntity/MedicalIntangible/DrugStrength/index.tsx"
import { Drug as DrugComponent } from "../../../../../pagewright/index.tsx"

export type DrugType = "Drug"

export interface DrugProps {
	"@type"?: DrugType
	activeIngredient?: Text
	administrationRoute?: Text
	alcoholWarning?: Text
	availableStrength?: DrugStrength | ReturnType<typeof DrugStrengthComponent>
	breastfeedingWarning?: Text
	clinicalPharmacology?: Text
	dosageForm?: Text
	doseSchedule?: DoseSchedule | ReturnType<typeof DoseScheduleComponent>
	drugClass?: DrugClass | ReturnType<typeof DrugClassComponent>
	drugUnit?: Text
	foodWarning?: Text
	includedInHealthInsurancePlan?:
		| HealthInsurancePlan
		| ReturnType<typeof HealthInsurancePlanComponent>
	interactingDrug?: Drug | ReturnType<typeof DrugComponent>
	isAvailableGenerically?: Boolean
	isProprietary?: Boolean
	labelDetails?: URL
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
	overdosage?: Text
	pregnancyCategory?:
		| DrugPregnancyCategory
		| ReturnType<typeof DrugPregnancyCategoryComponent>
	pregnancyWarning?: Text
	prescribingInfo?: URL
	prescriptionStatus?:
		| DrugPrescriptionStatus
		| Text
		| ReturnType<typeof DrugPrescriptionStatusComponent>
	proprietaryName?: Text
	relatedDrug?: Drug | ReturnType<typeof DrugComponent>
	rxcui?: Text
	warning?: Text | URL
}

type Drug =
	& Thing
	& MedicalEntityProps
	& SubstanceProps
	& ProductProps
	& DrugProps

export default Drug
