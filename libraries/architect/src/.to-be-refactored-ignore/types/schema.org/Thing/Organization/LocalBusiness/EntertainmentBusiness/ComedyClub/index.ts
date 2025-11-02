import type Thing from "../../../../index.ts"
import type { PlaceProps } from "../../../../Place/index.ts"
import type { OrganizationProps } from "../../../index.ts"
import type { LocalBusinessProps } from "../../index.ts"
import type { EntertainmentBusinessProps } from "../index.ts"

export type ComedyClubType = "ComedyClub"

export interface ComedyClubProps {
	"@type"?: ComedyClubType
}

type ComedyClub =
	& Thing
	& PlaceProps
	& LocalBusinessProps
	& EntertainmentBusinessProps
	& OrganizationProps
	& ComedyClubProps

export default ComedyClub
