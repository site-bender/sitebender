import type { Text } from "../../DataType/index.ts"
import type Thing from "../index.ts"
import type MedicalCode from "../Intangible/DefinedTerm/CategoryCode/MedicalCode/index.ts"
import type MedicalEnumeration from "../Intangible/Enumeration/MedicalEnumeration/index.ts"
import type MedicineSystem from "../Intangible/Enumeration/MedicalEnumeration/MedicineSystem/index.ts"
import type MedicalSpecialty from "../Intangible/Enumeration/Specialty/MedicalSpecialty/index.ts"
import type Grant from "../Intangible/Grant/index.ts"
import type Organization from "../Organization/index.ts"
import type MedicalGuideline from "./MedicalGuideline/index.ts"
import type DrugLegalStatus from "./MedicalIntangible/DrugLegalStatus/index.ts"
import type MedicalStudy from "./MedicalStudy/index.ts"

export interface MedicalEntityProps {
	/** A medical code for the entity, taken from a controlled vocabulary or ontology such as ICD-9, DiseasesDB, MeSH, SNOMED-CT, RxNorm, etc. */
	code?: MedicalCode
	/** A [[Grant]] that directly or indirectly provide funding or sponsorship for this item. See also [[ownershipFundingInfo]]. */
	funding?: Grant
	/** A medical guideline related to this entity. */
	guideline?: MedicalGuideline
	/** The drug or supplement's legal status, including any controlled substance schedules that apply. */
	legalStatus?: MedicalEnumeration | DrugLegalStatus | Text
	/** The system of medicine that includes this MedicalEntity, for example 'evidence-based', 'homeopathic', 'chiropractic', etc. */
	medicineSystem?: MedicineSystem
	/** If applicable, the organization that officially recognizes this entity as part of its endorsed system of medicine. */
	recognizingAuthority?: Organization
	/** If applicable, a medical specialty in which this entity is relevant. */
	relevantSpecialty?: MedicalSpecialty
	/** A medical study or trial related to this entity. */
	study?: MedicalStudy
}

type MedicalEntity =
	& Thing
	& MedicalEntityProps

export default MedicalEntity
