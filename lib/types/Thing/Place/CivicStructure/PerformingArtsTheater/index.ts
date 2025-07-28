import type Thing from "../../../index.ts"
import type { PlaceProps } from "../../index.ts"
import type { CivicStructureProps } from "../index.ts"

import PerformingArtsTheaterComponent from "../../../../../../components/Thing/Place/CivicStructure/PerformingArtsTheater/index.tsx"

export interface PerformingArtsTheaterProps {
}

type PerformingArtsTheater =
	& Thing
	& PlaceProps
	& CivicStructureProps
	& PerformingArtsTheaterProps

export default PerformingArtsTheater
