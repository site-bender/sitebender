import type Thing from "../../../index.ts"
import type { PlaceProps } from "../../index.ts"
import type { CivicStructureProps } from "../index.ts"

export type PerformingArtsTheaterType = "PerformingArtsTheater"

export interface PerformingArtsTheaterProps {
	"@type"?: PerformingArtsTheaterType
}

type PerformingArtsTheater =
	& Thing
	& PlaceProps
	& CivicStructureProps
	& PerformingArtsTheaterProps

export default PerformingArtsTheater
