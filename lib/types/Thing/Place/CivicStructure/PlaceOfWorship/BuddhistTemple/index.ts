import type Thing from "../../../../index.ts"
import type { PlaceProps } from "../../../index.ts"
import type { CivicStructureProps } from "../../index.ts"
import type { PlaceOfWorshipProps } from "../index.ts"

export type BuddhistTempleType = "BuddhistTemple"

export interface BuddhistTempleProps {
	"@type"?: BuddhistTempleType
}

type BuddhistTemple =
	& Thing
	& PlaceProps
	& CivicStructureProps
	& PlaceOfWorshipProps
	& BuddhistTempleProps

export default BuddhistTemple
