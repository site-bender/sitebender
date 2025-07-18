import type MedicalOrganization from "../../index.ts"
import type Physician from "../index.ts"

export default interface IndividualPhysician extends Physician {
	/** A [[MedicalOrganization]] where the [[IndividualPhysician]] practices. */
	practicesAt?: MedicalOrganization
}
