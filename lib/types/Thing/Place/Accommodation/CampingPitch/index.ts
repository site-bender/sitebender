// CampingPitch extends Accommodation but adds no additional properties
import type Thing from "../../../index.ts"
import type { PlaceProps } from "../../index.ts"
import type { AccommodationProps } from "../index.ts"

// deno-lint-ignore no-empty-interface
export interface CampingPitchProps {}

type CampingPitch =
	& Thing
	& AccommodationProps
	& PlaceProps
	& CampingPitchProps

export default CampingPitch
