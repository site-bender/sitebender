import { Text } from "../../DataType/index.ts"
import Thing from "../index.ts"
import MedicalCode from "../Intangible/DefinedTerm/CategoryCode/MedicalCode/index.ts"
import MedicalEnumeration from "../Intangible/Enumeration/MedicalEnumeration/index.ts"
import MedicineSystem from "../Intangible/Enumeration/MedicalEnumeration/MedicineSystem/index.ts"
import MedicalSpecialty from "../Intangible/Enumeration/Specialty/MedicalSpecialty/index.ts"
import Grant from "../Intangible/Grant/index.ts"
import Organization from "../Organization/index.ts"
import MedicalGuideline from "./MedicalGuideline/index.ts"
import DrugLegalStatus from "./MedicalIntangible/DrugLegalStatus/index.ts"
import MedicalStudy from "./MedicalStudy/index.ts"

export default interface MedicalEntity extends Thing {
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
