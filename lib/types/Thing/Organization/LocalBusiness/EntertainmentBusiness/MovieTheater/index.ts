import type { Number } from "../../../../../DataType/index.ts"
import type Thing from "../../../../index.ts"
import type { PlaceProps } from "../../../../Place/index.ts"
import type { EntertainmentBusinessProps } from "../../../../Place/LocalBusiness/EntertainmentBusiness/index.ts"
import type { LocalBusinessProps } from "../../../../Place/LocalBusiness/index.ts"

export interface MovieTheaterProps {
	/** The number of screens in the movie theater. */
	screenCount?: Number
}

type MovieTheater =
	& Thing
	& EntertainmentBusinessProps
	& LocalBusinessProps
	& PlaceProps
	& MovieTheaterProps

export default MovieTheater
