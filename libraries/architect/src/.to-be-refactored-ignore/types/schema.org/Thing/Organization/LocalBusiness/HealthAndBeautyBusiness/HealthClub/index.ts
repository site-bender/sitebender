import type Thing from "../../../../index.ts"
import type { PlaceProps } from "../../../../Place/index.ts"
import type { OrganizationProps } from "../../../index.ts"
import type { LocalBusinessProps } from "../../index.ts"
import type { SportsActivityLocationProps } from "../../SportsActivityLocation/index.ts"
import type { HealthAndBeautyBusinessProps } from "../index.ts"

export type HealthClubType = "HealthClub"

export interface HealthClubProps {
	"@type"?: HealthClubType
}

type HealthClub =
	& Thing
	& OrganizationProps
	& LocalBusinessProps
	& SportsActivityLocationProps
	& PlaceProps
	& HealthAndBeautyBusinessProps
	& HealthClubProps

export default HealthClub
