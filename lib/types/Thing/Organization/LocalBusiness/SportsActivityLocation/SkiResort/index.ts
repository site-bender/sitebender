import type Thing from "../../../../index.ts"
import type { PlaceProps } from "../../../../Place/index.ts"
import type { OrganizationProps } from "../../../index.ts"
import type { LocalBusinessProps } from "../../index.ts"
import type { LodgingBusinessProps } from "../../LodgingBusiness/index.ts"
import type { ResortProps } from "../../LodgingBusiness/Resort/index.ts"
import type { SportsActivityLocationProps } from "../index.ts"

export interface SkiResortProps {}

type SkiResort =
	& Thing
	& OrganizationProps
	& LocalBusinessProps
	& LodgingBusinessProps
	& ResortProps
	& PlaceProps
	& SportsActivityLocationProps
	& SkiResortProps

export default SkiResort
