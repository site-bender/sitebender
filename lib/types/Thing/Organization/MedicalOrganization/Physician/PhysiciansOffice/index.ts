// PhysiciansOffice extends Physician but adds no additional properties
import type Thing from "../../../../index.ts"
import type { PlaceProps } from "../../../../Place/index.ts"
import type { LocalBusinessProps } from "../../../../Place/LocalBusiness/index.ts"
import type { MedicalBusinessProps } from "../../../../Place/LocalBusiness/MedicalBusiness/index.ts"
import type { PhysicianProps } from "../../../../Place/LocalBusiness/MedicalBusiness/Physician/index.ts"

// deno-lint-ignore no-empty-interface
export interface PhysiciansOfficeProps {}

type PhysiciansOffice =
	& Thing
	& LocalBusinessProps
	& MedicalBusinessProps
	& PhysicianProps
	& PlaceProps
	& PhysiciansOfficeProps

export default PhysiciansOffice
