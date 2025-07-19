// AdultEntertainment extends EntertainmentBusiness but adds no additional properties
import type Thing from "../../../../index.ts"
import type { PlaceProps } from "../../../../Place/index.ts"
import type { EntertainmentBusinessProps } from "../../../../Place/LocalBusiness/EntertainmentBusiness/index.ts"
import type { LocalBusinessProps } from "../../../../Place/LocalBusiness/index.ts"

// deno-lint-ignore no-empty-interface
export interface AdultEntertainmentProps {}

type AdultEntertainment =
	& Thing
	& EntertainmentBusinessProps
	& LocalBusinessProps
	& PlaceProps
	& AdultEntertainmentProps

export default AdultEntertainment
