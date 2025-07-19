// BedAndBreakfast extends LodgingBusiness but adds no additional properties
import type Thing from "../../../../index.ts"
import type { PlaceProps } from "../../../../Place/index.ts"
import type { LocalBusinessProps } from "../../../../Place/LocalBusiness/index.ts"
import type { LodgingBusinessProps } from "../../../../Place/LocalBusiness/LodgingBusiness/index.ts"

// deno-lint-ignore no-empty-interface
export interface BedAndBreakfastProps {}

type BedAndBreakfast =
	& Thing
	& LocalBusinessProps
	& LodgingBusinessProps
	& PlaceProps
	& BedAndBreakfastProps

export default BedAndBreakfast
