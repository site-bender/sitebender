import type Thing from "../../../index.ts"
import type { PlaceProps } from "../../../Place/index.ts"
import type { OrganizationProps } from "../../index.ts"
import type { LocalBusinessProps } from "../index.ts"

export interface TravelAgencyProps {}

type TravelAgency =
	& Thing
	& PlaceProps
	& LocalBusinessProps
	& OrganizationProps
	& TravelAgencyProps

export default TravelAgency
