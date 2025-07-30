import type Thing from "../../../index.ts"
import type { PlaceProps } from "../../index.ts"
import type { CivicStructureProps } from "../index.ts"

export interface PerformingArtsTheaterProps {
	"@type"?: "PerformingArtsTheater"}

type PerformingArtsTheater =
	& Thing
	& PlaceProps
	& CivicStructureProps
	& PerformingArtsTheaterProps

export default PerformingArtsTheater
