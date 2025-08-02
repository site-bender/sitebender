import type Thing from "../../../../index.ts"
import type { PlaceProps } from "../../../../Place/index.ts"
import type { OrganizationProps } from "../../../index.ts"
import type { LocalBusinessProps } from "../../../LocalBusiness/index.ts"
import type { MedicalBusinessProps } from "../../../LocalBusiness/MedicalBusiness/index.ts"
import type { MedicalOrganizationProps } from "../../index.ts"
import type { MedicalClinicProps } from "../index.ts"

export type CovidTestingFacilityType = "CovidTestingFacility"

export interface CovidTestingFacilityProps {
	"@type"?: CovidTestingFacilityType
}

type CovidTestingFacility =
	& Thing
	& OrganizationProps
	& LocalBusinessProps
	& MedicalBusinessProps
	& MedicalClinicProps
	& PlaceProps
	& MedicalOrganizationProps
	& CovidTestingFacilityProps

export default CovidTestingFacility
