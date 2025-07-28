import type Thing from "../../../index.ts"
import type { PlaceProps } from "../../index.ts"
import type { AccommodationProps } from "../index.ts"

import CampingPitchComponent from "../../../../../../components/Thing/Place/Accommodation/CampingPitch/index.tsx"

export interface CampingPitchProps {
}

type CampingPitch =
	& Thing
	& PlaceProps
	& AccommodationProps
	& CampingPitchProps

export default CampingPitch
