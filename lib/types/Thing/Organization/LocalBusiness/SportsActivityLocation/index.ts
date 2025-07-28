import type Thing from "../../../index.ts"
import type { PlaceProps } from "../../../Place/index.ts"
import type { OrganizationProps } from "../../index.ts"
import type { LocalBusinessProps } from "../index.ts"

export interface SportsActivityLocationProps {}

type SportsActivityLocation =
	& Thing
	& PlaceProps
	& LocalBusinessProps
	& OrganizationProps
	& SportsActivityLocationProps

export default SportsActivityLocation
