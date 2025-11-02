import type Thing from "../../../index.ts"
import type { PlaceProps } from "../../index.ts"
import type { CivicStructureProps } from "../index.ts"
import type { BuddhistTempleType } from "./BuddhistTemple/index.ts"
import type { ChurchType } from "./Church/index.ts"
import type { HinduTempleType } from "./HinduTemple/index.ts"
import type { MosqueType } from "./Mosque/index.ts"
import type { SynagogueType } from "./Synagogue/index.ts"

export type PlaceOfWorshipType =
	| "PlaceOfWorship"
	| BuddhistTempleType
	| ChurchType
	| SynagogueType
	| MosqueType
	| HinduTempleType

export interface PlaceOfWorshipProps {
	"@type"?: PlaceOfWorshipType
}

type PlaceOfWorship =
	& Thing
	& PlaceProps
	& CivicStructureProps
	& PlaceOfWorshipProps

export default PlaceOfWorship
