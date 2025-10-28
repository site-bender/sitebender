import type Thing from "../../../../index.ts"
import type { PlaceProps } from "../../../../Place/index.ts"
import type { OrganizationProps } from "../../../index.ts"
import type { LocalBusinessProps } from "../../index.ts"
import type { FoodEstablishmentProps } from "../index.ts"

export type BarOrPubType = "BarOrPub"

export interface BarOrPubProps {
	"@type"?: BarOrPubType
}

type BarOrPub =
	& Thing
	& PlaceProps
	& LocalBusinessProps
	& FoodEstablishmentProps
	& OrganizationProps
	& BarOrPubProps

export default BarOrPub
