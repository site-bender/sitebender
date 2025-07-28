import type Thing from "../../../../index.ts"
import type { PlaceProps } from "../../../../Place/index.ts"
import type { LocalBusinessProps } from "../../index.ts"
import type { LodgingBusinessProps } from "../index.ts"
import type { OrganizationProps } from "../../../index.ts"

import HotelComponent from "../../../../../../../components/Thing/Organization/LocalBusiness/LodgingBusiness/Hotel/index.tsx"

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
