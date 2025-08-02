import type Thing from "../../../../index.ts"
import type { PlaceProps } from "../../../index.ts"
import type { CivicStructureProps } from "../../index.ts"
import type { PlaceOfWorshipProps } from "../index.ts"

export type HinduTempleType = "HinduTemple"

export interface HinduTempleProps {
	"@type"?: HinduTempleType
}

type HinduTemple =
	& Thing
	& PlaceProps
	& CivicStructureProps
	& PlaceOfWorshipProps
	& HinduTempleProps

export default HinduTemple
