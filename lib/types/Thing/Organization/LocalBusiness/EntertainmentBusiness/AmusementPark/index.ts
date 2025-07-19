// AmusementPark extends EntertainmentBusiness but adds no additional properties
import type Thing from "../../../../index.ts"
import type { PlaceProps } from "../../../../Place/index.ts"
import type { EntertainmentBusinessProps } from "../../../../Place/LocalBusiness/EntertainmentBusiness/index.ts"
import type { LocalBusinessProps } from "../../../../Place/LocalBusiness/index.ts"

// deno-lint-ignore no-empty-interface
export interface AmusementParkProps {}

type AmusementPark =
	& Thing
	& EntertainmentBusinessProps
	& LocalBusinessProps
	& PlaceProps
	& AmusementParkProps

export default AmusementPark
