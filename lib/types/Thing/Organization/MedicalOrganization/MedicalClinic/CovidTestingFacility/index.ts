// CovidTestingFacility extends MedicalClinic but adds no additional properties
import type Thing from "../../../../index.ts"
import type { PlaceProps } from "../../../../Place/index.ts"
import type { LocalBusinessProps } from "../../../../Place/LocalBusiness/index.ts"
import type { MedicalBusinessProps } from "../../../../Place/LocalBusiness/MedicalBusiness/index.ts"
import type { MedicalClinicProps } from "../../../../Place/LocalBusiness/MedicalBusiness/MedicalClinic/index.ts"

// deno-lint-ignore no-empty-interface
export interface CovidTestingFacilityProps {}

type CovidTestingFacility =
	& Thing
	& LocalBusinessProps
	& MedicalBusinessProps
	& MedicalClinicProps
	& PlaceProps
	& CovidTestingFacilityProps

export default CovidTestingFacility
