import type Thing from "../../../index.ts"
import type { OrganizationProps } from "../../../Organization/index.ts"
import type { LocalBusinessProps } from "../../../Organization/LocalBusiness/index.ts"
import type { LodgingBusinessProps } from "../../../Organization/LocalBusiness/LodgingBusiness/index.ts"
import type { PlaceProps } from "../../index.ts"
import type { CivicStructureProps } from "../index.ts"

export type CampgroundType = "Campground"

export interface CampgroundProps {
	"@type"?: CampgroundType
}

type Campground =
	& Thing
	& OrganizationProps
	& LocalBusinessProps
	& LodgingBusinessProps
	& PlaceProps
	& CivicStructureProps
	& CampgroundProps

export default Campground
