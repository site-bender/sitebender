import type Thing from "../../../../index.ts"
import type { PlaceProps } from "../../../../Place/index.ts"
import type { OrganizationProps } from "../../../index.ts"
import type { LocalBusinessProps } from "../../index.ts"
import type { LodgingBusinessProps } from "../index.ts"

export type BedAndBreakfastType = "BedAndBreakfast"

export interface BedAndBreakfastProps {
	"@type"?: BedAndBreakfastType
}

type BedAndBreakfast =
	& Thing
	& PlaceProps
	& LocalBusinessProps
	& LodgingBusinessProps
	& OrganizationProps
	& BedAndBreakfastProps

export default BedAndBreakfast
