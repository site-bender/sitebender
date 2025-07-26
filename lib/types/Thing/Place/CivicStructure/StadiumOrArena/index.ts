import type Thing from "../../../index.ts"
import type { OrganizationProps } from "../../../Organization/index.ts"
import type { LocalBusinessProps } from "../../../Organization/LocalBusiness/index.ts"
import type { SportsActivityLocationProps } from "../../../Organization/LocalBusiness/SportsActivityLocation/index.ts"
import type { PlaceProps } from "../../index.ts"
import type { CivicStructureProps } from "../index.ts"

export interface StadiumOrArenaProps {
}

type StadiumOrArena =
	& Thing
	& OrganizationProps
	& LocalBusinessProps
	& SportsActivityLocationProps
	& PlaceProps
	& CivicStructureProps
	& StadiumOrArenaProps

export default StadiumOrArena
