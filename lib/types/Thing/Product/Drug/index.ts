import type { Boolean, Text, URL } from "../../../DataType/index.ts"
import type Thing from "../../index.ts"
import type { MedicalEntityProps } from "../../MedicalEntity/index.ts"
import type { SubstanceProps } from "../../MedicalEntity/Substance/index.ts"
import type { ProductProps } from "../index.ts"
import type DoseSchedule from "../../MedicalEntity/MedicalIntangible/DoseSchedule/index.ts"
import type DrugClass from "../../MedicalEntity/DrugClass/index.ts"
import type DrugLegalStatus from "../../MedicalEntity/MedicalIntangible/DrugLegalStatus/index.ts"
import type DrugPregnancyCategory from "../../Intangible/Enumeration/MedicalEnumeration/DrugPregnancyCategory/index.ts"
import type DrugPrescriptionStatus from "../../Intangible/Enumeration/MedicalEnumeration/DrugPrescriptionStatus/index.ts"
import type DrugStrength from "../../MedicalEntity/MedicalIntangible/DrugStrength/index.ts"
import type HealthInsurancePlan from "../../Intangible/HealthInsurancePlan/index.ts"
import type MaximumDoseSchedule from "../../MedicalEntity/MedicalIntangible/DoseSchedule/MaximumDoseSchedule/index.ts"
import type MedicalEnumeration from "../../Intangible/Enumeration/MedicalEnumeration/index.ts"

import DrugComponent from "../../../../../components/Thing/Product/Drug/index.tsx"

export interface DrugProps {
	activeIngredient?: Text
	administrationRoute?: Text
	alcoholWarning?: Text
	availableStrength?: DrugStrength
	breastfeedingWarning?: Text
	clincalPharmacology?: Text
	clinicalPharmacology?: Text
	dosageForm?: Text
	doseSchedule?: DoseSchedule
	drugClass?: DrugClass
	drugUnit?: Text
	foodWarning?: Text
	includedInHealthInsurancePlan?: HealthInsurancePlan
	interactingDrug?: Drug
	isAvailableGenerically?: Boolean
	isProprietary?: Boolean
	labelDetails?: URL
	legalStatus?: DrugLegalStatus | MedicalEnumeration | Text
	maximumIntake?: MaximumDoseSchedule
	mechanismOfAction?: Text
	nonProprietaryName?: Text
	overdosage?: Text
	pregnancyCategory?: DrugPregnancyCategory
	pregnancyWarning?: Text
	prescribingInfo?: URL
	prescriptionStatus?: DrugPrescriptionStatus | Text
	proprietaryName?: Text
	relatedDrug?: Drug
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
