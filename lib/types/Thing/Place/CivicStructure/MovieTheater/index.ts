import type { Number } from "../../../../DataType/index.ts"
import type Thing from "../../../index.ts"
import type { OrganizationProps } from "../../../Organization/index.ts"
import type { EntertainmentBusinessProps } from "../../../Organization/LocalBusiness/EntertainmentBusiness/index.ts"
import type { LocalBusinessProps } from "../../../Organization/LocalBusiness/index.ts"
import type { PlaceProps } from "../../index.ts"
import type { CivicStructureProps } from "../index.ts"

export interface MovieTheaterProps {
	screenCount?: Number
}

type MovieTheater =
	& Thing
	& OrganizationProps
	& LocalBusinessProps
	& EntertainmentBusinessProps
	& PlaceProps
	& CivicStructureProps
	& MovieTheaterProps

export default MovieTheater
