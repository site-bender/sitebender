import { Text } from "../../../../DataType/index.ts"
import CategoryCode from "../../../Intangible/DefinedTerm/CategoryCode/index.ts"
import MedicalSpecialty from "../../../Intangible/Enumeration/Specialty/MedicalSpecialty/index.ts"
import MedicalProcedure from "../../../MedicalEntity/MedicalProcedure/index.ts"
import MedicalTherapy from "../../../MedicalEntity/MedicalProcedure/TherapeuticProcedure/MedicalTherapy/index.ts"
import MedicalTest from "../../../MedicalEntity/MedicalTest/index.ts"
import Hospital from "../Hospital/index.ts"
import MedicalOrganization from "../index.ts"

export default interface Physician extends MedicalOrganization {
	/** A medical service available from this provider. */
	availableService?: MedicalProcedure | MedicalTest | MedicalTherapy
	/** A hospital with which the physician or office is affiliated. */
	hospitalAffiliation?: Hospital
	/** A medical specialty of the provider. */
	medicalSpecialty?: MedicalSpecialty
	/** A category describing the job, preferably using a term from a taxonomy such as [BLS O*NET-SOC](http://www.onetcenter.org/taxonomy.html), [ISCO-08](https://www.ilo.org/public/english/bureau/stat/isco/isco08/) or similar, with the property repeated for each applicable value. Ideally the taxonomy should be identified, and both the textual label and formal code for the category should be provided.\n Note: for historical reasons, any textual label and formal code provided as a literal may be assumed to be from O*NET-SOC. */
	occupationalCategory?: CategoryCode | Text
	/** A <a href="https://en.wikipedia.org/wiki/National_Provider_Identifier">National Provider Identifier</a> (NPI)      is a unique 10-digit identification number issued to health care providers in the United States by the Centers for Medicare and Medicaid Services. */
	usNPI?: Text
}
