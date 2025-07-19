import type Thing from "../../../../index.ts"
import type { PlaceProps } from "../../../../Place/index.ts"
import type { LocalBusinessProps } from "../../../../Place/LocalBusiness/index.ts"
import type { MedicalBusinessProps } from "../../../../Place/LocalBusiness/MedicalBusiness/index.ts"
import type { PhysicianProps } from "../../../../Place/LocalBusiness/MedicalBusiness/Physician/index.ts"
import type MedicalOrganization from "../../index.ts"
import type Physician from "../index.ts"

export interface IndividualPhysicianProps {
	/** A [[MedicalOrganization]] where the [[IndividualPhysician]] practices. */
	practicesAt?: MedicalOrganization
}

type IndividualPhysician =
	& Thing
	& LocalBusinessProps
	& MedicalBusinessProps
	& PhysicianProps
	& PlaceProps
	& IndividualPhysicianProps

export default IndividualPhysician
