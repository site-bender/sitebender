import type Thing from "../../../../index.ts"
import type { PlaceProps } from "../../../index.ts"
import type { CivicStructureProps } from "../../index.ts"
import type { PlaceOfWorshipProps } from "../index.ts"

export type SynagogueType = "Synagogue"

export interface SynagogueProps {
	"@type"?: SynagogueType
}

type Synagogue =
	& Thing
	& PlaceProps
	& CivicStructureProps
	& PlaceOfWorshipProps
	& SynagogueProps

export default Synagogue
