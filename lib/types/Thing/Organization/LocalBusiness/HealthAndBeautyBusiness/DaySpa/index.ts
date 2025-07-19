// DaySpa extends HealthAndBeautyBusiness but adds no additional properties
import type Thing from "../../../../index.ts"
import type { PlaceProps } from "../../../../Place/index.ts"
import type { HealthAndBeautyBusinessProps } from "../../../../Place/LocalBusiness/HealthAndBeautyBusiness/index.ts"
import type { LocalBusinessProps } from "../../../../Place/LocalBusiness/index.ts"

// deno-lint-ignore no-empty-interface
export interface DaySpaProps {}

type DaySpa =
	& Thing
	& HealthAndBeautyBusinessProps
	& LocalBusinessProps
	& PlaceProps
	& DaySpaProps

export default DaySpa
