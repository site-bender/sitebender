import type Thing from "../../../../index.ts"
import type { PlaceProps } from "../../../../Place/index.ts"
import type { OrganizationProps } from "../../../index.ts"
import type { LocalBusinessProps } from "../../index.ts"
import type { LodgingBusinessProps } from "../index.ts"

export type VacationRentalType = "VacationRental"

export interface VacationRentalProps {
	"@type"?: VacationRentalType
}

type VacationRental =
	& Thing
	& PlaceProps
	& LocalBusinessProps
	& LodgingBusinessProps
	& OrganizationProps
	& VacationRentalProps

export default VacationRental
