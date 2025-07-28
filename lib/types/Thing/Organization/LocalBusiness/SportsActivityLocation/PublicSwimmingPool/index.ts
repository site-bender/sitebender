import type Thing from "../../../../index.ts"
import type { PlaceProps } from "../../../../Place/index.ts"
import type { OrganizationProps } from "../../../index.ts"
import type { LocalBusinessProps } from "../../index.ts"
import type { SportsActivityLocationProps } from "../index.ts"

export interface PublicSwimmingPoolProps {}

type PublicSwimmingPool =
	& Thing
	& PlaceProps
	& LocalBusinessProps
	& SportsActivityLocationProps
	& OrganizationProps
	& PublicSwimmingPoolProps

export default PublicSwimmingPool
