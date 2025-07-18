import type { Boolean, Text, URL } from "../../../DataType/index.ts"
import type Thing from "../../index.ts"
import type DrugPregnancyCategory from "../../Intangible/Enumeration/MedicalEnumeration/DrugPregnancyCategory/index.ts"
import type DrugPrescriptionStatus from "../../Intangible/Enumeration/MedicalEnumeration/DrugPrescriptionStatus/index.ts"
import type MedicalEnumeration from "../../Intangible/Enumeration/MedicalEnumeration/index.ts"
import type HealthInsurancePlan from "../../Intangible/HealthInsurancePlan/index.ts"
import type DrugClass from "../../MedicalEntity/DrugClass/index.ts"
import type DoseSchedule from "../../MedicalEntity/MedicalIntangible/DoseSchedule/index.ts"
import type MaximumDoseSchedule from "../../MedicalEntity/MedicalIntangible/DoseSchedule/MaximumDoseSchedule/index.ts"
import type DrugLegalStatus from "../../MedicalEntity/MedicalIntangible/DrugLegalStatus/index.ts"
import type DrugStrength from "../../MedicalEntity/MedicalIntangible/DrugStrength/index.ts"
import type Substance from "../../MedicalEntity/Substance/index.ts"
import type { SubstanceProps } from "../../MedicalEntity/Substance/index.ts"
import type Product from "../index.ts"
import type { ProductProps } from "../index.ts"

export interface DrugProps {
	/** An active ingredient, typically chemical compounds and/or biologic substances. */
	activeIngredient?: Text
	/** A route by which this drug may be administered, e.g. 'oral'. */
	administrationRoute?: Text
	/** Any precaution, guidance, contraindication, etc. related to consumption of alcohol while taking this drug. */
	alcoholWarning?: Text
	/** An available dosage strength for the drug. */
	availableStrength?: DrugStrength
	/** Any precaution, guidance, contraindication, etc. related to this drug's use by breastfeeding mothers. */
	breastfeedingWarning?: Text
	/** Description of the absorption and elimination of drugs, including their concentration (pharmacokinetics, pK) and biological effects (pharmacodynamics, pD). */
	clincalPharmacology?: Text
	/** Description of the absorption and elimination of drugs, including their concentration (pharmacokinetics, pK) and biological effects (pharmacodynamics, pD). */
	clinicalPharmacology?: Text
	/** A dosage form in which this drug/supplement is available, e.g. 'tablet', 'suspension', 'injection'. */
	dosageForm?: Text
	/** A dosing schedule for the drug for a given population, either observed, recommended, or maximum dose based on the type used. */
	doseSchedule?: DoseSchedule
	/** The class of drug this belongs to (e.g., statins). */
	drugClass?: DrugClass
	/** The unit in which the drug is measured, e.g. '5 mg tablet'. */
	drugUnit?: Text
	/** Any precaution, guidance, contraindication, etc. related to consumption of specific foods while taking this drug. */
	foodWarning?: Text
	/** The insurance plans that cover this drug. */
	includedInHealthInsurancePlan?: HealthInsurancePlan
	/** Another drug that is known to interact with this drug in a way that impacts the effect of this drug or causes a risk to the patient. Note: disease interactions are typically captured as contraindications. */
	interactingDrug?: Drug
	/** True if the drug is available in a generic form (regardless of name). */
	isAvailableGenerically?: Boolean
	/** True if this item's name is a proprietary/brand name (vs. generic name). */
	isProprietary?: Boolean
	/** Link to the drug's label details. */
	labelDetails?: URL
	/** The drug or supplement's legal status, including any controlled substance schedules that apply. */
	legalStatus?: MedicalEnumeration | DrugLegalStatus | Text
	/** Recommended intake of this supplement for a given population as defined by a specific recommending authority. */
	maximumIntake?: MaximumDoseSchedule
	/** The specific biochemical interaction through which this drug or supplement produces its pharmacological effect. */
	mechanismOfAction?: Text
	/** The generic name of this drug or supplement. */
	nonProprietaryName?: Text
	/** Any information related to overdose on a drug, including signs or symptoms, treatments, contact information for emergency response. */
	overdosage?: Text
	/** Pregnancy category of this drug. */
	pregnancyCategory?: DrugPregnancyCategory
	/** Any precaution, guidance, contraindication, etc. related to this drug's use during pregnancy. */
	pregnancyWarning?: Text
	/** Link to prescribing information for the drug. */
	prescribingInfo?: URL
	/** Indicates the status of drug prescription, e.g. local catalogs classifications or whether the drug is available by prescription or over-the-counter, etc. */
	prescriptionStatus?: Text | DrugPrescriptionStatus
	/** Proprietary name given to the diet plan, typically by its originator or creator. */
	proprietaryName?: Text
	/** Any other drug related to this one, for example commonly-prescribed alternatives. */
	relatedDrug?: Drug
	/** The RxCUI drug identifier from RXNORM. */
	rxcui?: Text
	/** Any FDA or other warnings about the drug (text or URL). */
	warning?: Text | URL
}

type Drug = Thing & ProductProps & SubstanceProps & DrugProps

export default Drug
