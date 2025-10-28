import type Thing from "../../../index.ts"
import type { PlaceProps } from "../../index.ts"
import type { AccommodationProps } from "../index.ts"

export type CampingPitchType = "CampingPitch"

export interface CampingPitchProps {
	"@type"?: CampingPitchType
}

type CampingPitch = Thing & PlaceProps & AccommodationProps & CampingPitchProps

export default CampingPitch
