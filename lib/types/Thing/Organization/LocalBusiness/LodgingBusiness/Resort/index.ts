// Resort extends LodgingBusiness but adds no additional properties
import type Thing from "../../../../index.ts"
import type { PlaceProps } from "../../../../Place/index.ts"
import type { LocalBusinessProps } from "../../../../Place/LocalBusiness/index.ts"
import type { LodgingBusinessProps } from "../../../../Place/LocalBusiness/LodgingBusiness/index.ts"

// deno-lint-ignore no-empty-interface
export interface ResortProps {}

type Resort =
	& Thing
	& LocalBusinessProps
	& LodgingBusinessProps
	& PlaceProps
	& ResortProps

export default Resort
