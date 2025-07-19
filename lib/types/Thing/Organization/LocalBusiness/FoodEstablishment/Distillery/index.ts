// Distillery extends FoodEstablishment but adds no additional properties
import type Thing from "../../../../index.ts"
import type { PlaceProps } from "../../../../Place/index.ts"
import type { FoodEstablishmentProps } from "../../../../Place/LocalBusiness/FoodEstablishment/index.ts"
import type { LocalBusinessProps } from "../../../../Place/LocalBusiness/index.ts"

// deno-lint-ignore no-empty-interface
export interface DistilleryProps {}

type Distillery =
	& Thing
	& FoodEstablishmentProps
	& LocalBusinessProps
	& PlaceProps
	& DistilleryProps

export default Distillery
