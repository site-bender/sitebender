import type Thing from "../../../../index.ts"
import type { PlaceProps } from "../../../../Place/index.ts"
import type { LocalBusinessProps } from "../../index.ts"
import type { LodgingBusinessProps } from "../index.ts"
import type { OrganizationProps } from "../../../index.ts"

export interface HotelProps {
}

type Hotel =
	& Thing
	& PlaceProps
	& LocalBusinessProps
	& LodgingBusinessProps
	& OrganizationProps
	& HotelProps

export default Hotel
