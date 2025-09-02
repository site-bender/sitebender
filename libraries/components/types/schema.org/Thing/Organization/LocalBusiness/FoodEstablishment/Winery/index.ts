import type Thing from "../../../../index.ts"
import type { PlaceProps } from "../../../../Place/index.ts"
import type { OrganizationProps } from "../../../index.ts"
import type { LocalBusinessProps } from "../../index.ts"
import type { FoodEstablishmentProps } from "../index.ts"

export type WineryType = "Winery"

export interface WineryProps {
	"@type"?: WineryType
}

type Winery =
	& Thing
	& PlaceProps
	& LocalBusinessProps
	& FoodEstablishmentProps
	& OrganizationProps
	& WineryProps

export default Winery
